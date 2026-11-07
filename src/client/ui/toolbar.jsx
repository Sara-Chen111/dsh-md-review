/**
 * Floating selection affordances: the "add comment" capsule that follows a
 * text selection and the comment editor popover.
 *
 * Both render through a portal into `document.body` because the document
 * preview lives inside a stacking context that would otherwise clip them.
 * Position math only uses the viewport rect supplied by the body component.
 */
import React from 'react';
import { createPortal } from 'react-dom';
import { ensureStyle } from './styles.js';

const TOOLBAR_HEIGHT = 30;
const EDITOR_MAX_WIDTH = 352;
const EDITOR_MAX_HEIGHT = 240;
const MARGIN = 8;

function IconPlus() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 3.2v9.6M3.2 8h9.6" />
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

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Toolbar floating above (or below, near the viewport top) the selection.
 * @param {object} props - toolbar props.
 * @returns {React.ReactPortal | null} portaled capsule.
 */
export function SelectionToolbar({ rect, onAdd, t }) {
  ensureStyle();
  if (rect === null || rect === undefined || typeof document === 'undefined') return null;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = rect.left + rect.width / 2;
  const left = clamp(centerX, 72, viewportWidth - 72);

  const spaceAbove = rect.top - MARGIN;
  const spaceBelow = viewportHeight - rect.bottom - MARGIN;
  const flip = spaceAbove < TOOLBAR_HEIGHT + 8 && spaceBelow > spaceAbove;
  const top = flip
    ? Math.min(rect.bottom + MARGIN, viewportHeight - TOOLBAR_HEIGHT - 6)
    : Math.max(rect.top - MARGIN, TOOLBAR_HEIGHT + 6);

  return createPortal(
    <div
      className="mdrev-toolbar-wrap"
      data-flip={flip ? 'true' : 'false'}
      style={{ left: `${left}px`, top: `${top}px` }}
      onMouseDown={(event) => event.preventDefault()}
    >
      <button
        type="button"
        className="mdrev-toolbar"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onAdd?.()}
        aria-label={t('toolbar.addAria')}
        title={t('toolbar.addAria')}
      >
        <IconPlus />
        <span>{t('toolbar.add')}</span>
      </button>
    </div>,
    document.body,
  );
}

/**
 * Comment editor popover anchored next to the selection.
 * @param {object} props - editor props.
 * @returns {React.ReactPortal | null} portaled editor.
 */
export function CommentEditor({ rect, quote = '', value = '', onChange, onSave, onCancel, saving = false, t }) {
  ensureStyle();
  const boxRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [position, setPosition] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  const valid = typeof value === 'string' && value.trim() !== '';

  React.useLayoutEffect(() => {
    if (rect === null || rect === undefined) return;
    const box = boxRef.current;
    if (box === null) return;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const width = Math.min(EDITOR_MAX_WIDTH, viewportWidth - 2 * MARGIN - 8);
    const height = Math.max(box.offsetHeight, EDITOR_MAX_HEIGHT);
    const centerX = rect.left + rect.width / 2;
    const left = clamp(centerX - width / 2, MARGIN + 4, viewportWidth - width - MARGIN - 4);
    const below = rect.bottom + 10;
    const above = rect.top - 10 - height;
    let top;
    if (below + height + MARGIN <= viewportHeight) top = below;
    else if (above >= MARGIN) top = above;
    else top = Math.max(MARGIN, viewportHeight - height - MARGIN);
    setPosition({ left, top, width });
  }, [rect]);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCancel?.();
        return;
      }
      if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        event.stopPropagation();
        if (saving) return;
        if (valid) onSave?.();
        else setShowError(true);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [valid, saving, onSave, onCancel]);

  React.useEffect(() => {
    const input = inputRef.current;
    if (input === null) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, []);

  if (rect === null || rect === undefined || typeof document === 'undefined') return null;

  const style = {
    left: `${position === null ? -9999 : position.left}px`,
    top: `${position === null ? -9999 : position.top}px`,
    width: `${position === null ? EDITOR_MAX_WIDTH : position.width}px`,
    visibility: position === null ? 'hidden' : 'visible',
  };

  return createPortal(
    <div className="mdrev-editor" ref={boxRef} style={style} role="dialog" aria-label={t('editor.title')}>
      <div className="mdrev-editor-head">
        <span className="mdrev-editor-title">{t('editor.title')}</span>
        <button
          type="button"
          className="mdrev-icon-btn"
          onClick={onCancel}
          disabled={saving}
          aria-label={t('aria.closeEditor')}
          title={t('common.close')}
        >
          <IconClose />
        </button>
      </div>

      {quote !== '' ? (
        <div className="mdrev-editor-quote" aria-label={t('aria.quote')}>
          <span className="mdrev-editor-quote-label">{t('editor.quoteLabel')}</span>
          <span className="mdrev-editor-quote-text">{quote}</span>
        </div>
      ) : null}

      <textarea
        ref={inputRef}
        className="mdrev-input"
        rows={4}
        value={value}
        placeholder={t('editor.placeholder')}
        aria-label={t('aria.commentBody')}
        onChange={(event) => {
          if (showError) setShowError(false);
          onChange?.(event.target.value);
        }}
      />

      <div className="mdrev-editor-foot">
        <span className="mdrev-editor-hint" data-error={showError && !valid ? 'true' : undefined}>
          {valid ? t('editor.saveHint') : t('editor.empty')}
        </span>
        <div className="mdrev-editor-actions">
          <button type="button" className="mdrev-btn mdrev-btn-ghost mdrev-btn-sm" onClick={onCancel} disabled={saving}>
            {t('editor.cancel')}
          </button>
          <button
            type="button"
            className="mdrev-btn mdrev-btn-primary mdrev-btn-sm"
            onClick={() => {
              if (!valid) {
                setShowError(true);
                return;
              }
              onSave?.();
            }}
            disabled={saving || !valid}
          >
            {saving ? (
              <>
                <span className="mdrev-spinner" />
                {t('editor.saving')}
              </>
            ) : (
              t('editor.save')
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
