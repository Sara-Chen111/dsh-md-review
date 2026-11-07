/**
 * Copy owned by this plugin. The slot registration binds the `mdReview`
 * namespace, so every component receives a `t` that looks up these keys.
 */

export const NS = 'mdReview';

const zh = {
  'viewer.label': '批注视图',

  'common.cancel': '取消',
  'common.save': '保存',
  'common.delete': '删除',
  'common.edit': '编辑',
  'common.close': '关闭',
  'common.more': '更多',

  'panel.title': '批注',
  'panel.aria': '批注面板',
  'panel.expand': '展开批注栏',
  'panel.collapse': '收起批注栏',
  'panel.emptyHint': '在文档中选中文字，即可添加批注',
  'panel.emptySubHint': '批注会显示在这里，最后可统一发送给 Agent',
  'panel.sent': '已发送',
  'panel.stale': '原文已修改，可能定位不准',
  'panel.line': '第 {line} 行',
  'panel.section': '章节「{section}」',
  'panel.clearSent': '清除已发送',
  'panel.openComments': '批注',
  'panel.closeDrawer': '关闭批注栏',
  'panel.pending': '{count} 条待发送',

  'card.locate': '定位',
  'card.edit': '编辑',
  'card.delete': '删除',
  'card.deleteConfirm': '再次点击删除',
  'card.index': '第 {index} 条',
  'card.quoteAria': '引用原文',

  'toolbar.add': '添加批注',
  'toolbar.addAria': '为选中的文字添加批注',

  'editor.title': '添加批注',
  'editor.quoteLabel': '引用原文',
  'editor.placeholder': '写下你的修改意见，例如：这里的结论太笼统，补充一个数据支撑。',
  'editor.save': '保存批注',
  'editor.saveHint': '⌘Enter 保存 · Esc 取消',
  'editor.empty': '请先写修改意见',
  'editor.cancel': '取消',

  'composer.title': '统一发送',
  'composer.placeholder': '对整份文档的补充说明（可选），例如：请按以上意见修改，保持原有结构。',
  'composer.send': '发送到对话',
  'composer.sending': '发送中…',
  'composer.sendCount': '发送 {count} 条批注',
  'composer.hint': '将合并为一条消息发送到当前会话',
  'composer.empty': '暂无可发送的批注',
  'composer.sentToast': '已将 {count} 条批注发送到对话',
  'composer.failedToast': '发送失败，请重试',
  'composer.noteLabel': '整体说明',
  'composer.insert': '仅填入对话',
  'composer.insertedToast': '已填入对话输入框',
  'composer.openHint': '选中文字开始批注',

  'aria.commentIndex': '第 {index} 条批注：{excerpt}',
  'aria.reviewToggle': '批注栏，{count} 条待发送',
  'aria.addComment': '添加批注',
  'aria.pin': '批注 {index}',

  'message.header': '以下是我对文档《{fileName}》的修改意见，请逐条处理：',
  'message.path': '文件路径：{filePath}',
  'message.line': '第 {line} 行',
  'message.section': '章节「{section}」',
  'message.original': '原文：',
  'message.instruction': '修改意见：{body}',
  'message.note': '整体说明：{note}',
  'message.footer': '请只修改上述指出的位置，保持其他内容与格式不变；完成后逐条说明处理结果。',

  'code.copy': '复制',
  'code.copied': '已复制',
  'code.title': '代码块',
  'code.wrap': '自动换行',
  'code.unwrap': '取消换行',
  'footnotes': '脚注',
  'preview.viewerAria': '查看器',
  'preview.viewerTitle': '批注视图',
  'preview.docAria': '文档内容',
  'panel.empty': '在文档中选中文字，即可添加批注',
  'composer.chars': '{count} 字',
  'composer.clearSent': '清除已发送 ({count})',
  'editor.quote': '引用原文',
  'editor.saving': '保存中…',
  'card.sent': '已发送',
  'card.line': '第 {line} 行',
  'aria.expandPanel': '展开批注栏',
  'aria.collapsePanel': '收起批注栏',
  'aria.closeEditor': '关闭',
  'aria.send': '发送到对话',
  'aria.clearSent': '清除已发送',
  'aria.editComment': '编辑批注',
  'aria.deleteComment': '删除批注',
  'aria.locateComment': '定位到原文',
  'aria.commentBody': '批注内容',
  'aria.note': '整体说明',
  'aria.quote': '引文',
  'aria.comment': '批注 {index}',
  'aria.panel': '批注栏',
  'aria.sent': '已发送',
};
const en = {
  'viewer.label': 'Review view',

  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.close': 'Close',
  'common.more': 'More',

  'panel.title': 'Comments',
  'panel.aria': 'Comments panel',
  'panel.expand': 'Show comments',
  'panel.collapse': 'Hide comments',
  'panel.emptyHint': 'Select text in the document to add a comment',
  'panel.emptySubHint': 'Comments appear here, ready to send to the Agent together',
  'panel.sent': 'Sent',
  'panel.stale': 'The document changed; this comment may be slightly off',
  'panel.line': 'Line {line}',
  'panel.section': 'Section “{section}”',
  'panel.clearSent': 'Clear sent',
  'panel.openComments': 'Comments',
  'panel.closeDrawer': 'Close comments',
  'panel.pending': '{count} to send',

  'card.locate': 'Locate',
  'card.edit': 'Edit',
  'card.delete': 'Delete',
  'card.deleteConfirm': 'Click again to delete',
  'card.index': 'Comment {index}',
  'card.quoteAria': 'Quoted text',

  'toolbar.add': 'Comment',
  'toolbar.addAria': 'Comment on the selected text',

  'editor.title': 'Add comment',
  'editor.quoteLabel': 'Quoted text',
  'editor.placeholder': 'Describe the change you want, for example: the conclusion is too vague; back it with a data point.',
  'editor.save': 'Save comment',
  'editor.saveHint': '⌘Enter to save · Esc to cancel',
  'editor.empty': 'Write a comment first',
  'editor.cancel': 'Cancel',

  'composer.title': 'Send together',
  'composer.placeholder': 'Anything that applies to the whole document (optional), e.g. keep the existing structure.',
  'composer.send': 'Send to chat',
  'composer.sending': 'Sending…',
  'composer.sendCount': 'Send {count} comments',
  'composer.hint': 'Merged into one message to the current session',
  'composer.empty': 'Nothing to send yet',
  'composer.sentToast': '{count} comments sent to the chat',
  'composer.failedToast': 'Send failed. Please try again.',
  'composer.noteLabel': 'General note',
  'composer.insert': 'Insert into chat',
  'composer.insertedToast': 'Inserted into the chat box',
  'composer.openHint': 'Select text to start reviewing',

  'aria.commentIndex': 'Comment {index}: {excerpt}',
  'aria.reviewToggle': 'Comments, {count} pending',
  'aria.addComment': 'Add comment',
  'aria.pin': 'Comment {index}',

  'message.header': 'I have review comments on the document “{fileName}”. Please address them one by one:',
  'message.path': 'File path: {filePath}',
  'message.line': 'line {line}',
  'message.section': 'section “{section}”',
  'message.original': 'Original text:',
  'message.instruction': 'Change requested: {body}',
  'message.note': 'General note: {note}',
  'message.footer': 'Only change the places listed above and keep the rest of the content and formatting intact. After finishing, summarize how each item was handled.',

  'code.copy': 'Copy',
  'code.copied': 'Copied',
  'code.title': 'Code block',
  'code.wrap': 'Wrap lines',
  'code.unwrap': 'Unwrap lines',
  'footnotes': 'Footnotes',
  'preview.viewerAria': 'Viewer',
  'preview.viewerTitle': 'Review view',
  'preview.docAria': 'Document content',
  'panel.empty': 'Select text in the document to add a comment',
  'composer.chars': '{count} chars',
  'composer.clearSent': 'Clear sent ({count})',
  'editor.quote': 'Quoted text',
  'editor.saving': 'Saving…',
  'card.sent': 'Sent',
  'card.line': 'Line {line}',
  'aria.expandPanel': 'Expand comments',
  'aria.collapsePanel': 'Collapse comments',
  'aria.closeEditor': 'Close',
  'aria.send': 'Send to chat',
  'aria.clearSent': 'Clear sent',
  'aria.editComment': 'Edit comment',
  'aria.deleteComment': 'Delete comment',
  'aria.locateComment': 'Locate in document',
  'aria.commentBody': 'Comment',
  'aria.note': 'Overall note',
  'aria.quote': 'Quote',
  'aria.comment': 'Comment {index}',
  'aria.panel': 'Comments',
  'aria.sent': 'Sent',
};

/** Dictionaries for `ctx.locale.register`. */
export const dictionaries = { zh, en };

/** Interpolate `{name}` placeholders. */
export function format(template, params) {
  if (params === undefined) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match,
  );
}

/** Template labels handed to the pure message composer. */
export function messageLabels(t) {
  return {
    header: t('message.header'),
    path: t('message.path'),
    line: t('message.line'),
    section: t('message.section'),
    original: t('message.original'),
    instruction: t('message.instruction'),
    note: t('message.note'),
    footer: t('message.footer'),
  };
}

/** Labels the shared MarkdownText primitive expects for code blocks. */
export function markdownLabels(t) {
  return {
    code: {
      copyLabel: t('code.copy'),
      copiedLabel: t('code.copied'),
      toolbarLabels: {
        codeLabel: t('code.title'),
        wrapLabel: t('code.wrap'),
        unwrapLabel: t('code.unwrap'),
      },
    },
    footnotes: t('footnotes'),
  };
}
