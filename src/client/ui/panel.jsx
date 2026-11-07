/**
 * The comment side panel: header, comment list (or empty state), and the
 * unified composer at the bottom.
 *
 * The panel also owns the collapsed floating pill shown when `open` is false,
 * so the body component only has to toggle the `open` prop. At narrow widths
 * the same panel becomes an overlay drawer with a dimmed scrim.
 */
import React from 'react';
import { ensureStyle } from './styles.js';
import { ReviewCommentCard } from './card.jsx';

function IconComment({ children }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13.7 7.4c0 2.9-2.6 5.2-5.7 5.2-.6 0-1.2-.1-1.7-.3l-3.4 1.2 1.1-2.8C2.7 9.7 2.1 8.6 2.1 7.4c0-2.9 2.6-5.2 5.8-5.2s5.8 2.3 5.8 5.2Z" />
      {children}
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13.4 2.6 7.3 8.7M13.4 2.6 9.8 13.4l-2.5-4.7L2.6 6.2Z" />
    </svg>
  );
}

function IconInsert() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.6 3.2H3.4a1 1 0 0 0-1 1v8.4a1 1 0 0 0 1 1h8.4a1 1 0 0 0 1-1V9.4" />
      <path d="M8.2 8 13 3.2M9.6 3.1H13v3.4" />
    </svg>
  );
}

function IconClear() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.8 4.4h10.4M6.2 4.4V3.1h3.6v1.3M4.1 4.4l.5 8.1a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.5-8.1" />
      <path d="M6.7 7v3.4M9.3 7v3.4" />
    </svg>
  );
}

function EmptyState({ t }) {
  return (
    <div className="mdrev-empty">
      <div className="mdrev-empty-icon" aria-hidden="true">
        <IconComment>
          <path d="M5.6 7.3h4.8M5.6 9.9h2.6" />
        </IconComment>
      </div>
      <p className="mdrev-empty-title">{t('panel.emptyHint')}</p>
      <p className="mdrev-empty-sub">{t('panel.emptySubHint')}</p>
    </div>
  );
}

function measureTextarea(element, minHeight, maxHeight) {
  if (element === null || element === undefined) return;
  element.style.height = 'auto';
  const next = Math.min(Math.max(element.scrollHeight, minHeight), maxHeight);
  element.style.height = `${next}px`;
}

/**
 * Review side panel.
 * @param {object} props - panel props (see SPEC §7 plus flashId/staleIds/pendingCount/onInsert).
 * @returns {React.ReactElement} the panel, or the collapsed trigger pill.
 */
export function ReviewPanel({
  open = true,
  drawer = false,
  comments = [],
  activeId = null,
  note = '',
  sending = false,
  canSend = false,
  toast = null,
  flashId = null,
  staleIds,
  pendingCount,
  onTogglePanel,
  onActivate,
  onEdit,
  onDelete,
  onClearSent,
  onNoteChange,
  onSend,
  onCloseDrawer,
  onInsert,
  t,
}) {
  ensureStyle();
  const listRef = React.useRef(null);
  const noteRef = React.useRef(null);

  const pending = typeof pendingCount === 'number' ? pendingCount : comments.filter((item) => item.status === 'open').length;
  const sentCount = comments.filter((item) => item.status === 'sent').length;

  React.useLayoutEffect(() => {
    measureTextarea(noteRef.current, 54, 104);
  }, [note]);

  React.useEffect(() => {
    if (activeId === null || listRef.current === null) return;
    const card = listRef.current.querySelector(`[data-comment-id="${activeId}"]`);
    if (card !== null) card.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

  React.useEffect(() => {
    if (!drawer || !open) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      onCloseDrawer?.();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [drawer, open, onCloseDrawer]);

  if (!open) {
    return (
      <button
        type="button"
        className="mdrev-toggle"
        onClick={onTogglePanel}
        aria-label={t('aria.reviewToggle', { count: pending })}
        title={pending > 0 ? t('panel.expand') : t('composer.openHint')}
      >
        <IconComment>
          <path d="M5.6 7.3h4.8M5.6 9.9h2.6" />
        </IconComment>
        <span>{t('panel.openComments')}</span>
        {pending > 0 ? <span className="mdrev-toggle-count">{pending}</span> : null}
      </button>
    );
  }

  const drawerMode = Boolean(drawer);

  return (
    <>
      {drawerMode ? <div className="mdrev-scrim" aria-hidden="true" onClick={() => onCloseDrawer?.()} /> : null}
      <aside
        className="mdrev-panel"
        data-drawer={drawerMode ? 'true' : undefined}
        role={drawerMode ? 'dialog' : 'complementary'}
        aria-modal={drawerMode ? 'true' : undefined}
        aria-label={t('panel.aria')}
      >
        <div className="mdrev-panel-head">
          <div className="mdrev-panel-title">
            <span>{t('panel.title')}</span>
            {comments.length > 0 ? (
              <span className="mdrev-count" aria-hidden="true">{comments.length}</span>
            ) : null}
          </div>
          <button
            type="button"
            className="mdrev-icon-btn mdrev-panel-toggle"
            onClick={drawerMode ? () => onCloseDrawer?.() : () => onTogglePanel?.()}
            aria-label={drawerMode ? t('panel.closeDrawer') : t('panel.collapse')}
            title={drawerMode ? t('panel.closeDrawer') : t('panel.collapse')}
          >
            {drawerMode ? <IconClose /> : <IconChevronRight />}
          </button>
        </div>

        {comments.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          <div className="mdrev-list" ref={listRef} role="list">
            {comments.map((comment, index) => (
              <ReviewCommentCard
                key={comment.id}
                comment={comment}
                index={index + 1}
                active={comment.id === activeId}
                stale={staleIds !== undefined && staleIds !== null && staleIds.has(comment.id) === true}
                flash={comment.id === flashId}
                t={t}
                onActivate={onActivate}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {comments.length > 0 ? (
          <div className="mdrev-composer">
            {toast !== null && toast !== undefined ? (
              <div className="mdrev-toast" role="status" key={toast}>{toast}</div>
            ) : null}

            {sentCount > 0 ? (
              <div className="mdrev-composer-top">
                <button
                  type="button"
                  className="mdrev-link-btn"
                  onClick={() => onClearSent?.()}
                  aria-label={t('aria.clearSent')}
                  title={t('aria.clearSent')}
                >
                  <IconClear />
                  {t('composer.clearSent', { count: sentCount })}
                </button>
              </div>
            ) : null}

            <textarea
              ref={noteRef}
              className="mdrev-input"
              rows={2}
              value={note}
              placeholder={t('composer.placeholder')}
              aria-label={t('composer.noteLabel')}
              onChange={(event) => onNoteChange?.(event.target.value)}
            />

            <div className="mdrev-composer-meta" title={t('composer.hint')}>
              <span className="mdrev-composer-pending">
                {pending > 0 ? (
                  <>
                    <i className="mdrev-dot" aria-hidden="true" />
                    <span>{t('panel.pending', { count: pending })}</span>
                  </>
                ) : (
                  <span>{t('composer.empty')}</span>
                )}
              </span>
              <span className="mdrev-composer-chars">{t('composer.chars', { count: (note ?? '').length })}</span>
            </div>

            <div className="mdrev-send-row">
              {typeof onInsert === 'function' ? (
                <button
                  type="button"
                  className="mdrev-btn mdrev-btn-ghost mdrev-insert"
                  onClick={() => onInsert()}
                  disabled={sending || !canSend}
                  aria-label={t('composer.insert')}
                  title={t('composer.insert')}
                >
                  <IconInsert />
                  <span className="mdrev-insert-label">{t('composer.insert')}</span>
                </button>
              ) : null}
              <button
                type="button"
                className="mdrev-btn mdrev-btn-primary"
                onClick={() => onSend?.()}
                disabled={sending || !canSend || pending === 0}
                aria-label={t('aria.send')}
                title={pending > 0 ? t('composer.sendCount', { count: pending }) : t('composer.empty')}
              >
                {sending ? (
                  <>
                    <span className="mdrev-spinner" />
                    {t('composer.sending')}
                  </>
                ) : (
                  <>
                    <IconSend />
                    {t('composer.send')}
                    {pending > 0 ? <span className="mdrev-send-count">{pending}</span> : null}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}
