/**
 * The review-oriented Markdown preview body.
 *
 * The document renders through the shared `MarkdownText` primitive (same
 * typography as the builtin Markdown viewer). Around it: a selection toolbar,
 * persistent highlights with numbered pins, a comment side panel, and a
 * composer that sends every pending comment to the conversation as one message.
 */
import React from 'react';
import { MarkdownText } from '@deepseek-ai/dsh-client-ui-primitives';
import { markdownLabels, messageLabels } from './i18n.js';
import { ensureLayoutStyle } from './layout-css.js';
import { resolveImageUrl } from './file-url.js';
import { createCommentStore, openComments } from './store.js';
import { locateAll, lineOfQuote } from './core/anchors.js';
import {
  readSelection,
  rangeFromOffsets,
  setHighlight,
  clearHighlight,
  rangeRect,
  scrollToRange,
  documentText,
  sectionAtOffset,
} from './core/dom.js';
import { composeReviewMessage } from './core/message.js';
import { ReviewPanel, SelectionToolbar, CommentEditor, CommentPins, ensureStyle } from './ui/index.js';

/** Leading YAML frontmatter, opened and closed on their own lines. */
const FRONTMATTER = /^\uFEFF?---[ \t]*\r?\n(?:([\s\S]*?)\r?\n)??(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/u;

/** Split off a leading frontmatter block, mirroring the builtin preview. */
function splitFrontmatter(text) {
  const match = FRONTMATTER.exec(text);
  if (match === null) return undefined;
  return { source: match[1] ?? '', body: text.slice(match[0].length) };
}

/** Render frontmatter as a compact key/value card, keeping odd lines verbatim. */
function FrontmatterCard({ source }) {
  if (source.trim() === '') return null;
  const rows = [];
  const raw = [];
  for (const line of source.split(/\r?\n/u)) {
    if (line.trim() === '') continue;
    const match = /^([A-Za-z0-9_.-]+):[ \t]*(.*)$/u.exec(line);
    if (match === null) {
      raw.push(line);
      continue;
    }
    rows.push({ key: match[1], value: match[2].replace(/^['"]|['"]$/gu, '') });
  }
  if (rows.length === 0) {
    return (
      <div className="mdrev-frontmatter" data-mdrev-frontmatter="raw">
        <pre className="mdrev-frontmatter-raw">{source}</pre>
      </div>
    );
  }
  return (
    <div className="mdrev-frontmatter" data-mdrev-frontmatter="fields">
      {rows.map((row) => (
        <React.Fragment key={row.key}>
          <span className="mdrev-frontmatter-key">{row.key}</span>
          <span className="mdrev-frontmatter-value">{row.value}</span>
        </React.Fragment>
      ))}
      {raw.length > 0 ? <pre className="mdrev-frontmatter-raw">{raw.join('\n')}</pre> : null}
    </div>
  );
}

/** File name shown in the composed message. */
function nameOf(absolutePath, title, address) {
  if (typeof title === 'string' && title !== '') return title;
  const source = typeof absolutePath === 'string' && absolutePath !== '' ? absolutePath : address;
  const cut = Math.max(source.lastIndexOf('/'), source.lastIndexOf('\\'));
  const name = cut === -1 ? source : source.slice(cut + 1);
  try {
    return decodeURIComponent(name);
  } catch (_error) {
    return name;
  }
}

/** Whether two comments still resolve to a live position. */
function isStale(positions, id) {
  return positions.get(id) === null;
}

/** Fallback for a missing `useInput` slot hook, so the preview degrades instead of throwing. */
const NO_INPUT_HOOK = () => undefined;

/**
 * One Markdown document preview with the review shell.
 * @param {object} props - composed slot props.
 * @returns {React.ReactElement | null} the review view.
 */
export function ReviewBody(props) {
  const { content, resourceAddress, scrollportRef, useResource, useTabInfo, useInput, inputActions, t } = props;
  ensureLayoutStyle();
  ensureStyle();

  const { tab } = useTabInfo();
  const meta = useResource(resourceAddress);
  const absolutePath = meta.value?.absolutePath;
  const text = content !== undefined && content.kind === 'text' ? content.text : '';
  const eof = content !== undefined && content.kind === 'text' ? content.eof : true;

  const store = React.useMemo(() => createCommentStore(resourceAddress), [resourceAddress]);
  const snapshot = React.useSyncExternalStore(store.subscribe, store.getSnapshot);
  const { comments, note, activeId } = snapshot;
  const pending = openComments(snapshot);

  const [positions, setPositions] = React.useState(() => new Map());
  const [selection, setSelection] = React.useState(null);
  const [editor, setEditor] = React.useState(null);
  const [draftBody, setDraftBody] = React.useState('');
  const [panelOpen, setPanelOpen] = React.useState(true);
  const [drawer, setDrawer] = React.useState(false);
  const [pins, setPins] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [flashId, setFlashId] = React.useState(null);

  const useInputSafe = typeof useInput === 'function' ? useInput : NO_INPUT_HOOK;
  const input = useInputSafe((state) => state);
  const inputPhase = input === undefined ? undefined : input.phase;
  const inputDraft = input === undefined ? undefined : input.draft;

  const scrollerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const docRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const pendingSentRef = React.useRef(null);
  const toastTimerRef = React.useRef(null);
  const flashTimerRef = React.useRef(null);

  const labels = React.useMemo(() => markdownLabels(t), [t]);
  const pathImages = React.useMemo(
    () => ({ resolve: (destination) => resolveImageUrl(absolutePath, destination) }),
    [absolutePath],
  );

  const setScroller = React.useCallback(
    (element) => {
      scrollerRef.current = element;
      scrollportRef(element);
    },
    [scrollportRef],
  );
  React.useEffect(() => () => scrollportRef(null), [scrollportRef]);

  /** Show a transient toast line inside the panel. */
  const showToast = React.useCallback((message) => {
    if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => {
      toastTimerRef.current = null;
      setToast(null);
    }, 2200);
  }, []);
  React.useEffect(
    () => () => {
      if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
      if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
    },
    [],
  );

  /* ------------------------------------------------------------------ */
  /* Anchor relocation + highlights                                      */
  /* ------------------------------------------------------------------ */

  React.useEffect(() => {
    const container = docRef.current;
    if (container === null) return;
    const rendered = documentText(container);
    const located = locateAll(rendered, comments);
    setPositions(located);
    // The file can change under a saved comment (the agent edits it). Source
    // line and section are derived data, so refresh them when they moved.
    const refreshed = [];
    for (const comment of comments) {
      const spot = located.get(comment.id);
      if (spot === undefined || spot === null) continue;
      const line = lineOfQuote(text, comment.quote);
      const section = sectionAtOffset(container, spot.start);
      if (line !== comment.line || section !== comment.section) {
        refreshed.push({ id: comment.id, line, section });
      }
    }
    if (refreshed.length > 0) store.relocateComments(refreshed);
    const ranges = [];
    for (const comment of comments) {
      const spot = located.get(comment.id);
      if (spot === undefined || spot === null) continue;
      const range = rangeFromOffsets(container, spot.start, spot.end);
      if (range !== null) ranges.push(range);
    }
    setHighlight('md-review', container, ranges);
    if (activeId !== null) {
      const spot = located.get(activeId);
      const activeRange = spot ? rangeFromOffsets(container, spot.start, spot.end) : null;
      setHighlight('md-review-active', container, activeRange === null ? [] : [activeRange]);
    } else {
      clearHighlight('md-review-active');
    }
  }, [text, comments, activeId]);

  /* Draft selection highlight while the toolbar or editor is open. */
  React.useEffect(() => {
    const container = docRef.current;
    if (container === null) return;
    const spot = editor !== null ? editor : selection;
    if (spot === null || spot === undefined) {
      clearHighlight('md-review-draft');
      return;
    }
    const range = rangeFromOffsets(container, spot.start, spot.end);
    setHighlight('md-review-draft', container, range === null ? [] : [range]);
  }, [selection, editor, text]);

  /* ------------------------------------------------------------------ */
  /* Numbered pins in the document gutter                                */
  /* ------------------------------------------------------------------ */

  const measurePins = React.useCallback(() => {
    const container = docRef.current;
    const inner = innerRef.current;
    if (container === null || inner === null) return;
    const innerBox = inner.getBoundingClientRect();
    const gutterX = inner.clientWidth - 26;
    const rows = [];
    for (let index = 0; index < comments.length; index += 1) {
      const comment = comments[index];
      const spot = positions.get(comment.id);
      if (spot === undefined || spot === null) continue;
      const range = rangeFromOffsets(container, spot.start, spot.end);
      if (range === null) continue;
      const rect = rangeRect(range);
      if (rect === null) continue;
      let y = rect.top - innerBox.top + rect.height / 2;
      for (const row of rows) {
        if (Math.abs(row.y - y) < 18) y = row.y + 18;
      }
      rows.push({
        id: comment.id,
        index: index + 1,
        left: gutterX,
        top: y,
        active: comment.id === activeId,
        sent: comment.status === 'sent',
        stale: positions.get(comment.id) === null,
      });
    }
    rows.sort((a, b) => a.top - b.top);
    setPins(rows);
  }, [comments, positions, activeId]);

  React.useEffect(() => {
    measurePins();
  }, [measurePins, text]);

  React.useEffect(() => {
    const inner = innerRef.current;
    if (inner === null) return undefined;
    const observer = new ResizeObserver(() => measurePins());
    observer.observe(inner);
    const onResize = () => measurePins();
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [measurePins]);

  /* ------------------------------------------------------------------ */
  /* Selection tracking                                                  */
  /* ------------------------------------------------------------------ */

  React.useEffect(() => {
    const container = docRef.current;
    if (container === null) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (editor !== null) return;
      const next = readSelection(container);
      setSelection((previous) => {
        if (previous === null && next === null) return previous;
        if (previous !== null && next !== null && previous.start === next.start && previous.end === next.end) {
          return previous;
        }
        return next;
      });
    };
    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };
    document.addEventListener('selectionchange', schedule);
    const scroller = scrollerRef.current;
    if (scroller !== null) {
      scroller.addEventListener('mouseup', schedule);
      scroller.addEventListener('keyup', schedule);
    }
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      document.removeEventListener('selectionchange', schedule);
      if (scroller !== null) {
        scroller.removeEventListener('mouseup', schedule);
        scroller.removeEventListener('keyup', schedule);
      }
    };
  }, [editor, text]);

  /* ------------------------------------------------------------------ */
  /* Panel layout: drawer on narrow panes                                */
  /* ------------------------------------------------------------------ */

  React.useEffect(() => {
    const root = rootRef.current;
    if (root === null) return undefined;
    const measure = () => {
      setDrawer(root.clientWidth > 0 && root.clientWidth < 560);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Comment authoring                                                   */
  /* ------------------------------------------------------------------ */

  const clearNativeSelection = React.useCallback(() => {
    try {
      window.getSelection()?.removeAllRanges();
    } catch (_error) {
      /* ignore */
    }
  }, []);

  const beginComment = React.useCallback(() => {
    if (selection === null) return;
    setEditor({ ...selection });
    setDraftBody('');
    setSelection(null);
  }, [selection]);

  const cancelEditor = React.useCallback(() => {
    setEditor(null);
    setDraftBody('');
    clearHighlight('md-review-draft');
  }, []);

  const saveComment = React.useCallback(() => {
    if (editor === null) return;
    const body = draftBody.trim();
    if (body === '') return;
    const line = lineOfQuote(text, editor.quote);
    store.addComment({
      quote: editor.quote,
      prefix: editor.prefix,
      suffix: editor.suffix,
      section: editor.section,
      line,
      body,
    });
    setEditor(null);
    setDraftBody('');
    // In narrow panes the panel is a scrim-covered drawer; opening it after
    // every save would hide the document the user is still reviewing.
    if (!drawer) setPanelOpen(true);
    clearNativeSelection();
  }, [editor, draftBody, text, store, clearNativeSelection, drawer]);

  /* ------------------------------------------------------------------ */
  /* Activation + navigation                                             */
  /* ------------------------------------------------------------------ */

  const activate = React.useCallback(
    (id, options = {}) => {
      store.setActive(id);
      const container = docRef.current;
      const scroller = scrollerRef.current;
      if (container === null || scroller === null) return;
      const spot = positions.get(id);
      if (spot === undefined || spot === null) {
        showToast(t('panel.stale'));
        return;
      }
      const range = rangeFromOffsets(container, spot.start, spot.end);
      if (range === null) return;
      // The drawer overlays the document; close it so the jump is visible.
      if (drawer) setPanelOpen(false);
      scrollToRange(scroller, range);
      if (options.flash !== false) {
        setFlashId(id);
        if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => {
          flashTimerRef.current = null;
          setFlashId(null);
        }, 1400);
      }
    },
    [store, positions, showToast, t, drawer],
  );

  /* Clicking a written comment's highlight activates it. */
  const onDocumentClick = React.useCallback(
    (event) => {
      const container = docRef.current;
      if (container === null) return;
      const native = window.getSelection();
      if (native !== null && native.toString().trim() !== '') return;
      let offsetNode = null;
      let offset = 0;
      if (typeof document.caretPositionFromPoint === 'function') {
        const point = document.caretPositionFromPoint(event.clientX, event.clientY);
        if (point !== undefined && point !== null) {
          offsetNode = point.offsetNode;
          offset = point.offset;
        }
      } else if (typeof document.caretRangeFromPoint === 'function') {
        // WebKit has no caretPositionFromPoint.
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (range !== null && range !== undefined) {
          offsetNode = range.startContainer;
          offset = range.startOffset;
        }
      }
      if (offsetNode === null || offsetNode === undefined || !container.contains(offsetNode)) return;
      const ordered = [...comments].reverse();
      for (const comment of ordered) {
        const spot = positions.get(comment.id);
        if (spot === undefined || spot === null) continue;
        const range = rangeFromOffsets(container, spot.start, spot.end);
        if (range === null) continue;
        const relation = range.comparePoint(offsetNode, offset);
        if (relation === 0) {
          activate(comment.id);
          return;
        }
      }
    },
    [comments, positions, activate],
  );

  /* ------------------------------------------------------------------ */
  /* Sending to the conversation                                         */
  /* ------------------------------------------------------------------ */

  const sendPending = React.useCallback(() => {
    if (sending || pending.length === 0 || inputActions === undefined || inputActions === null) return;
    const fileName = nameOf(absolutePath, tab?.title, resourceAddress);
    const message = composeReviewMessage({
      fileName,
      filePath: absolutePath ?? '',
      note,
      comments: pending,
      labels: messageLabels(t),
    });
    pendingSentRef.current = {
      ids: pending.map((comment) => comment.id),
      message,
      accepted: false,
      startedAt: Date.now(),
    };
    setSending(true);
    try {
      inputActions.setDraft(message);
      inputActions.submit();
    } catch (_error) {
      pendingSentRef.current = null;
      setSending(false);
      showToast(t('composer.failedToast'));
    }
  }, [sending, pending, inputActions, absolutePath, tab, resourceAddress, note, t, showToast]);

  const insertOnly = React.useCallback(() => {
    if (pending.length === 0 || inputActions === undefined || inputActions === null) return;
    const fileName = nameOf(absolutePath, tab?.title, resourceAddress);
    const message = composeReviewMessage({
      fileName,
      filePath: absolutePath ?? '',
      note,
      comments: pending,
      labels: messageLabels(t),
    });
    try {
      inputActions.setDraft(message);
      showToast(t('composer.insertedToast'));
    } catch (_error) {
      showToast(t('composer.failedToast'));
    }
  }, [pending, inputActions, absolutePath, tab, resourceAddress, note, t, showToast]);

  /* Settle the optimistic send from the composer's submit machine. */
  React.useEffect(() => {
    const sent = pendingSentRef.current;
    if (!sending || sent === null) return undefined;

    /** Close this send attempt and reflect the outcome. */
    const finish = (ok) => {
      if (pendingSentRef.current !== sent) return;
      pendingSentRef.current = null;
      setSending(false);
      if (ok) {
        store.markSent(sent.ids);
        store.flush();
        showToast(t('composer.sentToast', { count: sent.ids.length }));
      } else {
        showToast(t('composer.failedToast'));
      }
    };

    const phase = inputPhase === undefined ? 'plain' : inputPhase;
    const draft = inputDraft === undefined ? '' : inputDraft;
    // Submitting freezes the composer (`sending`/`submitting`), so a phase other
    // than `plain` proves the submit transaction started.
    if (phase !== 'plain') sent.accepted = true;

    if (phase === 'plain') {
      if (draft === '') {
        // `commit-draft` after an accepted send clears the editor. The first
        // passive effect can still read the pre-send draft, so an unconfirmed
        // empty draft waits one beat instead of reporting success immediately.
        if (sent.accepted) {
          finish(true);
          return undefined;
        }
        const settle = setTimeout(() => finish(true), 400);
        return () => clearTimeout(settle);
      }
      if (sent.accepted) {
        // A refused/failed sink returns to editing with the draft retained.
        finish(false);
        return undefined;
      }
      // A synchronous refusal can leave the phase plain for a moment; give the
      // transaction a beat before declaring failure.
      const refusal = setTimeout(() => finish(false), 1000);
      return () => clearTimeout(refusal);
    }

    // Safety net for a transaction that never settles (host stuck).
    const safety = setTimeout(() => finish(false), 20000);
    return () => clearTimeout(safety);
  }, [sending, inputPhase, inputDraft, store, showToast, t]);

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  const split = React.useMemo(() => splitFrontmatter(text), [text]);
  if (content === undefined || content.kind !== 'text') return null;

  const staleIds = new Set();
  for (const comment of comments) {
    if (isStale(positions, comment.id)) staleIds.add(comment.id);
  }

  const editorQuote = editor === null ? '' : editor.quote;

  return (
    <div className="mdrev-app" data-mdrev-root="true" ref={rootRef}>
      <div className="mdrev-doc" ref={setScroller} data-mdrev-doc-scroller="true" tabIndex={-1} onClick={onDocumentClick}>
        <div className="mdrev-doc-inner" ref={innerRef}>
          {split === undefined ? null : <FrontmatterCard source={split.source} />}
          <div className="mdrev-md" data-mdrev-document="true" ref={docRef}>
            <MarkdownText
              text={split?.body ?? text}
              streaming={!eof}
              labels={labels}
              pathImages={pathImages}
            />
          </div>
          <CommentPins pins={pins} onActivate={activate} t={t} />
        </div>
      </div>

      <ReviewPanel
        open={panelOpen}
        drawer={drawer}
        comments={comments}
        activeId={activeId}
        flashId={flashId}
        staleIds={staleIds}
        note={note}
        sending={sending}
        canSend={pending.length > 0 && inputActions !== undefined && inputActions !== null}
        pendingCount={pending.length}
        toast={toast}
        onTogglePanel={() => setPanelOpen((value) => !value)}
        onActivate={activate}
        onEdit={(id, body) => store.updateComment(id, { body })}
        onDelete={(id) => store.removeComment(id)}
        onClearSent={() => store.clearSent()}
        onNoteChange={(value) => store.setNote(value)}
        onSend={sendPending}
        onInsert={insertOnly}
        onCloseDrawer={() => setPanelOpen(false)}
        t={t}
      />

      {selection !== null && editor === null ? (
        <SelectionToolbar rect={selection.rect} onAdd={beginComment} t={t} />
      ) : null}

      {editor !== null ? (
        <CommentEditor
          rect={editor.rect}
          quote={editorQuote}
          value={draftBody}
          onChange={setDraftBody}
          onSave={saveComment}
          onCancel={cancelEditor}
          t={t}
        />
      ) : null}
    </div>
  );
}
