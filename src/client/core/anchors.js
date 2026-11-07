/**
 * Pure text-anchor helpers for the Markdown review plugin (SPEC §4).
 *
 * Nothing in this module touches the DOM, React or the browser: every export
 * works on plain strings and plain data, never mutates its arguments, and can
 * be exercised under `node --test`.
 *
 * Vocabulary:
 * - `text`       rendered document text (the document container's textContent).
 * - `sourceText` Markdown source text, used only to derive a 1-based line number.
 */

/** Coerce a numeric input to a clamped integer offset. */
function toOffset(value, length) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(Math.trunc(number), 0), length);
}

/** Length of the longest common suffix of `a` and `b` (contiguous). */
function commonSuffixLength(a, b) {
  const limit = Math.min(a.length, b.length);
  let length = 0;
  while (length < limit && a[a.length - 1 - length] === b[b.length - 1 - length]) {
    length += 1;
  }
  return length;
}

/** Length of the longest common prefix of `a` and `b` (contiguous). */
function commonPrefixLength(a, b) {
  const limit = Math.min(a.length, b.length);
  let length = 0;
  while (length < limit && a[length] === b[length]) {
    length += 1;
  }
  return length;
}

/**
 * Build persistable anchor fields from full text + selection offsets.
 *
 * Trims whitespace at both selection edges before capturing the quote; the
 * prefix/suffix windows are taken against those trimmed edges. Offsets may be
 * given in either order and are clamped to the text bounds.
 *
 * @param {string} text
 * @param {number} start
 * @param {number} end
 * @param {number} [radius=24]
 * @returns {{ quote: string, prefix: string, suffix: string }}
 */
export function contextOf(text, start, end, radius = 24) {
  const source = text == null ? '' : String(text);
  const length = source.length;
  let from = toOffset(start, length);
  let to = toOffset(end, length);
  if (from > to) {
    const swap = from;
    from = to;
    to = swap;
  }
  while (from < to && /\s/.test(source[from])) from += 1;
  while (to > from && /\s/.test(source[to - 1])) to -= 1;
  const rawRadius = radius == null ? 24 : Number(radius);
  const width = Number.isFinite(rawRadius) ? Math.max(0, Math.trunc(rawRadius)) : 24;
  return {
    quote: source.slice(from, to),
    prefix: source.slice(Math.max(0, from - width), from),
    suffix: source.slice(to, Math.min(length, to + width)),
  };
}

/**
 * Re-locate a persisted comment inside a (possibly changed) rendered text.
 *
 * Strategy (SPEC §4): find every occurrence of `quote`, score each candidate
 * by how much of the stored prefix/suffix still matches contiguously against
 * the surrounding text, keep the highest score and, on ties, the earliest
 * occurrence.
 *
 * @param {string} text
 * @param {{ quote?: string, prefix?: string, suffix?: string }} comment
 * @returns {{ start: number, end: number, exact: boolean, score: number } | null}
 */
export function locateAnchor(text, comment) {
  const source = text == null ? '' : String(text);
  const quote = comment && comment.quote != null ? String(comment.quote) : '';
  if (quote.length === 0) return null;
  const prefix = comment && comment.prefix != null ? String(comment.prefix) : '';
  const suffix = comment && comment.suffix != null ? String(comment.suffix) : '';

  let best = null;
  let index = source.indexOf(quote);
  while (index !== -1) {
    const end = index + quote.length;
    const before = source.slice(Math.max(0, index - prefix.length), index);
    const after = source.slice(end, Math.min(source.length, end + suffix.length));
    const prefixScore = commonSuffixLength(before, prefix);
    const suffixScore = commonPrefixLength(after, suffix);
    const score = prefixScore + suffixScore;
    // Occurrences are visited in ascending order, so a strict `>` keeps the
    // earliest candidate on ties (SPEC: 并列取最靠前者).
    if (best === null || score > best.score) {
      best = {
        start: index,
        end,
        exact: prefixScore === prefix.length && suffixScore === suffix.length,
        score,
      };
    }
    index = source.indexOf(quote, index + 1);
  }
  return best;
}

/**
 * Batch re-location. Returns one map entry per comment id; comments whose
 * quote is gone from the text map to `null`.
 *
 * @param {string} text
 * @param {Array<{ id: string, quote?: string, prefix?: string, suffix?: string }>} comments
 * @returns {Map<string, { start: number, end: number } | null>}
 */
export function locateAll(text, comments) {
  const result = new Map();
  const list = Array.isArray(comments) ? comments : [];
  for (const comment of list) {
    if (!comment || comment.id == null) continue;
    const found = locateAnchor(text, comment);
    result.set(comment.id, found ? { start: found.start, end: found.end } : null);
  }
  return result;
}

/**
 * Collapse every whitespace run to a single space while remembering where each
 * normalized character came from in the original string.
 *
 * @param {string} value
 * @returns {{ text: string, map: number[] }}
 */
function collapseWhitespace(value) {
  let text = '';
  const map = [];
  let pendingSpace = false;
  let pendingIndex = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (/\s/.test(char)) {
      if (!pendingSpace) {
        pendingSpace = true;
        pendingIndex = index;
      }
      continue;
    }
    if (pendingSpace) {
      text += ' ';
      map.push(pendingIndex);
      pendingSpace = false;
    }
    text += char;
    map.push(index);
  }
  return { text, map };
}

/** 1-based line number of a character offset inside `source`. */
function lineAt(source, index) {
  let line = 1;
  for (let cursor = 0; cursor < index && cursor < source.length; cursor += 1) {
    if (source[cursor] === '\n') line += 1;
  }
  return line;
}

/**
 * Markdown structural characters that never appear in rendered text. Removing
 * them (together with whitespace) lets a quote that spans block boundaries or
 * table cells line up with the source again.
 */
const MARKUP_CHARS = new Set(['|', '`', '*', '_', '~', '#', '>', '[', ']', '(', ')', '!', '\\', '-', '+', '=']);

/**
 * Compact a Markdown string for cross-block matching while remembering the
 * source offset of every kept character. Link/image destinations and HTML tags
 * are skipped, list markers at line starts are dropped.
 *
 * @param {string} value
 * @returns {{ text: string, map: number[] }}
 */
function compactMarkup(value) {
  let text = '';
  const map = [];
  let lineStart = true;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (/\s/u.test(char)) {
      if (char === '\n' || char === '\r') lineStart = true;
      continue;
    }
    if (lineStart) {
      lineStart = false;
      const marker = /^(?:\d{1,9}[.)][ \t]+|[-*+][ \t]+)/u.exec(value.slice(index));
      if (marker !== null) {
        index += marker[0].length - 1;
        continue;
      }
    }
    if (char === '<') {
      const close = value.indexOf('>', index + 1);
      if (close !== -1 && close - index <= 120) {
        index = close;
        continue;
      }
    }
    if (char === ']' && value[index + 1] === '(') {
      const close = value.indexOf(')', index + 2);
      if (close !== -1) {
        index = close;
        continue;
      }
    }
    if (char === '!' && (value[index + 1] === '[' || value[index + 1] === '(')) continue;
    if (MARKUP_CHARS.has(char)) continue;
    text += char;
    map.push(index);
  }
  return { text, map };
}

/** Try one normalized form against the source; return the source line or null. */
function lineOfNormalized(source, normalized, needle) {
  const index = normalized.text.indexOf(needle);
  if (index === -1) return null;
  return lineAt(source, normalized.map[index]);
}

/**
 * Find the 1-based Markdown source line where `quote` lives (SPEC §4).
 *
 * Tries, in order: exact `indexOf`, whitespace-normalized text, a
 * markup-stripped "compact" form (quotes spanning paragraphs, list items or
 * table cells), then the quote's leading characters in raw / normalized /
 * compact form. Returns `null` when none matches.
 *
 * @param {string} sourceText
 * @param {string} quote
 * @returns {number | null}
 */
export function lineOfQuote(sourceText, quote) {
  const source = sourceText == null ? '' : String(sourceText);
  const rawQuote = quote == null ? '' : String(quote).trim();
  if (source.length === 0 || rawQuote.length === 0) return null;

  const direct = source.indexOf(rawQuote);
  if (direct !== -1) return lineAt(source, direct);

  const normalized = collapseWhitespace(source);
  const normalizedQuote = collapseWhitespace(rawQuote).text;
  const normalizedLine = lineOfNormalized(source, normalized, normalizedQuote);
  if (normalizedLine !== null) return normalizedLine;

  const compact = compactMarkup(source);
  const compactQuote = compactMarkup(rawQuote).text;
  if (compactQuote.length >= 2) {
    const compactLine = lineOfNormalized(source, compact, compactQuote);
    if (compactLine !== null) return compactLine;
  }

  // Last resort: the leading part of the quote. Longer prefixes are more
  // precise; shorter ones still find a moved quote after small edits.
  for (const length of [24, 8]) {
    const prefix = rawQuote.slice(0, length);
    if (prefix.length === 0) continue;
    const raw = source.indexOf(prefix);
    if (raw !== -1) return lineAt(source, raw);
    const prefixLine = lineOfNormalized(source, normalized, collapseWhitespace(prefix).text);
    if (prefixLine !== null) return prefixLine;
    const compactPrefix = compactMarkup(prefix).text;
    if (compactPrefix.length >= 2) {
      const compactPrefixLine = lineOfNormalized(source, compact, compactPrefix);
      if (compactPrefixLine !== null) return compactPrefixLine;
    }
  }
  return null;
}
