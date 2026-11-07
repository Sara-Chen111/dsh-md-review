# 验证记录

日期：2026-11-07 · 环境：macOS，DeepSeek Harness Desktop（Web GUI），插件以本地 bundle 安装
驱动方式：Playwright 打开真实 GUI 页面，在右侧栏文档预览里执行完整用户流程
界面语言：验证时 GUI locale 为英文（插件字典按 locale 自动切换，中文环境显示中文文案）

## 1. 单元测试

```bash
node --test test/
```

结果：**52 passed / 0 failed**。

| 文件 | 覆盖 |
| --- | --- |
| `test/anchors.test.js` | 锚点创建与上下文截取、单一/重复引文重定位、批量重定位、源码行号（精确 / 空白折叠 / 跨段落 / 列表 / 整行表格 / 强调与链接的 compact 回退 / 前缀兜底） |
| `test/dom.test.js` | 选区读取（空白/反向/跨容器）、偏移↔Range、CSS Custom Highlight 降级、包围盒、滚动定位 |
| `test/message.test.js` | 合并消息格式（行号/章节/引用/整体说明/结尾请求句）、多行引文、空 note、多语言 labels、编号顺序 |
| `test/i18n.test.js` | zh/en 键集合一致、源码里出现的 `t('…')` 键都存在、`{name}` 插值与消息 labels 完整性 |

## 2. 端到端（真实 GUI）

测试文档包含 frontmatter、标题、表格和段落，且被 Agent 修改过，可覆盖重新定位场景。

| # | 操作 | 期望 | 结果 |
| --- | --- | --- | --- |
| 1 | 在正文选中一段文字 | 浮出「+ Comment」胶囊，位于选区上方 | ✅ |
| 2 | 选中跨两个列表项的一段文字（渲染文本里没有列表标记） | 保存后卡片仍有源码行号 | ✅ |
| 3 | 点击浮动按钮 | 弹层出现，含引文摘要、输入框、保存/取消 | ✅ |
| 4 | 填写意见按 `⌘Enter` | 弹层关闭，出现琥珀高亮 + 行尾编号 + 右侧卡片 | ✅ |
| 5 | 文件被 Agent 修改（在 frontmatter 后插入 3 行） | 卡片行号从 15/26 自动刷新为 18/29，恢复文件后回到 15/26 | ✅ |
| 6 | 点卡片 | 滚动定位到原文并短暂闪烁 | ✅ |
| 7 | 卡片「编辑」→ 改文案 → `⌘Enter` | 卡片与 localStorage 同步更新 | ✅ |
| 8 | 卡片「删除」→ 再点一次 | 二次确认后移除，编号重排 | ✅ |
| 9 | 刷新页面 | 批注、高亮、编号、卡片、整体说明全部恢复 | ✅ |
| 10 | 填写整体说明 → 「仅填入对话」 | 会话输入框出现合并消息 | ✅ |
| 11 | 「发送到对话」 | 消息进入当前会话；卡片标记「Sent」；出现「Clear sent」 | ✅ |
| 12 | 刷新页面 | 已发送状态持久 | ✅ |
| 13 | 「Clear sent」 | 已发送批注清空，回到空状态 | ✅ |
| 14 | 「Open with」→ Markdown / Plain text | 回退到内置查看器，文档正常渲染 | ✅ |
| 15 | 切回「Review view」 | 批注视图恢复，已发送卡片仍在 | ✅ |
| 16 | 折叠/展开批注栏 | 折叠为「Comments」胶囊，展开后列表恢复 | ✅ |

合并消息实测（2 条批注 + 整体说明；中文 locale 输出中文标签）：

```markdown
I have review comments on the document “PRD.md”. Please address them one by one:

    File path: /path/to/PRD.md

1. line 15 · section “一、背景与目标”

   Original text:

   > 冷启动的记录门槛

   Change requested: 这里的表述太笼统，请补充一个具体的数据指标。

2. line 26 · section “二、目标用户与场景”

   Original text:

   > 自动摘要、标签

   Change requested: 建议把这一列拆成两列，并说明是否支持手动编辑。

General note: 请按以上意见修改，保持原有结构与格式不变。

Only change the places listed above and keep the rest of the content and formatting intact. After finishing, summarize how each item was handled.
```

行号是**源文件行号**（含 frontmatter），章节取选区前最近的 h1–h6。

## 3. 验证阶段发现并修复的问题

| 严重度 | 问题 | 修复 |
| --- | --- | --- |
| blocker | 浮动「添加批注」按钮可见但点不到（点击被正文段落吞掉） | 外壳 `pointer-events: none` 时按钮自身恢复 `pointer-events: auto` |
| major | 文件被修改后，持久化的行号/章节不刷新，消息仍用旧行号 | 重定位时按引文重算 `lineOfQuote` 与 `sectionAtOffset`，一次性更新 store |
| major | 发送成功靠「草稿清空」推断且固定超时，可能误标已发送/误报失败 | 跟踪输入框提交状态机：提交中 = 已受理，回到可编辑且草稿清空 = 成功、草稿保留 = 失败 |
| major | 跨段落 / 整行表格选区在源码里不是连续文本，行号为 null | 行号匹配增加 compact 回退（去空白与 Markdown 标记、跳过链接目标与列表标记，并映射回源码偏移） |
| major | 窄侧栏抽屉模式保存后盖住文档、定位不关抽屉 | 仅并排模式自动展开；定位前关闭抽屉 |
| minor | 批注卡片行号被截断；`inputActions` 缺失时按钮静默无效；Safari 无 `caretPositionFromPoint`；pin 点击冒泡；`clearSent` 悬空 activeId；引文换行依赖预览偏好 | 已逐项修复 |

## 4. 截图

| 文件 | 内容 |
| --- | --- |
| `docs/preview-overview.png` | 两条批注 + 高亮/编号 + 右侧批注栏 + 底部统一发送框 |
| `docs/selection-toolbar.png` | 选中文字后的浮动「+ Comment」与草稿高亮 |
| `docs/editor-popover.png` | 批注编辑弹层 |
| `docs/sent-state.png` | 发送后的「Sent」状态与「Clear sent」 |
| `docs/viewer-menu.png` | 查看器下拉：Review view / Markdown / Code / Plain text |

## 5. 未覆盖 / 已知边界

- 窄侧栏（< 560px）的抽屉形态逻辑已实现，自动化未覆盖，建议手动把右侧栏拖窄验证。
- 文件被 Agent 改动导致引文消失时显示「原文已修改」的逻辑由单元测试覆盖，未在真实 GUI 构造该场景。
- 批注按「文件 + 会话」持久化（resource address 含会话 id），跨会话同文件不共享。
- 代码块复制按钮banner 文案目前计入渲染文本偏移，极端情况下（复制后立刻批注代码块内文字）可能定位偏移，
  暂列为已知边界。
