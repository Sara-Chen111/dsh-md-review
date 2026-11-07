/**
 * Per-file review-comment store.
 *
 * One store per previewed resource address: it owns the comment list and the
 * unified note, persists them to localStorage (debounced), and publishes an
 * immutable snapshot to React through `useSyncExternalStore`. The active
 * comment id is view state only and is never persisted.
 */

/** Storage key prefix; the full key adds the resource address. */
const KEY_PREFIX = 'dsh.md-review.v1::';

const VERSION = 1;

const PERSIST_DELAY_MS = 200;

/** @typedef {{ id: string, quote: string, prefix: string, suffix: string, section: string, line: number | null, body: string, status: 'open' | 'sent', createdAt: number, sentAt: number | null }} ReviewComment */

/** Read one storage record, tolerating absent or damaged data. */
function load(address) {
  const empty = { comments: [], note: '' };
  try {
    const raw = globalThis.localStorage?.getItem(KEY_PREFIX + address);
    if (raw === null || raw === undefined) return empty;
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || parsed.version !== VERSION) return empty;
    const comments = Array.isArray(parsed.comments) ? parsed.comments.filter(isComment) : [];
    return { comments, note: typeof parsed.note === 'string' ? parsed.note : '' };
  } catch (_error) {
    return empty;
  }
}

/** Accept only well-shaped persisted comments. */
function isComment(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.quote === 'string' &&
    typeof value.body === 'string' &&
    (value.status === 'open' || value.status === 'sent')
  );
}

/** Stable identity for newly created comments. */
function newId() {
  try {
    return globalThis.crypto.randomUUID();
  } catch (_error) {
    return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

/**
 * Create the store for one resource address.
 * @param {string} address - `dsh-resource://file/...` address of the previewed file.
 * @returns store object.
 */
export function createCommentStore(address) {
  const initial = load(address);
  /** @type {Set<() => void>} */
  const listeners = new Set();
  let state = {
    comments: initial.comments.slice().sort((a, b) => a.createdAt - b.createdAt),
    note: initial.note,
    activeId: null,
  };
  let timer;

  const persist = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      try {
        globalThis.localStorage?.setItem(
          KEY_PREFIX + address,
          JSON.stringify({ version: VERSION, note: state.note, comments: state.comments }),
        );
      } catch (_error) {
        /* Quota or privacy failures must not break the preview. */
      }
    }, PERSIST_DELAY_MS);
  };

  const publish = (next) => {
    state = next;
    for (const listener of listeners) listener();
  };

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /** Persist immediately (used before an explicit send). */
    flush() {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }
      try {
        globalThis.localStorage?.setItem(
          KEY_PREFIX + address,
          JSON.stringify({ version: VERSION, note: state.note, comments: state.comments }),
        );
      } catch (_error) {
        /* ignore */
      }
    },

    /**
     * Append one comment from a selection.
     * @param {{ quote: string, prefix: string, suffix: string, section: string, line: number | null, body: string }} draft
     * @returns {ReviewComment} the stored comment.
     */
    addComment(draft) {
      const comment = {
        id: newId(),
        quote: draft.quote,
        prefix: draft.prefix,
        suffix: draft.suffix,
        section: draft.section,
        line: draft.line,
        body: draft.body.trim(),
        status: 'open',
        createdAt: Date.now(),
        sentAt: null,
      };
      publish({
        comments: [...state.comments, comment],
        note: state.note,
        activeId: comment.id,
      });
      persist();
      return comment;
    },

    /** Update a comment's editable text. */
    updateComment(id, patch) {
      publish({
        comments: state.comments.map((comment) => (comment.id === id ? { ...comment, ...patch } : comment)),
        note: state.note,
        activeId: state.activeId,
      });
      persist();
    },

    /** Remove one comment. */
    removeComment(id) {
      publish({
        comments: state.comments.filter((comment) => comment.id !== id),
        note: state.note,
        activeId: state.activeId === id ? null : state.activeId,
      });
      persist();
    },

    /** Mark the given open comments as sent. */
    markSent(ids) {
      const set = new Set(ids);
      const at = Date.now();
      publish({
        comments: state.comments.map((comment) =>
          set.has(comment.id) && comment.status === 'open'
            ? { ...comment, status: 'sent', sentAt: at }
            : comment,
        ),
        note: state.note,
        activeId: state.activeId,
      });
      persist();
    },

    /**
     * Refresh location metadata (source line / section) after the previewed
     * file changed. Only comments whose value actually differs are rewritten,
     * and the publish happens once.
     * @param {Array<{ id: string, line?: number | null, section?: string }>} entries
     */
    relocateComments(entries) {
      if (!Array.isArray(entries) || entries.length === 0) return;
      const byId = new Map();
      for (const entry of entries) {
        if (entry && typeof entry.id === 'string') byId.set(entry.id, entry);
      }
      if (byId.size === 0) return;
      let changed = false;
      const comments = state.comments.map((comment) => {
        const next = byId.get(comment.id);
        if (next === undefined) return comment;
        const line = next.line === undefined ? comment.line : next.line;
        const section = next.section === undefined ? comment.section : next.section;
        if (line === comment.line && section === comment.section) return comment;
        changed = true;
        return { ...comment, line, section };
      });
      if (!changed) return;
      publish({ comments, note: state.note, activeId: state.activeId });
      persist();
    },

    /** Drop every sent comment. */
    clearSent() {
      const removed = new Set(
        state.comments.filter((comment) => comment.status === 'sent').map((comment) => comment.id),
      );
      publish({
        comments: state.comments.filter((comment) => comment.status !== 'sent'),
        note: state.note,
        activeId: state.activeId !== null && removed.has(state.activeId) ? null : state.activeId,
      });
      persist();
    },

    /** Replace the unified note text. */
    setNote(note) {
      publish({ comments: state.comments, note, activeId: state.activeId });
      persist();
    },

    /** Set (or clear) the highlighted comment. */
    setActive(id) {
      if (state.activeId === id) return;
      publish({ comments: state.comments, note: state.note, activeId: id });
    },
  };
}

/** All comments that still need to be sent. */
export function openComments(state) {
  return state.comments.filter((comment) => comment.status === 'open');
}
