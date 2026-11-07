/**
 * Pure message composition for the Markdown review plugin (SPEC §6).
 *
 * `composeReviewMessage` turns the currently open comments plus the document
 * note into one Markdown message for the conversation. It is deliberately
 * free of React/store/i18n imports: every label comes from the `labels` map
 * the caller passes (`t` bindings are provided by the slot, SPEC §10), with
 * simple `{name}` placeholder replacement. Built-in Chinese fallbacks keep the
 * function usable (and testable) when no labels are supplied.
 *
 * Label shapes accepted (first match wins):
 * - namespaced keys, e.g. `{ 'message.header': '…{fileName}…' }` (SPEC naming);
 * - the flat keys produced by `i18n.messageLabels(t)`:
 *   `header/path/line/section/original/instruction/note/footer`;
 * - a `t(key)` lookup function.
 *
 * When the header template carries `{filePath}` the path is inlined (SPEC §6
 * example). Otherwise a separate `path` label is emitted on the line right
 * below the header, so `message.path` from i18n is honoured too.
 */

const DEFAULT_LABELS = {
  'message.header': '以下是我对文档《{fileName}》（{filePath}）的修改意见，请逐条处理：',
  'message.headerNoPath': '以下是我对文档《{fileName}》的修改意见，请逐条处理：',
  'message.line': '第 {line} 行',
  'message.section': '章节「{section}」',
  'message.quoteLabel': '原文：',
  'message.commentLabel': '修改意见：{body}',
  'message.noteLabel': '整体说明：{note}',
  'message.footer': '请只修改上述指出的位置，保持其他内容与格式不变；完成后逐条说明处理结果。',
};

/** Candidate keys per logical label, namespaced first (SPEC) then flat (i18n). */
const LABEL_KEYS = {
  'message.header': ['message.header', 'header'],
  'message.headerNoPath': ['message.headerNoPath', 'headerNoPath'],
  'message.path': ['message.path', 'path'],
  'message.line': ['message.line', 'line'],
  'message.section': ['message.section', 'section'],
  'message.quoteLabel': ['message.quoteLabel', 'message.original', 'original'],
  'message.commentLabel': ['message.commentLabel', 'message.instruction', 'instruction'],
  'message.noteLabel': ['message.noteLabel', 'message.note', 'note'],
  'message.footer': ['message.footer', 'footer'],
};

/** Replace `{name}` placeholders; unresolved placeholders are left intact. */
function interpolate(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  );
}

/** Read a raw label template from an object or a `t` function. */
function rawLabel(labels, key) {
  const candidates = LABEL_KEYS[key] || [key];
  for (const candidate of candidates) {
    if (typeof labels === 'function') {
      const value = labels(candidate);
      // `t` implementations usually echo the key when it is missing.
      if (typeof value === 'string' && value.length > 0 && value !== candidate) return value;
      continue;
    }
    if (labels && typeof labels === 'object') {
      const value = labels[candidate];
      if (typeof value === 'string' && value.length > 0) return value;
    }
  }
  return undefined;
}

/** Resolve a label template and interpolate it, falling back internally. */
function label(labels, key, params = {}) {
  const template = rawLabel(labels, key) ?? DEFAULT_LABELS[key] ?? '';
  return interpolate(template, params);
}

/**
 * Resolve a label that carries a free-form value (comment body / note).
 * If a custom template forgot the `{param}` placeholder the value is appended
 * instead of being silently dropped.
 */
function labelWithValue(labels, key, param, value, params = {}) {
  const template = rawLabel(labels, key) ?? DEFAULT_LABELS[key] ?? '';
  if (template.includes(`{${param}}`)) {
    return interpolate(template, { ...params, [param]: value });
  }
  return `${template}${value}`;
}

function toText(value) {
  return value == null ? '' : String(value);
}

/** Remove a `{filePath}` placeholder together with its surrounding parentheses. */
function stripPathPlaceholder(template) {
  return template.replace(/[ \t]*[（(]\s*\{filePath\}\s*[）)]/g, '');
}

/**
 * Build the opening block: header sentence plus, depending on the labels, the
 * file path either inlined in the sentence or on the following line.
 */
function buildHeader(labels, fileName, filePath) {
  const headerTemplate = rawLabel(labels, 'message.header') ?? DEFAULT_LABELS['message.header'];
  if (filePath.length === 0) {
    const noPath = rawLabel(labels, 'message.headerNoPath');
    if (typeof noPath === 'string' && noPath.length > 0) {
      return interpolate(noPath, { fileName });
    }
    return interpolate(stripPathPlaceholder(headerTemplate), { fileName });
  }
  if (headerTemplate.includes('{filePath}')) {
    return interpolate(headerTemplate, { fileName, filePath });
  }
  const header = interpolate(headerTemplate, { fileName });
  const pathTemplate = rawLabel(labels, 'message.path');
  const pathLine =
    typeof pathTemplate === 'string' && pathTemplate.length > 0
      ? interpolate(pathTemplate, { filePath })
      : filePath;
  return `${header}\n${pathLine}`;
}

/** Format one numbered comment block, indented under its header line. */
function formatComment(comment, index, labels) {
  const lineNumber = Number.isInteger(comment && comment.line) && comment.line > 0 ? comment.line : null;
  const section = toText(comment && comment.section).trim();
  const quote = toText(comment && comment.quote).trim();
  const body = toText(comment && comment.body).trim();

  const location = [];
  if (lineNumber !== null) location.push(label(labels, 'message.line', { line: lineNumber }));
  if (section.length > 0) location.push(label(labels, 'message.section', { section }));
  const head = location.length > 0 ? `${index}. ${location.join(' · ')}` : `${index}.`;

  const lines = [head];
  if (quote.length > 0) {
    lines.push(`   ${label(labels, 'message.quoteLabel')}`);
    for (const quoteLine of quote.split(/\r?\n/)) {
      lines.push(`   > ${quoteLine}`);
    }
  }
  lines.push(`   ${labelWithValue(labels, 'message.commentLabel', 'body', body)}`);
  return lines.join('\n');
}

/**
 * Compose the whole document review message (SPEC §6).
 *
 * @param {object} input
 * @param {string} input.fileName   file name shown in the header, e.g. `PRD.md`
 * @param {string} [input.filePath] absolute (preferred) or workspace path
 * @param {string} [input.note]     document-level note, may be empty
 * @param {Array<object>} [input.comments] open comments, ascending by createdAt
 * @param {object|Function} [input.labels] i18n label templates, or a `t` function
 * @returns {string}
 */
export function composeReviewMessage({ fileName, filePath, note, comments, labels } = {}) {
  const name = toText(fileName).trim();
  const path = toText(filePath).trim();
  const noteText = toText(note).trim();
  const list = (Array.isArray(comments) ? comments : [])
    .filter((comment) => comment && typeof comment === 'object')
    // Caller promises createdAt-ascending input; sorting a copy makes the
    // numbering deterministic even if that promise is broken.
    .slice()
    .sort((a, b) => (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0));

  const items = list.map((comment, index) => formatComment(comment, index + 1, labels));
  const blocks = [buildHeader(labels, name, path)];
  if (items.length > 0) blocks.push(items.join('\n\n'));
  if (noteText.length > 0) {
    blocks.push(labelWithValue(labels, 'message.noteLabel', 'note', noteText));
  }
  blocks.push(label(labels, 'message.footer'));
  // Trim plain trailing spaces (blank quote lines become “   >”), but keep the
  // message itself free of a trailing newline.
  return blocks.join('\n\n').replace(/[ \t]+$/gm, '');
}
