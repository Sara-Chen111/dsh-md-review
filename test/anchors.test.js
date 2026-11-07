/**
 * Unit tests for src/client/core/anchors.js (SPEC §4).
 * Run with: `node --test test/`
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { contextOf, locateAnchor, locateAll, lineOfQuote } from '../src/client/core/anchors.js';

const QUOTE_RADIUS = 24;

test('contextOf: 中文文本，quote/prefix/suffix 按 trim 后边界截取', () => {
  const text = '一、背景\n本产品面向学生和教师。\n二、目标用户';
  const start = text.indexOf('学生');
  const anchor = contextOf(text, start, start + 2);
  assert.equal(anchor.quote, '学生');
  assert.equal(anchor.prefix, text.slice(Math.max(0, start - QUOTE_RADIUS), start));
  assert.equal(anchor.suffix, text.slice(start + 2, start + 2 + QUOTE_RADIUS));
  assert.ok(anchor.prefix.endsWith('本产品面向'));
  assert.ok(anchor.suffix.startsWith('和教师'));
});

test('contextOf: 选区两端空白被 trim，prefix/suffix 从 trim 后边界计算', () => {
  const text = 'xx   目标   yy';
  const quoteStart = text.indexOf('目标');
  const start = quoteStart - 2; // 选中前导空格
  const end = quoteStart + 2 + 2; // 选中尾随空格
  const anchor = contextOf(text, start, end);
  assert.equal(anchor.quote, '目标');
  assert.equal(anchor.prefix, 'xx   ');
  assert.equal(anchor.suffix, '   yy');
});

test('contextOf: 全角空格与换行也视为空白', () => {
  const text = '\u3000\u3000目标\n\n';
  const anchor = contextOf(text, 0, text.length);
  assert.equal(anchor.quote, '目标');
  // prefix/suffix 是 trim 后边界外侧的原始上下文（包含空白）。
  assert.equal(anchor.prefix, '\u3000\u3000');
  assert.equal(anchor.suffix, '\n\n');
});

test('contextOf: 越界偏移被 clamp，反序偏移被纠正，空文本安全', () => {
  assert.deepEqual(contextOf('abc', -5, 99), { quote: 'abc', prefix: '', suffix: '' });
  assert.equal(contextOf('abc', 2, 1).quote, 'b');
  assert.deepEqual(contextOf('', 0, 0), { quote: '', prefix: '', suffix: '' });
  assert.deepEqual(contextOf(null, 0, 1), { quote: '', prefix: '', suffix: '' });
});

test('contextOf: radius 可配置（0 与 2）', () => {
  const text = '0123456789';
  assert.deepEqual(contextOf(text, 4, 6, 2), { quote: '45', prefix: '23', suffix: '67' });
  assert.deepEqual(contextOf(text, 4, 6, 0), { quote: '45', prefix: '', suffix: '' });
  assert.equal(contextOf(text, 4, 6).prefix, text.slice(0, 4));
});

test('locateAnchor: 唯一引文，exact 与 score 正确', () => {
  const text = '用户类型 | 典型场景 | 核心诉求';
  const start = text.indexOf('典型场景');
  const comment = { id: 'c1', ...contextOf(text, start, start + 4) };
  const hit = locateAnchor(text, comment);
  assert.ok(hit);
  assert.equal(hit.start, start);
  assert.equal(hit.end, start + 4);
  assert.equal(hit.exact, true);
  // prefix='用户类型 | '(7) + suffix=' | 核心诉求'(7)
  assert.equal(hit.score, 14);
});

test('locateAnchor: 重复引文按前后文消歧（中文）', () => {
  const text = '目标用户是学生。教师也是学生。学生需要更多示例。';
  const first = text.indexOf('学生');
  const second = text.indexOf('学生', first + 1);
  assert.equal(first, 5);
  assert.equal(second, 12);
  const comment = { id: 'c2', ...contextOf(text, second, second + 2) };
  const hit = locateAnchor(text, comment);
  assert.ok(hit);
  assert.equal(hit.start, second);
  assert.equal(hit.end, second + 2);
  assert.equal(hit.exact, true);
});

test('locateAnchor: 上下文部分匹配时仍取分数最高的候选（exact=false）', () => {
  const text = 'ABCD目标EFGH';
  const hit = locateAnchor(text, { quote: '目标', prefix: 'XXBCD', suffix: 'EFGZ' });
  assert.ok(hit);
  assert.equal(hit.start, 4);
  assert.equal(hit.end, 6);
  assert.equal(hit.exact, false);
  // prefix 'BCD' 连续 3 + suffix 'EFG' 连续 3
  assert.equal(hit.score, 6);
});

test('locateAnchor: 并列分数取最靠前的候选', () => {
  const text = '嗯学生嗯学生';
  const hit = locateAnchor(text, { quote: '学生', prefix: '', suffix: '' });
  assert.ok(hit);
  assert.equal(hit.start, 1);
  assert.equal(hit.exact, true);
  assert.equal(hit.score, 0);
});

test('locateAnchor: 找不到 quote / 空 quote / 空 comment 返回 null', () => {
  assert.equal(locateAnchor('abc', { quote: 'xyz' }), null);
  assert.equal(locateAnchor('abc', { quote: '' }), null);
  assert.equal(locateAnchor('abc', {}), null);
  assert.equal(locateAnchor('abc', null), null);
  assert.equal(locateAnchor('', { quote: 'a' }), null);
});

test('locateAll: 文档插入一段文字后仍能找回原引文（自检：文件被改后重定位）', () => {
  const original = [
    '# 产品需求',
    '',
    '## 一、背景',
    '',
    '本产品面向学生和教师。',
    '',
    '## 二、目标用户',
    '',
    '学生需要更多示例。',
  ].join('\n');
  const firstQuote = '本产品面向学生和教师。';
  const secondQuote = '学生需要更多示例。';
  const comments = [
    {
      id: 'a',
      ...contextOf(original, original.indexOf(firstQuote), original.indexOf(firstQuote) + firstQuote.length),
    },
    {
      id: 'b',
      ...contextOf(original, original.indexOf(secondQuote), original.indexOf(secondQuote) + secondQuote.length),
    },
  ];

  // 原文档中的位置可被精确找回。
  const initial = locateAll(original, comments);
  assert.equal(original.slice(initial.get('a').start, initial.get('a').end), firstQuote);
  assert.equal(original.slice(initial.get('b').start, initial.get('b').end), secondQuote);

  // 文件被 agent 修改：开头插入一整段、标题改名、第一条引文后追加句子。
  const edited = [
    '## 补充说明',
    '',
    '新增的一段介绍文字。',
    '',
    original.replace('## 一、背景', '## 一、背景与动机').replace(firstQuote, `${firstQuote}团队正在扩充。`),
  ].join('\n');

  const relocated = locateAll(edited, comments);
  const a = relocated.get('a');
  const b = relocated.get('b');
  assert.ok(a, '插入文字后 a 仍应定位成功');
  assert.ok(b, '插入文字后 b 仍应定位成功');
  assert.equal(edited.slice(a.start, a.end), firstQuote);
  assert.equal(edited.slice(b.start, b.end), secondQuote);
  assert.equal(a.start, edited.indexOf(firstQuote));
  assert.equal(b.start, edited.indexOf(secondQuote));
  // 引文自身未被修改，但前后文变了 => 仍能命中，只是 exact 可能为 false。
  assert.equal(locateAnchor(edited, comments[0]).exact, false);
});

test('locateAll: 返回 Map，找不到的 comment 为 null，缺失 id 跳过', () => {
  const text = '现有文档内容';
  const map = locateAll(text, [
    { id: 'hit', quote: '文档', prefix: '', suffix: '' },
    { id: 'miss', quote: '不存在', prefix: '', suffix: '' },
    { quote: '没有 id', prefix: '', suffix: '' },
  ]);
  assert.ok(map instanceof Map);
  assert.equal(map.size, 2);
  assert.deepEqual(map.get('hit'), { start: 2, end: 4 });
  assert.equal(map.get('miss'), null);
  assert.equal(map.has('missing'), false);
  assert.deepEqual(locateAll(text, undefined), new Map());
  assert.deepEqual(locateAll(text, [{ id: 'x' }]), new Map([['x', null]]));
});

test('lineOfQuote: 直接命中时返回 1-based 源码行号（中文）', () => {
  const source = '# 标题\n\n用户类型 | 典型场景 | 核心诉求\n\n正文';
  assert.equal(lineOfQuote(source, '典型场景'), 3);
  assert.equal(lineOfQuote(source, '正文'), 5);
  assert.equal(lineOfQuote(source, '标题'), 1);
});

test('lineOfQuote: 多行 quote 直接命中', () => {
  const source = '# 标题\n\n用户类型 | 典型场景 | 核心诉求\n\n正文';
  assert.equal(lineOfQuote(source, '用户类型 | 典型场景 | 核心诉求\n\n正文'), 3);
});

test('lineOfQuote: 空白折叠后命中（空格/换行差异）', () => {
  // 渲染文本中换行被折叠成空格
  const source = '第一段\n\n用户类型 | 典型场景';
  assert.equal(lineOfQuote(source, '第一段 用户类型'), 1);
  // 源码中连续空白 vs 渲染文本单个空格
  assert.equal(lineOfQuote('用户类型   |   典型场景', '用户类型 | 典型场景'), 1);
  // CRLF 源码
  assert.equal(lineOfQuote('a\r\n二、目标\r\n正文', '二、目标'), 2);
});

test('lineOfQuote: 前 24 字符前缀回退命中', () => {
  const base24 = '这是一段用于测试前缀回退的中文文本内容甲乙丙丁戊';
  assert.equal(Array.from(base24).length, 24);
  const source = `第一行\n${base24}尾巴`;
  const quote = `${base24}不同的结尾`;
  assert.equal(source.indexOf(quote), -1);
  assert.equal(lineOfQuote(source, quote), 2);
});

test('lineOfQuote: 跨段落选区的合并文本能定位到首段行号', () => {
  const source = '# 标题\n\n第一段内容。\n\n第二段内容。\n\n结尾';
  // 渲染文本把两个段落拼成一段，中间没有换行
  assert.equal(lineOfQuote(source, '第一段内容。第二段内容。'), 3);
  // 跨列表项（列表标记在渲染文本里不出现）
  const list = '## 功能\n\n- 首屏仅保留一个输入框\n- 支持文字、语音、图片三种输入';
  assert.equal(lineOfQuote(list, '首屏仅保留一个输入框支持文字、语音、图片三种输入'), 3);
});

test('lineOfQuote: 整行表格选区（渲染文本去掉竖线）能定位到表格行', () => {
  const source = '## 用户\n\n| 用户类型 | 典型场景 | 核心诉求 |\n| --- | --- | --- |\n| 学生 | 课堂笔记、复习 | 自动摘要、标签 |\n';
  assert.equal(lineOfQuote(source, '学生课堂笔记、复习自动摘要、标签'), 5);
  // 单元格内文本仍然走精确匹配
  assert.equal(lineOfQuote(source, '自动摘要、标签'), 5);
});

test('lineOfQuote: 带强调/行内代码/链接的段落能通过 compact 回退定位', () => {
  const source = '一段 **加粗** 与 `代码` 以及 [链接文字](https://example.com/x) 的正文。';
  assert.equal(lineOfQuote(source, '一段 加粗 与 代码 以及 链接文字 的正文。'), 1);
});

test('lineOfQuote: 找不到 / 空输入返回 null，quote 先 trim', () => {
  assert.equal(lineOfQuote('abc', 'zzz'), null);
  assert.equal(lineOfQuote('', 'abc'), null);
  assert.equal(lineOfQuote('abc', ''), null);
  assert.equal(lineOfQuote('abc', '   '), null);
  assert.equal(lineOfQuote('a\n目标\nb', '  目标  '), 2);
});

test('纯函数：入参对象不被修改', () => {
  const comment = Object.freeze({ id: 'c', quote: '目标', prefix: '前', suffix: '后' });
  const before = JSON.stringify(comment);
  locateAnchor('前目标后', comment);
  locateAll('前目标后', [comment]);
  assert.equal(JSON.stringify(comment), before);
});
