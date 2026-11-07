/**
 * Stylesheet for the review UI: side panel, comment cards, selection toolbar,
 * comment editor, numbered pins, composer and the highlight pseudo-elements.
 *
 * The shell layout (document column, frontmatter) lives in `layout-css.js`.
 * Everything here uses the DSH design tokens (`--dsw-*`) so the view follows
 * the native light/dark themes without owning a palette of its own.
 */
const TAG = 'md-review/ui';

export const UI_CSS = `
/* ------------------------------------------------------------------ panel */
.mdrev-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: clamp(264px, 34%, 340px);
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  background: var(--dsw-alias-bg-base, #fff);
  border-left: 0.5px solid var(--dsw-alias-border-l1, #0000000a);
  color: var(--dsw-alias-label-primary, #0f1115);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 13px;
  line-height: 20px;
  z-index: 3;
  container-type: inline-size;
}
.mdrev-panel *,
.mdrev-panel *::before,
.mdrev-panel *::after { box-sizing: border-box; }

.mdrev-panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
  height: 44px;
  padding: 0 8px 0 14px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1, #0000000a);
}
.mdrev-panel-title {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.01em;
  color: var(--dsw-alias-label-primary, #0f1115);
}
.mdrev-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
  color: var(--dsw-alias-label-secondary, #61666b);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.mdrev-panel-toggle { margin-left: auto; }

/* --------------------------------------------------------- generic buttons */
.mdrev-icon-btn {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-xs, 4px);
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #61666b);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease, opacity 120ms ease;
}
.mdrev-icon-btn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
  color: var(--dsw-alias-label-primary, #0f1115);
}
.mdrev-icon-btn:active:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-active, #2631481a);
}
.mdrev-icon-btn:disabled { opacity: 0.4; cursor: default; }
.mdrev-icon-btn svg { width: 15px; height: 15px; display: block; }

.mdrev-btn {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: var(--dsw-radius-sm, 8px);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease, opacity 120ms ease, color 120ms ease;
}
.mdrev-btn svg { width: 14px; height: 14px; flex: none; }
.mdrev-btn:disabled { cursor: default; }

.mdrev-btn-primary {
  flex: 1 1 auto;
  min-width: 0;
  border-color: transparent;
  background: var(--dsw-alias-button-primary-fill, #0f1115);
  color: var(--dsw-alias-label-primary-foreground, #fff);
}
.mdrev-btn-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover, #43454a);
}
.mdrev-btn-primary:disabled {
  background: var(--dsw-alias-button-primary-dimmed, #ebeef2);
  color: var(--dsw-alias-label-dimmed, #e1e5ee);
}
.mdrev-btn-ghost {
  flex: none;
  border-color: var(--dsw-alias-border-l2, #0000001a);
  background: transparent;
  color: var(--dsw-alias-label-secondary, #61666b);
}
.mdrev-btn-ghost:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
  color: var(--dsw-alias-label-primary, #0f1115);
}
.mdrev-btn-ghost:disabled { opacity: 0.45; }
.mdrev-btn-sm { height: 26px; padding: 0 10px; font-size: 12px; }

/* ------------------------------------------------------- comment card list */
.mdrev-list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: var(--dsw-alias-scrollbar-bg-l2, #e5e5e5) transparent;
}
.mdrev-list::-webkit-scrollbar { width: 10px; height: 10px; }
.mdrev-list::-webkit-scrollbar-track { background: transparent; }
.mdrev-list::-webkit-scrollbar-thumb {
  background-color: var(--dsw-alias-scrollbar-bg-l2, #e5e5e5);
  border: 3px solid transparent;
  border-radius: 8px;
  background-clip: content-box;
}
.mdrev-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--dsw-alias-scrollbar-hover-l2, #d4d4d4);
}

.mdrev-card {
  position: relative;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 9px 10px 10px 12px;
  border-radius: var(--dsw-radius-sm, 8px);
  background: transparent;
  transition: background-color 140ms ease, opacity 140ms ease;
}
.mdrev-card + .mdrev-card { margin-top: 2px; }
.mdrev-card:hover { background: var(--dsw-alias-interactive-bg-hover, #2631480f); }
.mdrev-card[data-active="true"] { background: var(--dsw-alias-interactive-bg-active, #2631481a); }
.mdrev-card[data-active="true"]::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 9px;
  bottom: 9px;
  width: 2px;
  border-radius: 2px;
  background: var(--dsw-alias-brand-primary, #0f1115);
}
.mdrev-card[data-sent="true"] { opacity: 0.6; }
.mdrev-card[data-sent="true"]:hover { opacity: 0.85; }
.mdrev-card[data-flash="true"] { animation: mdrev-card-flash 1.2s ease both; }

.mdrev-card-head {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  min-height: 18px;
}
.mdrev-badge {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 5px;
  background: var(--dsw-alias-brand-primary, #0f1115);
  color: var(--dsw-alias-label-primary-foreground, #fff);
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  user-select: none;
  -webkit-user-select: none;
}
.mdrev-card-meta {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 5px;
  overflow: hidden;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 11px;
  line-height: 16px;
}
.mdrev-card-meta > span { overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
/* The line number is the most useful cue, so it never gets squeezed away. */
.mdrev-card-meta .mdrev-meta-line { flex: none; }
.mdrev-card-tags { display: inline-flex; align-items: center; gap: 4px; flex: none; }
.mdrev-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 16px;
  padding: 0 5px;
  border-radius: 4px;
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
.mdrev-tag[data-warn="true"] {
  background: var(--dsw-alias-state-warn-tertiary, #fef5e7);
  color: var(--dsw-alias-state-warn-label, #dd8629);
}
.mdrev-card-actions {
  display: flex;
  align-items: center;
  gap: 1px;
  flex: none;
  margin-left: auto;
  opacity: 0;
  transform: translateX(2px);
  transition: opacity 140ms ease, transform 140ms ease;
}
.mdrev-card:hover .mdrev-card-actions,
.mdrev-card:focus-within .mdrev-card-actions,
.mdrev-card[data-active="true"] .mdrev-card-actions {
  opacity: 1;
  transform: none;
}
.mdrev-card .mdrev-icon-btn { width: 22px; height: 22px; }
.mdrev-card .mdrev-icon-btn svg { width: 14px; height: 14px; }
.mdrev-card .mdrev-icon-btn[data-danger="true"] {
  color: var(--dsw-alias-state-error-primary, #ec1313);
  background: var(--dsw-alias-interactive-bg-hover-danger, #ec13130d);
}
@media (hover: none) {
  .mdrev-card-actions { opacity: 0.55; transform: none; }
}

.mdrev-card-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  margin-left: 24px;
}
.mdrev-quote {
  margin: 0;
  padding: 1px 0 1px 8px;
  border-left: 1.5px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 45%, transparent);
  color: var(--dsw-alias-label-secondary, #61666b);
  font-size: 12px;
  line-height: 18px;
  /* Independent of the preview's per-tab wrap preference. */
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.mdrev-body {
  margin: 0;
  color: var(--dsw-alias-label-primary, #0f1115);
  font-size: 13px;
  line-height: 20px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.mdrev-card-edit {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 24px;
}
.mdrev-card-edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}
.mdrev-card-edit .mdrev-input { min-height: 66px; max-height: 120px; }

/* ------------------------------------------------------------------- empty */
.mdrev-empty {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 0;
  padding: 28px 26px 56px;
  text-align: center;
  animation: mdrev-fade-in 200ms ease both;
}
.mdrev-empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 2px;
  border-radius: 50%;
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
  box-shadow: inset 0 0 0 0.5px var(--dsw-alias-border-l1, #0000000a);
  color: var(--dsw-alias-label-tertiary, #61666b);
  animation: mdrev-float 4.2s ease-in-out infinite;
}
.mdrev-empty-icon svg { width: 23px; height: 23px; }
.mdrev-empty-title {
  margin: 0;
  color: var(--dsw-alias-label-secondary, #61666b);
  font-size: 13px;
  line-height: 20px;
}
.mdrev-empty-sub {
  margin: 0;
  max-width: 216px;
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 11.5px;
  line-height: 17px;
}

/* ---------------------------------------------------------------- composer */
.mdrev-composer {
  position: relative;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px 12px 12px;
  border-top: 0.5px solid var(--dsw-alias-border-l1, #0000000a);
  background: var(--dsw-alias-bg-base, #fff);
}
.mdrev-composer-top { display: flex; justify-content: flex-end; margin-bottom: -2px; }
.mdrev-link-btn {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 1px 2px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-family: inherit;
  font-size: 11px;
  line-height: 16px;
  cursor: pointer;
  transition: color 120ms ease;
}
.mdrev-link-btn:hover { color: var(--dsw-alias-label-primary, #0f1115); }
.mdrev-link-btn svg { width: 12px; height: 12px; }
.mdrev-composer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 11px;
  line-height: 16px;
}
.mdrev-composer-pending { display: inline-flex; align-items: center; gap: 5px; min-width: 0; }
.mdrev-dot {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dsw-alias-state-warn-primary, #e8a33d);
}
.mdrev-composer-chars { flex: none; font-variant-numeric: tabular-nums; }
.mdrev-send-row { display: flex; align-items: stretch; gap: 6px; }
.mdrev-insert { padding: 0 10px; }
@container (max-width: 312px) {
  .mdrev-insert .mdrev-insert-label { display: none; }
  .mdrev-insert { padding: 0 9px; }
}
.mdrev-send-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 4px;
  background: color-mix(in srgb, currentColor 18%, transparent);
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.mdrev-input {
  display: block;
  width: 100%;
  margin: 0;
  padding: 7px 9px;
  border: 0.5px solid var(--dsw-alias-border-l2, #0000001a);
  border-radius: var(--dsw-radius-sm, 8px);
  background: var(--dsw-specific-input-major, #fff);
  color: var(--dsw-alias-label-primary, #0f1115);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 13px;
  line-height: 20px;
  resize: none;
  outline: none;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.mdrev-input::placeholder { color: var(--dsw-alias-label-tertiary, #61666b); opacity: 1; }
.mdrev-input:hover:not(:focus) { border-color: var(--dsw-alias-border-l3, #0000001f); }
.mdrev-input:focus-visible {
  border-color: var(--dsw-alias-state-business-primary, #4176e6);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 16%, transparent);
}
.mdrev-input:disabled { opacity: 0.6; }

.mdrev-spinner {
  width: 12px;
  height: 12px;
  flex: none;
  border: 1.5px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: mdrev-spin 0.7s linear infinite;
}

/* ------------------------------------------------------------------- toast */
.mdrev-toast {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: calc(100% + 8px);
  z-index: 6;
  width: max-content;
  max-width: calc(100% - 24px);
  margin: 0 auto;
  padding: 7px 12px;
  border-radius: var(--dsw-radius-sm, 8px);
  background: var(--dsw-alias-toast-bg, #353638);
  color: var(--dsw-alias-toast-label, #fff);
  box-shadow: var(--dsw-elevation-panel, 0 3px 8px #0000000a);
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  pointer-events: none;
  animation: mdrev-toast-in 160ms ease both;
}

/* -------------------------------------------------- collapsed floating pill */
.mdrev-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 8;
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0;
  padding: 0 9px;
  border: 0.5px solid var(--dsw-alias-border-l1, #0000000a);
  border-radius: 999px;
  background: var(--dsw-alias-button-elevated-fill, #fff);
  color: var(--dsw-alias-label-secondary, #61666b);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  box-shadow: var(--dsw-elevation-soft, 0 4px 16px #00000008);
  cursor: pointer;
  transition: color 120ms ease, background-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
}
.mdrev-toggle:hover {
  color: var(--dsw-alias-label-primary, #0f1115);
  background: var(--dsw-alias-button-floating-hover, #f1f3f5);
  box-shadow: var(--dsw-elevation-panel, 0 3px 8px #0000000a);
}
.mdrev-toggle:active { transform: scale(0.97); }
.mdrev-toggle svg { width: 14px; height: 14px; flex: none; }
.mdrev-toggle-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 15px;
  height: 15px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--dsw-alias-state-business-primary, #4176e6);
  color: var(--dsw-alias-label-primary-foreground, #fff);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

/* ------------------------------------------------------------------ drawer */
.mdrev-scrim {
  position: absolute;
  inset: 0;
  z-index: 9;
  background: var(--dsw-alias-bg-mask-1, #0000003d);
  animation: mdrev-fade-in 160ms ease both;
}
.mdrev-panel[data-drawer="true"] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  width: min(340px, 88%);
  border-left: 0.5px solid var(--dsw-alias-border-l2, #0000001a);
  box-shadow: var(--dsw-elevation-prominent, 0 3px 8px #0000000a);
  animation: mdrev-drawer-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

/* ------------------------------------------------------- selection toolbar */
.mdrev-toolbar-wrap {
  position: fixed;
  z-index: 1000;
  transform: translate(-50%, -100%);
  pointer-events: none;
  animation: mdrev-fade-in 120ms ease both;
}
.mdrev-toolbar-wrap[data-flip="true"] { transform: translate(-50%, 0); }
.mdrev-toolbar-wrap::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 9px;
  height: 9px;
  border-radius: 1px;
  background: var(--dsw-alias-button-elevated-fill, #fff);
  transform: translateX(-50%) rotate(45deg);
}
.mdrev-toolbar-wrap[data-flip="false"]::after { bottom: -2px; }
.mdrev-toolbar-wrap[data-flip="true"]::after { top: -2px; }
.mdrev-toolbar {
  position: relative;
  z-index: 1;
  /* The wrapper disables hit-testing so it never blocks the document; the
     capsule itself must stay clickable. */
  pointer-events: auto;
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  margin: 0;
  padding: 0 11px;
  border: 0.5px solid var(--dsw-alias-border-l1, #0000000a);
  border-radius: 999px;
  background: var(--dsw-alias-button-elevated-fill, #fff);
  color: var(--dsw-alias-label-primary, #0f1115);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  box-shadow: var(--dsw-elevation-prominent, 0 3px 8px #0000000a);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  animation: mdrev-pop-in 130ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
  transition: background-color 120ms ease;
}
.mdrev-toolbar:hover { background: var(--dsw-alias-button-floating-hover, #f1f3f5); }
.mdrev-toolbar svg { width: 14px; height: 14px; flex: none; }

/* ----------------------------------------------------------- comment editor */
.mdrev-editor {
  position: fixed;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 12px;
  border: 0.5px solid var(--dsw-alias-border-l2, #0000001a);
  border-radius: var(--dsw-radius-md, 12px);
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-primary, #0f1115);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  font-size: 13px;
  line-height: 20px;
  box-shadow: var(--dsw-elevation-prominent, 0 3px 8px #0000000a);
  animation: mdrev-pop-in 140ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}
.mdrev-editor-head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.mdrev-editor-title {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  color: var(--dsw-alias-label-primary, #0f1115);
}
.mdrev-editor-quote {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px 9px;
  border-radius: var(--dsw-radius-sm, 8px);
  border-left: 2px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 55%, transparent);
  background: var(--dsw-alias-interactive-bg-hover, #2631480f);
}
.mdrev-editor-quote-label {
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 10.5px;
  line-height: 15px;
}
.mdrev-editor-quote-text {
  color: var(--dsw-alias-label-secondary, #61666b);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.mdrev-editor .mdrev-input { height: 86px; }
.mdrev-editor-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.mdrev-editor-hint {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary, #61666b);
  font-size: 11px;
  line-height: 16px;
}
.mdrev-editor-hint[data-error="true"] { color: var(--dsw-alias-state-error-primary, #ec1313); }
.mdrev-editor-actions { display: flex; align-items: center; gap: 6px; flex: none; }

/* ------------------------------------------------------------- pin badges */
.mdrev-pin-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
}
.mdrev-pin {
  position: absolute;
  appearance: none;
  -webkit-appearance: none;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  margin: 0;
  padding: 0 3px;
  border: 0;
  border-radius: 5px;
  background: var(--dsw-alias-brand-primary, #0f1115);
  color: var(--dsw-alias-label-primary-foreground, #fff);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transform: translate(2px, -50%);
  box-shadow: 0 0 0 0.5px color-mix(in srgb, var(--dsw-alias-label-primary, #0f1115) 10%, transparent),
    0 1px 3px color-mix(in srgb, var(--dsw-alias-label-primary, #0f1115) 14%, transparent);
  transition: transform 140ms ease, background-color 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
}
.mdrev-pin:hover { transform: translate(2px, -50%) scale(1.18); z-index: 1; }
.mdrev-pin[data-active="true"] {
  background: var(--dsw-alias-state-business-primary, #4176e6);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 26%, transparent),
    0 1px 3px color-mix(in srgb, var(--dsw-alias-label-primary, #0f1115) 16%, transparent);
}
.mdrev-pin[data-sent="true"] { background: var(--dsw-alias-label-tertiary, #81858c); opacity: 0.62; }
.mdrev-pin[data-sent="true"]:hover { opacity: 0.9; }
.mdrev-pin[data-flash="true"] { animation: mdrev-pin-flash 1.2s ease both; }

/* -------------------------------------------------- document highlights */
::highlight(md-review) {
  background-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 26%, transparent);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 50%, transparent);
  text-underline-offset: 2px;
}
::highlight(md-review-active) {
  background-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 44%, transparent);
  text-decoration-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #e8a33d) 78%, transparent);
}
::highlight(md-review-draft) {
  background-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 28%, transparent);
}

/* --------------------------------------------------------------- keyframes */
@keyframes mdrev-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes mdrev-card-flash {
  0% { background-color: transparent; }
  18% { background-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 16%, transparent); }
  100% { background-color: transparent; }
}
@keyframes mdrev-toast-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes mdrev-pop-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes mdrev-drawer-in {
  from { opacity: 0.4; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes mdrev-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes mdrev-spin {
  to { transform: rotate(360deg); }
}
@keyframes mdrev-pin-flash {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 40%, transparent); }
  30% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 18%, transparent); }
  100% { box-shadow: 0 0 0 0 transparent; }
}

/* --------------------------------------------------------------- a11y bits */
.mdrev-panel :focus-visible,
.mdrev-toolbar:focus-visible,
.mdrev-editor :focus-visible,
.mdrev-toggle:focus-visible {
  outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-alias-state-business-primary, #4176e6);
  outline-offset: 1px;
}
.mdrev-toolbar:focus-visible { outline-offset: 2px; }
.mdrev-pin:focus-visible {
  outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-alias-state-business-primary, #4176e6);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .mdrev-card,
  .mdrev-card-actions,
  .mdrev-icon-btn,
  .mdrev-btn,
  .mdrev-toggle,
  .mdrev-pin,
  .mdrev-input { transition: none; }
  .mdrev-card[data-flash="true"],
  .mdrev-empty-icon,
  .mdrev-toast,
  .mdrev-toolbar-wrap,
  .mdrev-toolbar,
  .mdrev-editor,
  .mdrev-scrim,
  .mdrev-panel[data-drawer="true"],
  .mdrev-pin[data-flash="true"] { animation: none; }
  .mdrev-toggle:active { transform: none; }
  .mdrev-pin:hover { transform: translate(2px, -50%); }
  .mdrev-spinner { animation-duration: 1.4s; }
}
`;

let injected = false;

/**
 * Inject the stylesheet once per page. Safe to call from render or effects:
 * the module keeps a boolean and the DOM query guards against duplicate tags.
 */
export function ensureStyle() {
  if (injected) return;
  if (typeof document === 'undefined') return;
  injected = true;
  if (document.querySelector(`style[data-plugin-css="${TAG}"]`) !== null) return;
  const tag = document.createElement('style');
  tag.dataset.pluginCss = TAG;
  tag.dataset.plugin = 'md-review';
  tag.textContent = UI_CSS;
  document.head.appendChild(tag);
}
