/**
 * Browser-only DOM helpers for the Markdown review plugin (SPEC §5).
 *
 * Only native browser APIs are used (Selection/Range/textContent and the CSS
 * Custom Highlight API); React/store/i18n are not imported. Every entry point
 * degrades silently when the relevant browser feature is missing, so the
 * module can also be imported under Node (`node --test`) as long as no DOM
 * function is actually called.
 */
import { contextOf } from './anchors.js';

/** Data-model limit for `ReviewComment.quote` (SPEC §3). */
const MAX_QUOTE_LENGTH = 400;

/** `Node.DOCUMENT_POSITION_FOLLOWING`, kept numeric so Node has no `Node` global. */
const DOCUMENT_POSITION_FOLLOWING = 4;

/** Ordered text nodes inside `container` (same order as `textContent`). */
function textNodes(container) {
  const nodes = [];
  const visit = (node) => {
    if (!node) return;
    if (node.nodeType === 3) {
      nodes.push(node);
      return;
    }
    const children = node.childNodes;
    if (!children) return;
    for (let index = 0; index < children.length; index += 1) visit(children[index]);
  };
  visit(container);
  return nodes;
}

/** Total text length of a node (recursive). */
function textLength(node) {
  if (!node) return 0;
  if (node.nodeType === 3) return (node.nodeValue || '').length;
  const children = node.childNodes;
  if (!children) return 0;
  let total = 0;
  for (let index = 0; index < children.length; index += 1) total += textLength(children[index]);
  return total;
}

/** True when `node` is `container` or one of its descendants. */
function containsNode(container, node) {
  if (!container || !node) return false;
  if (container === node) return true;
  if (typeof container.contains === 'function') return container.contains(node);
  return false;
}

/** Plain rectangle object from any DOMRect-like value. */
function toPlainRect(rect) {
  const width = typeof rect.width === 'number' ? rect.width : rect.right - rect.left;
  const height = typeof rect.height === 'number' ? rect.height : rect.bottom - rect.top;
  return {
    left: rect.left,
    top: rect.top,
    right: typeof rect.right === 'number' ? rect.right : rect.left + width,
    bottom: typeof rect.bottom === 'number' ? rect.bottom : rect.top + height,
    width,
    height,
  };
}

/** Build a DOMRect when available, otherwise a plain object with the same shape. */
function makeRect(left, top, right, bottom) {
  const width = right - left;
  const height = bottom - top;
  if (typeof DOMRect === 'function') {
    try {
      return new DOMRect(left, top, width, height);
    } catch {
      /* fall through to a plain object */
    }
  }
  return { left, top, right, bottom, width, height, x: left, y: top };
}

/** First non-empty client rect of a range (visual start of the selection). */
function firstSelectionRect(range) {
  try {
    if (typeof range.getClientRects === 'function') {
      const rects = range.getClientRects();
      for (let index = 0; index < rects.length; index += 1) {
        const rect = rects[index];
        if (rect && (rect.width > 0 || rect.height > 0)) return toPlainRect(rect);
      }
    }
  } catch {
    /* ignore */
  }
  try {
    if (typeof range.getBoundingClientRect === 'function') {
      const rect = range.getBoundingClientRect();
      if (rect && (rect.width > 0 || rect.height > 0)) return toPlainRect(rect);
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Nearest h1–h6 text before `node` inside `container`; trailing `#` (anchor
 * artifacts) is stripped. Returns `''` when the selection has no heading above.
 */
function sectionAt(container, node) {
  if (!container || !node || typeof container.querySelectorAll !== 'function') return '';
  let headings;
  try {
    headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  } catch {
    return '';
  }
  let section = '';
  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    if (!heading || typeof heading.compareDocumentPosition !== 'function') continue;
    const position = heading.compareDocumentPosition(node);
    // FOLLOWING bit: `node` comes after the heading (or is contained by it,
    // which also counts as being "at" that heading).
    if (!(position & DOCUMENT_POSITION_FOLLOWING)) continue;
    const text = String(heading.textContent || '').replace(/#+\s*$/, '').trim();
    if (text.length > 0) section = text;
  }
  return section;
}

/**
 * Text offset of a DOM boundary (`node`, `offset`) measured in `container`'s
 * rendered text. Boundary containers are normally text nodes, but element
 * boundaries (triple click / select-all) are handled too.
 */
function offsetOf(container, node, offset) {
  let consumed = 0;
  let found;
  const visit = (current) => {
    if (found !== undefined) return;
    if (current === node) {
      if (current.nodeType === 3) {
        const length = (current.nodeValue || '').length;
        found = consumed + Math.min(Math.max(Number(offset) || 0, 0), length);
        return;
      }
      const children = current.childNodes;
      let total = consumed;
      if (children) {
        const limit = Math.min(Math.max(Number(offset) || 0, 0), children.length);
        for (let index = 0; index < limit; index += 1) total += textLength(children[index]);
      }
      found = total;
      return;
    }
    if (current.nodeType === 3) {
      consumed += (current.nodeValue || '').length;
      return;
    }
    const children = current.childNodes;
    if (!children) return;
    for (let index = 0; index < children.length; index += 1) visit(children[index]);
  };
  visit(container);
  return found === undefined ? null : found;
}

/** Fallback scrolling when the container itself is not scrollable. */
function scrollRangeIntoView(range) {
  try {
    const startNode = range.startContainer;
    const element = startNode && startNode.nodeType === 1 ? startNode : startNode && startNode.parentElement;
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  } catch {
    /* ignore */
  }
}

/**
 * Markdown/live-preview DOM text (SPEC §5): all text nodes inside `container`
 * joined in document order.
 *
 * @param {Node | null} container
 * @returns {string}
 */
export function documentText(container) {
  if (!container) return '';
  let text = '';
  const visit = (node) => {
    if (!node) return;
    if (node.nodeType === 3) {
      text += node.nodeValue || '';
      return;
    }
    const children = node.childNodes;
    if (!children) return;
    for (let index = 0; index < children.length; index += 1) visit(children[index]);
  };
  visit(container);
  return text;
}

/**
 * Section heading text for a rendered-text offset.
 *
 * Used when the document was edited and a persisted comment's old `section`
 * may no longer describe where its quote now sits.
 *
 * @param {Node | null} container
 * @param {number} offset
 * @returns {string}
 */
export function sectionAtOffset(container, offset) {
  if (!container) return '';
  const range = rangeFromOffsets(container, offset, offset);
  if (range === null) return '';
  return sectionAt(container, range.startContainer);
}

/**
 * Convert rendered-text offsets into a DOM Range (SPEC §5).
 * Returns `null` for out-of-range or inverted offsets.
 *
 * @param {Node | null} container
 * @param {number} start
 * @param {number} end
 * @returns {Range | null}
 */
export function rangeFromOffsets(container, start, end) {
  if (!container) return null;
  const begin = Number(start);
  const finish = Number(end);
  if (!Number.isInteger(begin) || !Number.isInteger(finish)) return null;
  if (begin < 0 || finish < 0 || begin > finish) return null;
  const text = documentText(container);
  if (finish > text.length) return null;
  if (typeof document === 'undefined' || !document || typeof document.createRange !== 'function') return null;

  let consumed = 0;
  let startNode = null;
  let startOffset = 0;
  let endNode = null;
  let endOffset = 0;
  for (const node of textNodes(container)) {
    const length = (node.nodeValue || '').length;
    if (startNode === null && begin <= consumed + length) {
      startNode = node;
      startOffset = begin - consumed;
    }
    if (endNode === null && finish <= consumed + length) {
      endNode = node;
      endOffset = finish - consumed;
    }
    consumed += length;
  }
  // Empty container: a collapsed range can still anchor to the container.
  if (startNode === null && begin === 0) {
    startNode = container;
    startOffset = 0;
  }
  if (endNode === null && finish === 0) {
    endNode = container;
    endOffset = 0;
  }
  if (startNode === null || endNode === null) return null;
  try {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
  } catch {
    return null;
  }
}

/**
 * Current DOM selection as a persistable anchor (SPEC §5).
 * Returns `null` for collapsed/whitespace-only selections, selections that
 * leave `container`, and environments without a live selection.
 *
 * @param {Node | null} container
 * @returns {{
 *   quote: string, prefix: string, suffix: string,
 *   start: number, end: number,
 *   section: string,
 *   rect: { left: number, top: number, right: number, bottom: number, width: number, height: number },
 * } | null}
 */
export function readSelection(container) {
  if (!container || typeof window === 'undefined') return null;
  const selection = typeof window.getSelection === 'function' ? window.getSelection() : null;
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  let range;
  try {
    range = selection.getRangeAt(0);
  } catch {
    return null;
  }
  if (!range) return null;
  if (!containsNode(container, range.startContainer) || !containsNode(container, range.endContainer)) return null;
  if (!containsNode(container, range.commonAncestorContainer)) return null;

  const text = documentText(container);
  const rawStart = offsetOf(container, range.startContainer, range.startOffset);
  const rawEnd = offsetOf(container, range.endContainer, range.endOffset);
  if (rawStart === null || rawEnd === null) return null;
  // A reversed selection would have start > end; DOM Ranges are normalized, so
  // this only guards against unexpected boundary containers.
  if (rawStart > rawEnd) return null;
  if (rawStart === rawEnd) return null;

  let start = rawStart;
  let end = rawEnd;
  while (start < end && /\s/.test(text[start])) start += 1;
  while (end > start && /\s/.test(text[end - 1])) end -= 1;
  if (start === end) return null;
  if (end - start > MAX_QUOTE_LENGTH) end = start + MAX_QUOTE_LENGTH;

  const anchor = contextOf(text, start, end);
  if (!anchor.quote) return null;
  const rect = firstSelectionRect(range);
  if (!rect) return null;
  return {
    quote: anchor.quote,
    prefix: anchor.prefix,
    suffix: anchor.suffix,
    start,
    end,
    section: sectionAt(container, range.startContainer),
    rect,
  };
}

/**
 * Paint a named CSS Custom Highlight (SPEC §5 highlight names: `md-review`,
 * `md-review-active`, `md-review-draft`). `ranges` accepts `{ start, end }`
 * text offsets or DOM `Range` instances. Silently does nothing where the
 * Custom Highlight API is unavailable.
 *
 * @param {string} name
 * @param {Node | null} container
 * @param {Array<{ start: number, end: number } | Range>} ranges
 */
export function setHighlight(name, container, ranges) {
  if (!name) return;
  const api = typeof CSS !== 'undefined' && CSS ? CSS : null;
  if (!api || !api.highlights) return;
  const HighlightCtor = typeof Highlight === 'function' ? Highlight : undefined;
  if (typeof HighlightCtor !== 'function') return;

  const list = Array.isArray(ranges) ? ranges : ranges ? [ranges] : [];
  const domRanges = [];
  for (const item of list) {
    if (!item) continue;
    if (typeof item.start === 'number' && typeof item.end === 'number') {
      const range = rangeFromOffsets(container, item.start, item.end);
      if (range) domRanges.push(range);
    } else if (typeof item.setStart === 'function' && item.startContainer) {
      domRanges.push(item);
    }
  }
  try {
    api.highlights.set(name, new HighlightCtor(...domRanges));
  } catch {
    /* no-op */
  }
}

/**
 * Remove a named highlight (SPEC §5). Safe to call for names that were never
 * registered, and a no-op without Custom Highlight support.
 *
 * @param {string} name
 */
export function clearHighlight(name) {
  if (!name) return;
  const api = typeof CSS !== 'undefined' && CSS ? CSS : null;
  if (!api || !api.highlights || typeof api.highlights.delete !== 'function') return;
  try {
    api.highlights.delete(name);
  } catch {
    /* no-op */
  }
}

/**
 * Viewport bounding box of a range (union of its client rects), or `null` when
 * the range has no visible geometry.
 *
 * @param {Range | null} range
 * @returns {DOMRect | { left: number, top: number, right: number, bottom: number, width: number, height: number } | null}
 */
export function rangeRect(range) {
  if (!range) return null;
  const rects = [];
  try {
    if (typeof range.getClientRects === 'function') {
      const list = range.getClientRects();
      for (let index = 0; index < list.length; index += 1) rects.push(list[index]);
    }
  } catch {
    /* ignore */
  }
  const usable = rects.filter((rect) => rect && (rect.width > 0 || rect.height > 0));
  const pool = usable.length > 0 ? usable : rects;
  if (pool.length === 0) {
    try {
      if (typeof range.getBoundingClientRect === 'function') {
        const bound = range.getBoundingClientRect();
        if (bound && (bound.width > 0 || bound.height > 0)) return toPlainRect(bound);
      }
    } catch {
      /* ignore */
    }
    return null;
  }
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const rect of pool) {
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, typeof rect.right === 'number' ? rect.right : rect.left + rect.width);
    bottom = Math.max(bottom, typeof rect.bottom === 'number' ? rect.bottom : rect.top + rect.height);
  }
  if (!(right > left || bottom > top)) return null;
  return makeRect(left, top, right, bottom);
}

/**
 * Scroll a range into the container's viewport, centred where possible with a
 * 40px margin; a no-op when the range is already comfortably visible (SPEC §5).
 *
 * @param {HTMLElement | null} container
 * @param {Range | null} range
 */
export function scrollToRange(container, range) {
  if (!container || !range) return;
  const rect = rangeRect(range);
  if (!rect) return;

  const margin = 40;
  let containerRect = null;
  try {
    if (typeof container.getBoundingClientRect === 'function') containerRect = container.getBoundingClientRect();
  } catch {
    containerRect = null;
  }
  const viewHeight =
    typeof container.clientHeight === 'number' && container.clientHeight > 0
      ? container.clientHeight
      : containerRect
        ? containerRect.height
        : 0;
  const scrollHeight = typeof container.scrollHeight === 'number' ? container.scrollHeight : 0;
  const scrollTop = typeof container.scrollTop === 'number' ? container.scrollTop : 0;
  const scrollable = Boolean(containerRect) && viewHeight > 0 && scrollHeight > viewHeight;
  if (!scrollable) {
    scrollRangeIntoView(range);
    return;
  }
  const visibleTop = containerRect.top + margin;
  const visibleBottom = containerRect.top + viewHeight - margin;
  if (rect.top >= visibleTop && rect.bottom <= visibleBottom) return;

  const centered = scrollTop + (rect.top - containerRect.top) - (viewHeight - rect.height) / 2;
  const maxScroll = Math.max(0, scrollHeight - viewHeight);
  const target = Math.min(maxScroll, Math.max(0, centered));
  try {
    if (typeof container.scrollTo === 'function') {
      container.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
  } catch {
    /* fall back to assignment */
  }
  container.scrollTop = target;
}
