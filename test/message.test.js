/**
 * Unit tests for src/client/core/message.js (SPEC §6).
 * Run with: `node --test test/`
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { composeReviewMessage } from '../src/client/core/message.js';

const FOOTER = '请只修改上述指出的位置，保持其他内容与格式不变；完成后逐条说明处理结果。';

/** A complete ReviewComment fixture (only the fields message.js consumes). */
function comment(overrides) {
  return {
    id: 'c1',
    quote: '用户类型 | 典型场景 | 核心诉求',
    prefix: '',
    suffix: '',
    section: '二、目标用户与场景',
    line: 12,
    body: '这里的表格缺少"学生"一行，请补充。',
    status: 'open',
    createdAt: 1,
    sentAt: null,
    ...overrides,
  };
}

test('composeReviewMessage: 与 SPEC §6 示例格式一致（中文默认 labels）', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/abs/path/PRD.md',
    note: '整体来看结构清晰，辛苦。',
    comments: [comment()],
    labels: {},
  });
  const expected = [
    '以下是我对文档《PRD.md》（/abs/path/PRD.md）的修改意见，请逐条处理：',
    '',
    '1. 第 12 行 · 章节「二、目标用户与场景」',
    '   原文：',
    '   > 用户类型 | 典型场景 | 核心诉求',
    '   修改意见：这里的表格缺少"学生"一行，请补充。',
    '',
    '整体说明：整体来看结构清晰，辛苦。',
    '',
    FOOTER,
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: 多行 quote 每行加 "> "，空行也保持引用块', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    comments: [
      comment({
        quote: '用户类型 | 典型场景 | 核心诉求\n第二行\n\n第四行',
        line: 3,
        section: '',
        body: '请补充。',
      }),
    ],
  });
  const expected = [
    '以下是我对文档《PRD.md》（/w/PRD.md）的修改意见，请逐条处理：',
    '',
    '1. 第 3 行',
    '   原文：',
    '   > 用户类型 | 典型场景 | 核心诉求',
    '   > 第二行',
    '   >',
    '   > 第四行',
    '   修改意见：请补充。',
    '',
    FOOTER,
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: line 为 null 省略行号，section 为空省略章节', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    comments: [comment({ line: null, section: '', quote: '目标用户', body: '补充' })],
  });
  const expected = [
    '以下是我对文档《PRD.md》（/w/PRD.md）的修改意见，请逐条处理：',
    '',
    '1.',
    '   原文：',
    '   > 目标用户',
    '   修改意见：补充',
    '',
    FOOTER,
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: note 为空时省略整体说明段', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/abs/path/PRD.md',
    note: '   ',
    comments: [comment()],
  });
  assert.ok(!message.includes('整体说明'));
  assert.equal(
    message,
    [
      '以下是我对文档《PRD.md》（/abs/path/PRD.md）的修改意见，请逐条处理：',
      '',
      '1. 第 12 行 · 章节「二、目标用户与场景」',
      '   原文：',
      '   > 用户类型 | 典型场景 | 核心诉求',
      '   修改意见：这里的表格缺少"学生"一行，请补充。',
      '',
      FOOTER,
    ].join('\n'),
  );
});

test('composeReviewMessage: 多条批注之间空一行且连续编号', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    comments: [
      comment({ id: 'c1', quote: '第一条引文', line: 3, section: '', body: '意见一' }),
      comment({ id: 'c2', quote: '第二条引文', line: null, section: '章节甲', body: '意见二' }),
    ],
  });
  const expected = [
    '以下是我对文档《PRD.md》（/w/PRD.md）的修改意见，请逐条处理：',
    '',
    '1. 第 3 行',
    '   原文：',
    '   > 第一条引文',
    '   修改意见：意见一',
    '',
    '2. 章节「章节甲」',
    '   原文：',
    '   > 第二条引文',
    '   修改意见：意见二',
    '',
    FOOTER,
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: 只有 note 没有批注时也生成合法消息', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    note: '整体节奏再快一点。',
    comments: [],
  });
  assert.equal(
    message,
    [
      '以下是我对文档《PRD.md》（/w/PRD.md）的修改意见，请逐条处理：',
      '',
      '整体说明：整体节奏再快一点。',
      '',
      FOOTER,
    ].join('\n'),
  );
});

test('composeReviewMessage: 自定义英文 labels 使用 {name} 占位替换', () => {
  const labels = {
    'message.header': 'Review comments for "{fileName}" ({filePath}):',
    'message.headerNoPath': 'Review comments for "{fileName}":',
    'message.line': 'line {line}',
    'message.section': 'section "{section}"',
    'message.quoteLabel': 'Quote:',
    'message.commentLabel': 'Comment: {body}',
    'message.noteLabel': 'Notes: {note}',
    'message.footer': 'Apply only the changes above.',
  };
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/abs/PRD.md',
    note: 'Please keep the structure.',
    comments: [comment({ quote: '用户类型 | 典型场景', body: 'Please add a students row.' })],
    labels,
  });
  const expected = [
    'Review comments for "PRD.md" (/abs/PRD.md):',
    '',
    '1. line 12 · section "二、目标用户与场景"',
    '   Quote:',
    '   > 用户类型 | 典型场景',
    '   Comment: Please add a students row.',
    '',
    'Notes: Please keep the structure.',
    '',
    'Apply only the changes above.',
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: 支持 i18n.messageLabels(t) 的扁平 key 形状（header/path/original/instruction）', () => {
  // 与 src/client/i18n.js 的 messageLabels(t) 输出保持一致。
  const labels = {
    header: '以下是我对文档《{fileName}》的修改意见，请逐条处理：',
    path: '文件路径：{filePath}',
    line: '第 {line} 行',
    section: '章节「{section}」',
    original: '原文：',
    instruction: '修改意见：{body}',
    note: '整体说明：{note}',
    footer: FOOTER,
  };
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/abs/PRD.md',
    note: '整体来看结构清晰。',
    comments: [comment()],
    labels,
  });
  const expected = [
    '以下是我对文档《PRD.md》的修改意见，请逐条处理：',
    '文件路径：/abs/PRD.md',
    '',
    '1. 第 12 行 · 章节「二、目标用户与场景」',
    '   原文：',
    '   > 用户类型 | 典型场景 | 核心诉求',
    '   修改意见：这里的表格缺少"学生"一行，请补充。',
    '',
    '整体说明：整体来看结构清晰。',
    '',
    FOOTER,
  ].join('\n');
  assert.equal(message, expected);
});

test('composeReviewMessage: 扁平 key labels 且无 filePath 时不输出路径行', () => {
  const labels = {
    header: '以下是我对文档《{fileName}》的修改意见：',
    path: '文件路径：{filePath}',
    footer: FOOTER,
  };
  const message = composeReviewMessage({ fileName: 'PRD.md', comments: [], labels });
  assert.ok(message.startsWith('以下是我对文档《PRD.md》的修改意见：\n\n'));
  assert.ok(!message.includes('文件路径'));
});

test('composeReviewMessage: labels 也可以是 t(key) 函数', () => {
  const dictionary = {
    'message.header': '文档《{fileName}》（{filePath}）的意见：',
  };
  const t = (key) => dictionary[key];
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    comments: [comment()],
    labels: t,
  });
  assert.ok(message.startsWith('文档《PRD.md》（/w/PRD.md）的意见：'));
  assert.ok(message.endsWith(FOOTER));
});

test('composeReviewMessage: 自定义模板缺少 {body}/{note} 占位时追加而不是丢内容', () => {
  const labels = {
    'message.commentLabel': 'Comment: ',
    'message.noteLabel': 'Notes: ',
  };
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    note: '整体说明内容',
    comments: [comment({ body: '意见正文' })],
    labels,
  });
  assert.ok(message.includes('   Comment: 意见正文'));
  assert.ok(message.includes('Notes: 整体说明内容'));
});

test('composeReviewMessage: 无 filePath 时省略路径（默认 headerNoPath）', () => {
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    comments: [],
  });
  assert.ok(message.startsWith('以下是我对文档《PRD.md》的修改意见，请逐条处理：'));
});

test('composeReviewMessage: 自定义 labels 缺 headerNoPath 时剥掉路径占位与括号', () => {
  const labels = { 'message.header': 'Review "{fileName}" ({filePath}):' };
  const message = composeReviewMessage({ fileName: 'PRD.md', comments: [], labels });
  assert.ok(message.startsWith('Review "PRD.md":'));
});

test('composeReviewMessage: 按 createdAt 升序编号（防御性排序，不改入参数组）', () => {
  const newer = comment({ id: 'newer', quote: '较晚引文', body: '较晚意见', createdAt: 200 });
  const older = comment({ id: 'older', quote: '较早引文', body: '较早意见', createdAt: 100 });
  const input = [newer, older];
  const message = composeReviewMessage({
    fileName: 'PRD.md',
    filePath: '/w/PRD.md',
    comments: input,
  });
  const olderIndex = message.indexOf('较早意见');
  const newerIndex = message.indexOf('较晚意见');
  assert.ok(olderIndex > -1 && newerIndex > -1);
  assert.ok(olderIndex < newerIndex);
  assert.ok(message.includes('1. 第 12 行'));
  // 入参数组顺序不被修改（message.js 排序的是副本）。
  assert.deepEqual(input.map((item) => item.id), ['newer', 'older']);
});

test('composeReviewMessage: 消息不以换行结尾，且空输入安全', () => {
  const message = composeReviewMessage({ fileName: 'PRD.md', filePath: '/w/PRD.md', comments: [] });
  assert.ok(!message.endsWith('\n'));
  assert.ok(message.endsWith(FOOTER));
  assert.doesNotThrow(() => composeReviewMessage());
  assert.ok(composeReviewMessage().endsWith(FOOTER));
});
