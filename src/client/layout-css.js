/**
 * Shell layout for the review view: the scrolling document column and the
 * frontmatter card. Panel/card/composer styling belongs to the UI module.
 */
const TAG = 'md-review/layout';

export const LAYOUT_CSS = `
.mdrev-app {
  display: flex;
  align-items: stretch;
  height: 100%;
  min-height: 0;
  min-width: 0;
  position: relative;
  background: var(--dsw-alias-bg-layer-0, transparent);
  font-family: var(--dsw-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
}
.mdrev-doc {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: auto;
  overscroll-behavior: contain;
  color: var(--dsw-alias-label-primary);
}
.mdrev-doc-inner {
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
}
.mdrev-md {
  padding: 10px 16px 96px;
  min-width: 0;
  white-space: normal;
  font-size: var(--dsh-content-font-size-secondary, 13px);
}
.mdrev-md > :first-child { margin-top: 0; }
.mdrev-frontmatter {
  margin: 12px 16px 4px;
  padding: 10px 12px;
  border: 0.5px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  border-radius: var(--dsw-radius-md, 10px);
  background: var(--dsw-alias-bg-layer-1, rgba(127,127,127,.05));
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 4px 14px;
  font: var(--dsw-font-markdown-small, 12px/1.5 inherit);
  color: var(--dsw-alias-label-secondary);
}
.mdrev-frontmatter-key {
  color: var(--dsw-alias-label-tertiary);
  font-variant-numeric: tabular-nums;
}
.mdrev-frontmatter-value {
  color: var(--dsw-alias-label-primary);
  overflow-wrap: anywhere;
}
.mdrev-frontmatter-raw {
  grid-column: 1 / -1;
  margin: 4px 0 0;
  font-family: var(--dsw-font-mono, ui-monospace, monospace);
  white-space: pre-wrap;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}
`;

/** Inject the stylesheet once per page. */
export function ensureLayoutStyle() {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`style[data-plugin-css="${TAG}"]`) !== null) return;
  const tag = document.createElement('style');
  tag.dataset.pluginCss = TAG;
  tag.dataset.plugin = 'md-review';
  tag.textContent = LAYOUT_CSS;
  document.head.appendChild(tag);
}
