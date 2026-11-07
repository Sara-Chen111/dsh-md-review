/**
 * Node-side tests for src/client/core/dom.js (SPEC §5).
 *
 * The real module only runs in a browser, but its geometry/text-offset logic
 * is plain DOM traversal. These tests drive it with a tiny hand-built fake DOM
 * (no jsdom) to cover documentText / rangeFromOffsets / highlight no-ops /
 * rangeRect / scrollToRange / readSelection.
 * Run with: `node --test test/`
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  documentText,
  rangeFromOffsets,
  readSelection,
  setHighlight,
  clearHighlight,
  rangeRect,
  scrollToRange,
} from '../src/client/core/dom.js';

// ---------------------------------------------------------------------------
// Minimal fake DOM
// ---------------------------------------------------------------------------

function textNode(value) {
  return { nodeType: 3, nodeValue: value, childNodes: [], parentElement: null };
}

function isDescendant(root, target) {
  if (root === target) return true;
  const children = root.childNodes || [];
  for (const child of children) {
    if (isDescendant(child, target)) return true;
  }
  return false;
}

function element(tagName, childNodes = []) {
  const node = {
    nodeType: 1,
    tagName,
    nodeValue: null,
    childNodes,
    textContent: '',
    contains(target) {
      return isDescendant(node, target);
    },
  };
  for (const child of childNodes) child.parentElement = node;
  node.textContent = childNodes
    .map((child) => (child.nodeType === 3 ? child.nodeValue : child.textContent))
    .join('');
  return node;
}

/** Set a global for the duration of one test and restore it afterwards. */
function setGlobal(t, name, value) {
  const had = Object.prototype.hasOwnProperty.call(globalThis, name);
  const previous = globalThis[name];
  globalThis[name] = value;
  t.after(() => {
    if (had) globalThis[name] = previous;
    else delete globalThis[name];
  });
}

/** Fake `document` whose createRange returns a settable range-like object. */
function installFakeDocument(t) {
  setGlobal(t, 'document', {
    createRange() {
      const range = {
        startContainer: null,
        startOffset: 0,
        endContainer: null,
        endOffset: 0,
        setStart(node, offset) {
          range.startContainer = node;
          range.startOffset = offset;
        },
        setEnd(node, offset) {
          range.endContainer = node;
          range.endOffset = offset;
        },
      };
      return range;
    },
  });
}

function fakeSelectionRange({
  startContainer,
  startOffset,
  endContainer,
  endOffset,
  commonAncestorContainer = null,
  rects = [],
  bounds = null,
}) {
  return {
    startContainer,
    startOffset,
    endContainer,
    endOffset,
    commonAncestorContainer: commonAncestorContainer || startContainer,
    getClientRects() {
      return rects;
    },
    getBoundingClientRect() {
      return bounds;
    },
  };
}

/** Fake window whose selection is fixed to one range. */
function installSelection(t, range, { collapsed = false } = {}) {
  setGlobal(t, 'window', {
    getSelection() {
      return {
        rangeCount: 1,
        isCollapsed: collapsed,
        getRangeAt() {
          return range;
        },
      };
    },
  });
}

// ---------------------------------------------------------------------------
// documentText / rangeFromOffsets
// ---------------------------------------------------------------------------

test('documentText: 按文档顺序拼接嵌套文本节点', () => {
  const container = element('div', [
    textNode('一、'),
    element('p', [textNode('中文'), element('strong', [textNode('加粗')])]),
    textNode('结尾'),
  ]);
  assert.equal(documentText(container), '一、中文加粗结尾');
  assert.equal(documentText(null), '');
  assert.equal(documentText(textNode('直接传文本节点')), '直接传文本节点');
});

test('rangeFromOffsets: 偏移映射到正确的文本节点与 offset', (t) => {
  installFakeDocument(t);
  const container = element('div', [
    textNode('一、'),
    element('p', [textNode('中文'), element('strong', [textNode('加粗')])]),
    textNode('结尾'),
  ]);
  // 文本顺序: 一、(0-2) 中文(2-4) 加粗(4-6) 结尾(6-8)
  const whole = rangeFromOffsets(container, 2, 6);
  assert.ok(whole);
  assert.equal(whole.startContainer.nodeValue, '一、');
  assert.equal(whole.startOffset, 2);
  assert.equal(whole.endContainer.nodeValue, '加粗');
  assert.equal(whole.endOffset, 2);

  const middle = rangeFromOffsets(container, 3, 4);
  assert.equal(middle.startContainer.nodeValue, '中文');
  assert.equal(middle.startOffset, 1);
  assert.equal(middle.endContainer.nodeValue, '中文');
  assert.equal(middle.endOffset, 2);

  const atEnd = rangeFromOffsets(container, 8, 8);
  assert.equal(atEnd.startContainer.nodeValue, '结尾');
  assert.equal(atEnd.startOffset, 2);
  assert.equal(atEnd.endContainer.nodeValue, '结尾');
});

test('rangeFromOffsets: 越界/反序/非整数/空容器行为', (t) => {
  installFakeDocument(t);
  const container = element('div', [textNode('abc')]);
  assert.equal(rangeFromOffsets(container, 0, 4), null);
  assert.equal(rangeFromOffsets(container, -1, 2), null);
  assert.equal(rangeFromOffsets(container, 2, 1), null);
  assert.equal(rangeFromOffsets(container, 0.5, 2), null);
  assert.equal(rangeFromOffsets(null, 0, 1), null);

  const empty = element('div', []);
  const collapsed = rangeFromOffsets(empty, 0, 0);
  assert.ok(collapsed);
  assert.equal(collapsed.startContainer, empty);
  assert.equal(collapsed.startOffset, 0);
  assert.equal(rangeFromOffsets(empty, 0, 1), null);
});

// ---------------------------------------------------------------------------
// readSelection
// ---------------------------------------------------------------------------

function buildSelectionDocument() {
  const heading = element('h2', [textNode('二、目标用户')]);
  heading.compareDocumentPosition = () => 4; // DOCUMENT_POSITION_FOLLOWING
  const paragraph = element('p', [textNode('正文  目标  结尾')]);
  const container = element('div', [heading, paragraph]);
  container.querySelectorAll = () => [heading];
  return { heading, paragraph, container, text: paragraph.childNodes[0] };
}

test('readSelection: 返回 trim 后的偏移、上下文、章节与首段 rect', (t) => {
  const { container, text } = buildSelectionDocument();
  const rect = { left: 10, top: 20, right: 60, bottom: 40, width: 50, height: 20 };
  installSelection(t, fakeSelectionRange({
    startContainer: text,
    startOffset: 2, // '  目标  结尾' 的前导空格
    endContainer: text,
    endOffset: 8, // 目标 + 尾随空格
    commonAncestorContainer: text,
    rects: [rect],
  }));

  const selection = readSelection(container);
  assert.ok(selection);
  assert.equal(selection.quote, '目标');
  assert.equal(selection.start, 10);
  assert.equal(selection.end, 12);
  assert.equal(selection.prefix, '二、目标用户正文  ');
  assert.equal(selection.suffix, '  结尾');
  assert.equal(selection.section, '二、目标用户');
  assert.deepEqual(selection.rect, { left: 10, top: 20, right: 60, bottom: 40, width: 50, height: 20 });
});

test('readSelection: 空白选区 / collapsed / 反向 / 跨出 container 返回 null', (t) => {
  const { container, text } = buildSelectionDocument();
  const outside = textNode('外部文本');

  // 空白选区（只有空格）
  installSelection(t, fakeSelectionRange({
    startContainer: text,
    startOffset: 2,
    endContainer: text,
    endOffset: 4,
  }));
  assert.equal(readSelection(container), null);

  // collapsed
  installSelection(t, fakeSelectionRange({
    startContainer: text,
    startOffset: 2,
    endContainer: text,
    endOffset: 2,
  }), { collapsed: true });
  assert.equal(readSelection(container), null);

  // 反向选区（start > end）
  installSelection(t, fakeSelectionRange({
    startContainer: text,
    startOffset: 8,
    endContainer: text,
    endOffset: 2,
  }));
  assert.equal(readSelection(container), null);

  // 选区跨出 container
  installSelection(t, fakeSelectionRange({
    startContainer: outside,
    startOffset: 0,
    endContainer: text,
    endOffset: 2,
    commonAncestorContainer: outside,
  }));
  assert.equal(readSelection(container), null);

  // 没有 window / 没有 container
  assert.equal(readSelection(null), null);
});

test('readSelection: quote 超过 400 字符时按数据模型截断', (t) => {
  const longText = '中'.repeat(450);
  const node = textNode(longText);
  const container = element('div', [node]);
  installSelection(t, fakeSelectionRange({
    startContainer: node,
    startOffset: 0,
    endContainer: node,
    endOffset: 450,
    rects: [{ left: 0, top: 0, right: 10, bottom: 10, width: 10, height: 10 }],
  }));
  const selection = readSelection(container);
  assert.ok(selection);
  assert.equal(selection.quote.length, 400);
  assert.equal(selection.start, 0);
  assert.equal(selection.end, 400);
});

// ---------------------------------------------------------------------------
// CSS Custom Highlight API
// ---------------------------------------------------------------------------

test('setHighlight/clearHighlight: 支持时注册高亮，支持 {start,end} 与 Range', (t) => {
  installFakeDocument(t);
  const highlights = new Map();
  setGlobal(t, 'CSS', { highlights });
  setGlobal(t, 'Highlight', class Highlight {
    constructor(...ranges) {
      this.ranges = ranges;
    }
  });
  const container = element('div', [textNode('高亮文本')]);

  setHighlight('md-review', container, [{ start: 2, end: 4 }]);
  const entry = highlights.get('md-review');
  assert.ok(entry);
  assert.equal(entry.ranges.length, 1);
  assert.equal(entry.ranges[0].startContainer.nodeValue, '高亮文本');
  assert.equal(entry.ranges[0].startOffset, 2);
  assert.equal(entry.ranges[0].endOffset, 4);

  const domRange = fakeSelectionRange({ startContainer: container, startOffset: 0, endContainer: container, endOffset: 1 });
  domRange.setStart = () => {}; // 让 setHighlight 将其识别为 DOM Range
  setHighlight('md-review-active', container, [domRange]);
  assert.equal(highlights.get('md-review-active').ranges[0], domRange);

  clearHighlight('md-review');
  assert.equal(highlights.has('md-review'), false);
  // 清理不存在的名字不抛错
  assert.doesNotThrow(() => clearHighlight('md-review-draft'));
  assert.doesNotThrow(() => setHighlight('md-review', container, []));
});

test('setHighlight/clearHighlight: API 不可用时静默 no-op', () => {
  const container = element('div', [textNode('文本')]);
  assert.doesNotThrow(() => setHighlight('md-review', container, [{ start: 0, end: 1 }]));
  assert.doesNotThrow(() => clearHighlight('md-review'));
});

// ---------------------------------------------------------------------------
// rangeRect / scrollToRange
// ---------------------------------------------------------------------------

test('rangeRect: 多段包围盒取并集，无可见几何返回 null', () => {
  const multiLine = {
    getClientRects() {
      return [
        { left: 10, top: 20, right: 100, bottom: 40, width: 90, height: 20 },
        { left: 10, top: 40, right: 60, bottom: 60, width: 50, height: 20 },
      ];
    },
    getBoundingClientRect: () => null,
  };
  const rect = rangeRect(multiLine);
  assert.ok(rect);
  assert.equal(rect.left, 10);
  assert.equal(rect.top, 20);
  assert.equal(rect.right, 100);
  assert.equal(rect.bottom, 60);
  assert.equal(rect.width, 90);
  assert.equal(rect.height, 40);

  assert.equal(rangeRect(null), null);
  assert.equal(
    rangeRect({ getClientRects: () => [{ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }] }),
    null,
  );
});

function scrollContainer({ viewHeight = 300, scrollHeight = 1000, scrollTop = 500, top = 100 } = {}) {
  return {
    clientHeight: viewHeight,
    scrollHeight,
    scrollTop,
    scrollCalls: [],
    getBoundingClientRect() {
      return { left: 0, top, right: 500, bottom: top + viewHeight, width: 500, height: viewHeight };
    },
    scrollTo(options) {
      this.scrollCalls.push(options);
      this.scrollTop = options.top;
    },
  };
}

function rectRange(rect) {
  return {
    getClientRects: () => [rect],
    getBoundingClientRect: () => rect,
  };
}

test('scrollToRange: 已可见时不动，不可见时居中滚动并夹紧', () => {
  const container = scrollContainer();
  scrollToRange(container, rectRange({ left: 0, top: 150, right: 10, bottom: 170, width: 10, height: 20 }));
  assert.equal(container.scrollCalls.length, 0);

  const target = rectRange({ left: 0, top: 900, right: 10, bottom: 920, width: 10, height: 20 });
  scrollToRange(container, target);
  assert.equal(container.scrollCalls.length, 1);
  // 500 + (900-100) - (300-20)/2 = 1160 -> clamp 到 maxScroll 700
  assert.deepEqual(container.scrollCalls[0], { top: 700, behavior: 'smooth' });
});

test('scrollToRange: container 不可滚动时回退到元素 scrollIntoView', () => {
  const paragraph = element('p', [textNode('目标文本')]);
  const node = paragraph.childNodes[0];
  const calls = [];
  paragraph.scrollIntoView = (options) => calls.push(options);
  scrollToRange(
    { clientHeight: 300, scrollHeight: 300, scrollTop: 0 },
    { startContainer: node, getClientRects: () => [], getBoundingClientRect: () => ({ left: 0, top: 80, right: 10, bottom: 100, width: 10, height: 20 }) },
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].block, 'center');
});
