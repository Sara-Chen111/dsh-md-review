/**
 * One review comment as a card in the side panel, plus the numbered pin
 * badges drawn over the document text.
 *
 * Pure presentation: the card owns only transient view state (edit draft,
 * two-step delete confirmation) and reports changes through `props` callbacks.
 */
import React from 'react';
import { ensureStyle } from './styles.js';

const SVG = {
  width: 15,
  height: 15,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

function IconLocate() {
  return (
    <svg {...SVG}>
      <circle cx="7.2" cy="7.2" r="4.2" />
      <path d="M10.4 10.4 13.6 13.6" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg {...SVG}>
      <path d="M8.6 3.1 12.9 7.4" />
      <path d="M3.1 12.9 3.7 9.6 10.8 2.5a1.2 1.2 0 0 1 1.7 0l1 1a1.2 1.2 0 0 1 0 1.7L6.4 12.3Z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg {...SVG}>
      <path d="M2.8 4.4h10.4M6.2 4.4V3.1h3.6v1.3M4.1 4.4l.5 8.1a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.5-8.1" />
      <path d="M6.7 7v3.4M9.3 7v3.4" />
    </svg>
  );
}

/**
 * A single comment card.
 * @param {object} props - card props.
 * @returns {React.ReactElement} the card.
 */
export function ReviewCommentCard({ comment, index, active, stale, flash, t, onActivate, onEdit, onDelete }) {
  ensureStyle();
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(comment.body);
  const [confirming, setConfirming] = React.useState(false);
  const inputRef = React.useRef(null);

  const sent = comment.status === 'sent';

  React.useEffect(() => {
    if (!editing) return;
    setDraft(comment.body);
    const frame = requestAnimationFrame(() => {
      const input = inputRef.current;
      if (input === null) return;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
    return () => cancelAnimationFrame(frame);
    // The draft resets only when edit mode is entered or the comment changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  React.useEffect(() => {
    if (!confirming) return undefined;
    const timer = setTimeout(() => setConfirming(false), 2600);
    return () => clearTimeout(timer);
  }, [confirming]);

  const cancel = () => {
    setEditing(false);
    setDraft(comment.body);
  };

  const save = () => {
    const body = draft.trim();
    if (body === '') {
      setEditing(false);
      return;
    }
    if (body !== comment.body) onEdit?.(comment.id, body);
    setEditing(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      cancel();
      return;
    }
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      save();
    }
  };

  const deleteClick = () => {
    if (confirming) {
      setConfirming(false);
      onDelete?.(comment.id);
      return;
    }
    setConfirming(true);
  };

  const meta = [];
  if (comment.line !== null && comment.line !== undefined) {
    meta.push(<span key="line" className="mdrev-meta-line">{t('card.line', { line: comment.line })}</span>);
  }
  if (comment.section) {
    meta.push(<span key="section">{t('panel.section', { section: comment.section })}</span>);
  }

  return (
    <article
      className="mdrev-card"
      data-comment-id={comment.id}
      data-active={active ? 'true' : undefined}
      data-sent={sent ? 'true' : undefined}
      data-flash={flash ? 'true' : undefined}
      aria-label={t('aria.commentIndex', { index, excerpt: comment.quote })}
      onClick={(event) => {
        if (event.target.closest('button, textarea') !== null) return;
        onActivate?.(comment.id);
      }}
    >
      <div className="mdrev-card-head">
        <span className="mdrev-badge" title={t('card.index', { index })} aria-hidden="true">{index}</span>
        <div className="mdrev-card-meta">
          {meta}
          <span className="mdrev-card-tags">
            {sent ? <span className="mdrev-tag">{t('panel.sent')}</span> : null}
            {stale ? <span className="mdrev-tag" data-warn="true">{t('panel.stale')}</span> : null}
          </span>
        </div>
        <div className="mdrev-card-actions">
          <button
            type="button"
            className="mdrev-icon-btn"
            onClick={() => onActivate?.(comment.id)}
            aria-label={t('aria.locateComment')}
            title={t('card.locate')}
          >
            <IconLocate />
          </button>
          <button
            type="button"
            className="mdrev-icon-btn"
            onClick={() => setEditing(true)}
            aria-label={t('aria.editComment')}
            title={t('card.edit')}
          >
            <IconEdit />
          </button>
          <button
            type="button"
            className="mdrev-icon-btn"
            data-danger={confirming ? 'true' : undefined}
            onClick={deleteClick}
            aria-label={confirming ? t('card.deleteConfirm') : t('aria.deleteComment')}
            title={confirming ? t('card.deleteConfirm') : t('card.delete')}
          >
            <IconTrash />
          </button>
        </div>
      </div>

      <div className="mdrev-card-main">
        <blockquote className="mdrev-quote" aria-label={t('card.quoteAria')}>{comment.quote}</blockquote>
        {editing ? (
          <div className="mdrev-card-edit">
            <textarea
              ref={inputRef}
              className="mdrev-input"
              rows={3}
              value={draft}
              aria-label={t('aria.commentBody')}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
            />
            <div className="mdrev-card-edit-actions">
              <button type="button" className="mdrev-btn mdrev-btn-ghost mdrev-btn-sm" onClick={cancel}>
                {t('common.cancel')}
              </button>
              <button
                type="button"
                className="mdrev-btn mdrev-btn-primary mdrev-btn-sm"
                onClick={save}
                disabled={draft.trim() === ''}
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        ) : (
          <p className="mdrev-body">{comment.body}</p>
        )}
      </div>
    </article>
  );
}

/**
 * Numbered pins over the document text. Positions are computed by the body
 * (relative to the document content box) and passed in; this component only
 * renders and routes clicks.
 * @param {object} props - pins props.
 * @returns {React.ReactElement | null} the overlay, or null without pins.
 */
export function CommentPins({ pins = [], onActivate, t }) {
  ensureStyle();
  if (pins.length === 0) return null;
  return (
    <div className="mdrev-pin-layer">
      {pins.map((pin) => (
        <button
          key={pin.id}
          type="button"
          className="mdrev-pin"
          style={{ top: `${pin.top}px`, left: `${pin.left}px` }}
          data-active={pin.active ? 'true' : undefined}
          data-sent={pin.sent ? 'true' : undefined}
          data-flash={pin.flash ? 'true' : undefined}
          aria-label={t('aria.pin', { index: pin.index })}
          title={t('aria.pin', { index: pin.index })}
          onClick={(event) => {
            event.stopPropagation();
            onActivate?.(pin.id);
          }}
        >
          {pin.index}
        </button>
      ))}
    </div>
  );
}

