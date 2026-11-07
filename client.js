window.__ModuleLoader__.load({
  id: "dsh-md-review",
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // src/client/index.js
    var index_exports = {};
    __export(index_exports, {
      IMPLEMENTATION_ID: () => IMPLEMENTATION_ID,
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(index_exports);

    // src/client/review-body.jsx
    var import_react4 = __toESM(require("react"), 1);
    var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

    // src/client/i18n.js
    var NS = "mdReview";
    var zh = {
      "viewer.label": "\u6279\u6CE8\u89C6\u56FE",
      "common.cancel": "\u53D6\u6D88",
      "common.save": "\u4FDD\u5B58",
      "common.delete": "\u5220\u9664",
      "common.edit": "\u7F16\u8F91",
      "common.close": "\u5173\u95ED",
      "common.more": "\u66F4\u591A",
      "panel.title": "\u6279\u6CE8",
      "panel.aria": "\u6279\u6CE8\u9762\u677F",
      "panel.expand": "\u5C55\u5F00\u6279\u6CE8\u680F",
      "panel.collapse": "\u6536\u8D77\u6279\u6CE8\u680F",
      "panel.emptyHint": "\u5728\u6587\u6863\u4E2D\u9009\u4E2D\u6587\u5B57\uFF0C\u5373\u53EF\u6DFB\u52A0\u6279\u6CE8",
      "panel.emptySubHint": "\u6279\u6CE8\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\uFF0C\u6700\u540E\u53EF\u7EDF\u4E00\u53D1\u9001\u7ED9 Agent",
      "panel.sent": "\u5DF2\u53D1\u9001",
      "panel.stale": "\u539F\u6587\u5DF2\u4FEE\u6539\uFF0C\u53EF\u80FD\u5B9A\u4F4D\u4E0D\u51C6",
      "panel.line": "\u7B2C {line} \u884C",
      "panel.section": "\u7AE0\u8282\u300C{section}\u300D",
      "panel.clearSent": "\u6E05\u9664\u5DF2\u53D1\u9001",
      "panel.openComments": "\u6279\u6CE8",
      "panel.closeDrawer": "\u5173\u95ED\u6279\u6CE8\u680F",
      "panel.pending": "{count} \u6761\u5F85\u53D1\u9001",
      "card.locate": "\u5B9A\u4F4D",
      "card.edit": "\u7F16\u8F91",
      "card.delete": "\u5220\u9664",
      "card.deleteConfirm": "\u518D\u6B21\u70B9\u51FB\u5220\u9664",
      "card.index": "\u7B2C {index} \u6761",
      "card.quoteAria": "\u5F15\u7528\u539F\u6587",
      "toolbar.add": "\u6DFB\u52A0\u6279\u6CE8",
      "toolbar.addAria": "\u4E3A\u9009\u4E2D\u7684\u6587\u5B57\u6DFB\u52A0\u6279\u6CE8",
      "editor.title": "\u6DFB\u52A0\u6279\u6CE8",
      "editor.quoteLabel": "\u5F15\u7528\u539F\u6587",
      "editor.placeholder": "\u5199\u4E0B\u4F60\u7684\u4FEE\u6539\u610F\u89C1\uFF0C\u4F8B\u5982\uFF1A\u8FD9\u91CC\u7684\u7ED3\u8BBA\u592A\u7B3C\u7EDF\uFF0C\u8865\u5145\u4E00\u4E2A\u6570\u636E\u652F\u6491\u3002",
      "editor.save": "\u4FDD\u5B58\u6279\u6CE8",
      "editor.saveHint": "\u2318Enter \u4FDD\u5B58 \xB7 Esc \u53D6\u6D88",
      "editor.empty": "\u8BF7\u5148\u5199\u4FEE\u6539\u610F\u89C1",
      "editor.cancel": "\u53D6\u6D88",
      "composer.title": "\u7EDF\u4E00\u53D1\u9001",
      "composer.placeholder": "\u5BF9\u6574\u4EFD\u6587\u6863\u7684\u8865\u5145\u8BF4\u660E\uFF08\u53EF\u9009\uFF09\uFF0C\u4F8B\u5982\uFF1A\u8BF7\u6309\u4EE5\u4E0A\u610F\u89C1\u4FEE\u6539\uFF0C\u4FDD\u6301\u539F\u6709\u7ED3\u6784\u3002",
      "composer.send": "\u53D1\u9001\u5230\u5BF9\u8BDD",
      "composer.sending": "\u53D1\u9001\u4E2D\u2026",
      "composer.sendCount": "\u53D1\u9001 {count} \u6761\u6279\u6CE8",
      "composer.hint": "\u5C06\u5408\u5E76\u4E3A\u4E00\u6761\u6D88\u606F\u53D1\u9001\u5230\u5F53\u524D\u4F1A\u8BDD",
      "composer.empty": "\u6682\u65E0\u53EF\u53D1\u9001\u7684\u6279\u6CE8",
      "composer.sentToast": "\u5DF2\u5C06 {count} \u6761\u6279\u6CE8\u53D1\u9001\u5230\u5BF9\u8BDD",
      "composer.failedToast": "\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      "composer.noteLabel": "\u6574\u4F53\u8BF4\u660E",
      "composer.insert": "\u4EC5\u586B\u5165\u5BF9\u8BDD",
      "composer.insertedToast": "\u5DF2\u586B\u5165\u5BF9\u8BDD\u8F93\u5165\u6846",
      "composer.openHint": "\u9009\u4E2D\u6587\u5B57\u5F00\u59CB\u6279\u6CE8",
      "aria.commentIndex": "\u7B2C {index} \u6761\u6279\u6CE8\uFF1A{excerpt}",
      "aria.reviewToggle": "\u6279\u6CE8\u680F\uFF0C{count} \u6761\u5F85\u53D1\u9001",
      "aria.addComment": "\u6DFB\u52A0\u6279\u6CE8",
      "aria.pin": "\u6279\u6CE8 {index}",
      "message.header": "\u4EE5\u4E0B\u662F\u6211\u5BF9\u6587\u6863\u300A{fileName}\u300B\u7684\u4FEE\u6539\u610F\u89C1\uFF0C\u8BF7\u9010\u6761\u5904\u7406\uFF1A",
      "message.path": "\u6587\u4EF6\u8DEF\u5F84\uFF1A{filePath}",
      "message.line": "\u7B2C {line} \u884C",
      "message.section": "\u7AE0\u8282\u300C{section}\u300D",
      "message.original": "\u539F\u6587\uFF1A",
      "message.instruction": "\u4FEE\u6539\u610F\u89C1\uFF1A{body}",
      "message.note": "\u6574\u4F53\u8BF4\u660E\uFF1A{note}",
      "message.footer": "\u8BF7\u53EA\u4FEE\u6539\u4E0A\u8FF0\u6307\u51FA\u7684\u4F4D\u7F6E\uFF0C\u4FDD\u6301\u5176\u4ED6\u5185\u5BB9\u4E0E\u683C\u5F0F\u4E0D\u53D8\uFF1B\u5B8C\u6210\u540E\u9010\u6761\u8BF4\u660E\u5904\u7406\u7ED3\u679C\u3002",
      "code.copy": "\u590D\u5236",
      "code.copied": "\u5DF2\u590D\u5236",
      "code.title": "\u4EE3\u7801\u5757",
      "code.wrap": "\u81EA\u52A8\u6362\u884C",
      "code.unwrap": "\u53D6\u6D88\u6362\u884C",
      "footnotes": "\u811A\u6CE8",
      "preview.viewerAria": "\u67E5\u770B\u5668",
      "preview.viewerTitle": "\u6279\u6CE8\u89C6\u56FE",
      "preview.docAria": "\u6587\u6863\u5185\u5BB9",
      "panel.empty": "\u5728\u6587\u6863\u4E2D\u9009\u4E2D\u6587\u5B57\uFF0C\u5373\u53EF\u6DFB\u52A0\u6279\u6CE8",
      "composer.chars": "{count} \u5B57",
      "composer.clearSent": "\u6E05\u9664\u5DF2\u53D1\u9001 ({count})",
      "editor.quote": "\u5F15\u7528\u539F\u6587",
      "editor.saving": "\u4FDD\u5B58\u4E2D\u2026",
      "card.sent": "\u5DF2\u53D1\u9001",
      "card.line": "\u7B2C {line} \u884C",
      "aria.expandPanel": "\u5C55\u5F00\u6279\u6CE8\u680F",
      "aria.collapsePanel": "\u6536\u8D77\u6279\u6CE8\u680F",
      "aria.closeEditor": "\u5173\u95ED",
      "aria.send": "\u53D1\u9001\u5230\u5BF9\u8BDD",
      "aria.clearSent": "\u6E05\u9664\u5DF2\u53D1\u9001",
      "aria.editComment": "\u7F16\u8F91\u6279\u6CE8",
      "aria.deleteComment": "\u5220\u9664\u6279\u6CE8",
      "aria.locateComment": "\u5B9A\u4F4D\u5230\u539F\u6587",
      "aria.commentBody": "\u6279\u6CE8\u5185\u5BB9",
      "aria.note": "\u6574\u4F53\u8BF4\u660E",
      "aria.quote": "\u5F15\u6587",
      "aria.comment": "\u6279\u6CE8 {index}",
      "aria.panel": "\u6279\u6CE8\u680F",
      "aria.sent": "\u5DF2\u53D1\u9001"
    };
    var en = {
      "viewer.label": "Review view",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.close": "Close",
      "common.more": "More",
      "panel.title": "Comments",
      "panel.aria": "Comments panel",
      "panel.expand": "Show comments",
      "panel.collapse": "Hide comments",
      "panel.emptyHint": "Select text in the document to add a comment",
      "panel.emptySubHint": "Comments appear here, ready to send to the Agent together",
      "panel.sent": "Sent",
      "panel.stale": "The document changed; this comment may be slightly off",
      "panel.line": "Line {line}",
      "panel.section": "Section \u201C{section}\u201D",
      "panel.clearSent": "Clear sent",
      "panel.openComments": "Comments",
      "panel.closeDrawer": "Close comments",
      "panel.pending": "{count} to send",
      "card.locate": "Locate",
      "card.edit": "Edit",
      "card.delete": "Delete",
      "card.deleteConfirm": "Click again to delete",
      "card.index": "Comment {index}",
      "card.quoteAria": "Quoted text",
      "toolbar.add": "Comment",
      "toolbar.addAria": "Comment on the selected text",
      "editor.title": "Add comment",
      "editor.quoteLabel": "Quoted text",
      "editor.placeholder": "Describe the change you want, for example: the conclusion is too vague; back it with a data point.",
      "editor.save": "Save comment",
      "editor.saveHint": "\u2318Enter to save \xB7 Esc to cancel",
      "editor.empty": "Write a comment first",
      "editor.cancel": "Cancel",
      "composer.title": "Send together",
      "composer.placeholder": "Anything that applies to the whole document (optional), e.g. keep the existing structure.",
      "composer.send": "Send to chat",
      "composer.sending": "Sending\u2026",
      "composer.sendCount": "Send {count} comments",
      "composer.hint": "Merged into one message to the current session",
      "composer.empty": "Nothing to send yet",
      "composer.sentToast": "{count} comments sent to the chat",
      "composer.failedToast": "Send failed. Please try again.",
      "composer.noteLabel": "General note",
      "composer.insert": "Insert into chat",
      "composer.insertedToast": "Inserted into the chat box",
      "composer.openHint": "Select text to start reviewing",
      "aria.commentIndex": "Comment {index}: {excerpt}",
      "aria.reviewToggle": "Comments, {count} pending",
      "aria.addComment": "Add comment",
      "aria.pin": "Comment {index}",
      "message.header": "I have review comments on the document \u201C{fileName}\u201D. Please address them one by one:",
      "message.path": "File path: {filePath}",
      "message.line": "line {line}",
      "message.section": "section \u201C{section}\u201D",
      "message.original": "Original text:",
      "message.instruction": "Change requested: {body}",
      "message.note": "General note: {note}",
      "message.footer": "Only change the places listed above and keep the rest of the content and formatting intact. After finishing, summarize how each item was handled.",
      "code.copy": "Copy",
      "code.copied": "Copied",
      "code.title": "Code block",
      "code.wrap": "Wrap lines",
      "code.unwrap": "Unwrap lines",
      "footnotes": "Footnotes",
      "preview.viewerAria": "Viewer",
      "preview.viewerTitle": "Review view",
      "preview.docAria": "Document content",
      "panel.empty": "Select text in the document to add a comment",
      "composer.chars": "{count} chars",
      "composer.clearSent": "Clear sent ({count})",
      "editor.quote": "Quoted text",
      "editor.saving": "Saving\u2026",
      "card.sent": "Sent",
      "card.line": "Line {line}",
      "aria.expandPanel": "Expand comments",
      "aria.collapsePanel": "Collapse comments",
      "aria.closeEditor": "Close",
      "aria.send": "Send to chat",
      "aria.clearSent": "Clear sent",
      "aria.editComment": "Edit comment",
      "aria.deleteComment": "Delete comment",
      "aria.locateComment": "Locate in document",
      "aria.commentBody": "Comment",
      "aria.note": "Overall note",
      "aria.quote": "Quote",
      "aria.comment": "Comment {index}",
      "aria.panel": "Comments",
      "aria.sent": "Sent"
    };
    var dictionaries = { zh, en };
    function messageLabels(t) {
      return {
        header: t("message.header"),
        path: t("message.path"),
        line: t("message.line"),
        section: t("message.section"),
        original: t("message.original"),
        instruction: t("message.instruction"),
        note: t("message.note"),
        footer: t("message.footer")
      };
    }
    function markdownLabels(t) {
      return {
        code: {
          copyLabel: t("code.copy"),
          copiedLabel: t("code.copied"),
          toolbarLabels: {
            codeLabel: t("code.title"),
            wrapLabel: t("code.wrap"),
            unwrapLabel: t("code.unwrap")
          }
        },
        footnotes: t("footnotes")
      };
    }

    // src/client/layout-css.js
    var TAG = "md-review/layout";
    var LAYOUT_CSS = `
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
    function ensureLayoutStyle() {
      if (typeof document === "undefined") return;
      if (document.querySelector(`style[data-plugin-css="${TAG}"]`) !== null) return;
      const tag = document.createElement("style");
      tag.dataset.pluginCss = TAG;
      tag.dataset.plugin = "md-review";
      tag.textContent = LAYOUT_CSS;
      document.head.appendChild(tag);
    }

    // src/client/file-url.js
    function isAbsoluteWorkspacePath(path) {
      return path.startsWith("/") || /^[a-z]:[/\\]/iu.test(path);
    }
    function fileMediaUrl(base, path) {
      if (!/^https?:/u.test(base) && !base.startsWith("dsh-app://app/") || !isAbsoluteWorkspacePath(path) || /^[/\\]{2}/u.test(path) || /[\u0000-\u001f\u007f]/u.test(path)) {
        return void 0;
      }
      return new URL(`api/file?path=${encodeURIComponent(path)}`, base).href;
    }
    function pathPartsOf(path) {
      const trimmed = path.replace(/[/\\]+$/, "");
      if (trimmed === "") return { directory: "", name: path };
      const cut = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\")) + 1;
      return { directory: trimmed.slice(0, cut), name: trimmed.slice(cut) };
    }
    function resolveImageUrl(documentPath, destination) {
      const suffix = destination.search(/[?#]/u);
      let path;
      try {
        path = decodeURIComponent(suffix === -1 ? destination : destination.slice(0, suffix));
      } catch (_error) {
        return void 0;
      }
      if (path.length === 0) return void 0;
      if (!/^[a-z]:[/\\]/iu.test(path) && /^[a-z][a-z\d+.-]*:/iu.test(path)) return void 0;
      if (!isAbsoluteWorkspacePath(path)) {
        if (documentPath === void 0) return void 0;
        path = pathPartsOf(documentPath).directory + path;
      }
      return fileMediaUrl(document.baseURI, path);
    }

    // src/client/store.js
    var KEY_PREFIX = "dsh.md-review.v1::";
    var VERSION = 1;
    var PERSIST_DELAY_MS = 200;
    function load(address) {
      const empty = { comments: [], note: "" };
      try {
        const raw = globalThis.localStorage?.getItem(KEY_PREFIX + address);
        if (raw === null || raw === void 0) return empty;
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== "object" || parsed.version !== VERSION) return empty;
        const comments = Array.isArray(parsed.comments) ? parsed.comments.filter(isComment) : [];
        return { comments, note: typeof parsed.note === "string" ? parsed.note : "" };
      } catch (_error) {
        return empty;
      }
    }
    function isComment(value) {
      return value !== null && typeof value === "object" && typeof value.id === "string" && typeof value.quote === "string" && typeof value.body === "string" && (value.status === "open" || value.status === "sent");
    }
    function newId() {
      try {
        return globalThis.crypto.randomUUID();
      } catch (_error) {
        return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      }
    }
    function createCommentStore(address) {
      const initial = load(address);
      const listeners = /* @__PURE__ */ new Set();
      let state = {
        comments: initial.comments.slice().sort((a, b) => a.createdAt - b.createdAt),
        note: initial.note,
        activeId: null
      };
      let timer;
      const persist = () => {
        if (timer !== void 0) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = void 0;
          try {
            globalThis.localStorage?.setItem(
              KEY_PREFIX + address,
              JSON.stringify({ version: VERSION, note: state.note, comments: state.comments })
            );
          } catch (_error) {
          }
        }, PERSIST_DELAY_MS);
      };
      const publish = (next) => {
        state = next;
        for (const listener of listeners) listener();
      };
      return {
        getSnapshot: () => state,
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        /** Persist immediately (used before an explicit send). */
        flush() {
          if (timer !== void 0) {
            clearTimeout(timer);
            timer = void 0;
          }
          try {
            globalThis.localStorage?.setItem(
              KEY_PREFIX + address,
              JSON.stringify({ version: VERSION, note: state.note, comments: state.comments })
            );
          } catch (_error) {
          }
        },
        /**
         * Append one comment from a selection.
         * @param {{ quote: string, prefix: string, suffix: string, section: string, line: number | null, body: string }} draft
         * @returns {ReviewComment} the stored comment.
         */
        addComment(draft) {
          const comment = {
            id: newId(),
            quote: draft.quote,
            prefix: draft.prefix,
            suffix: draft.suffix,
            section: draft.section,
            line: draft.line,
            body: draft.body.trim(),
            status: "open",
            createdAt: Date.now(),
            sentAt: null
          };
          publish({
            comments: [...state.comments, comment],
            note: state.note,
            activeId: comment.id
          });
          persist();
          return comment;
        },
        /** Update a comment's editable text. */
        updateComment(id, patch) {
          publish({
            comments: state.comments.map((comment) => comment.id === id ? { ...comment, ...patch } : comment),
            note: state.note,
            activeId: state.activeId
          });
          persist();
        },
        /** Remove one comment. */
        removeComment(id) {
          publish({
            comments: state.comments.filter((comment) => comment.id !== id),
            note: state.note,
            activeId: state.activeId === id ? null : state.activeId
          });
          persist();
        },
        /** Mark the given open comments as sent. */
        markSent(ids) {
          const set = new Set(ids);
          const at = Date.now();
          publish({
            comments: state.comments.map(
              (comment) => set.has(comment.id) && comment.status === "open" ? { ...comment, status: "sent", sentAt: at } : comment
            ),
            note: state.note,
            activeId: state.activeId
          });
          persist();
        },
        /**
         * Refresh location metadata (source line / section) after the previewed
         * file changed. Only comments whose value actually differs are rewritten,
         * and the publish happens once.
         * @param {Array<{ id: string, line?: number | null, section?: string }>} entries
         */
        relocateComments(entries) {
          if (!Array.isArray(entries) || entries.length === 0) return;
          const byId = /* @__PURE__ */ new Map();
          for (const entry of entries) {
            if (entry && typeof entry.id === "string") byId.set(entry.id, entry);
          }
          if (byId.size === 0) return;
          let changed = false;
          const comments = state.comments.map((comment) => {
            const next = byId.get(comment.id);
            if (next === void 0) return comment;
            const line = next.line === void 0 ? comment.line : next.line;
            const section = next.section === void 0 ? comment.section : next.section;
            if (line === comment.line && section === comment.section) return comment;
            changed = true;
            return { ...comment, line, section };
          });
          if (!changed) return;
          publish({ comments, note: state.note, activeId: state.activeId });
          persist();
        },
        /** Drop every sent comment. */
        clearSent() {
          const removed = new Set(
            state.comments.filter((comment) => comment.status === "sent").map((comment) => comment.id)
          );
          publish({
            comments: state.comments.filter((comment) => comment.status !== "sent"),
            note: state.note,
            activeId: state.activeId !== null && removed.has(state.activeId) ? null : state.activeId
          });
          persist();
        },
        /** Replace the unified note text. */
        setNote(note) {
          publish({ comments: state.comments, note, activeId: state.activeId });
          persist();
        },
        /** Set (or clear) the highlighted comment. */
        setActive(id) {
          if (state.activeId === id) return;
          publish({ comments: state.comments, note: state.note, activeId: id });
        }
      };
    }
    function openComments(state) {
      return state.comments.filter((comment) => comment.status === "open");
    }

    // src/client/core/anchors.js
    function toOffset(value, length) {
      const number = Number(value);
      if (!Number.isFinite(number)) return 0;
      return Math.min(Math.max(Math.trunc(number), 0), length);
    }
    function commonSuffixLength(a, b) {
      const limit = Math.min(a.length, b.length);
      let length = 0;
      while (length < limit && a[a.length - 1 - length] === b[b.length - 1 - length]) {
        length += 1;
      }
      return length;
    }
    function commonPrefixLength(a, b) {
      const limit = Math.min(a.length, b.length);
      let length = 0;
      while (length < limit && a[length] === b[length]) {
        length += 1;
      }
      return length;
    }
    function contextOf(text, start, end, radius = 24) {
      const source = text == null ? "" : String(text);
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
        suffix: source.slice(to, Math.min(length, to + width))
      };
    }
    function locateAnchor(text, comment) {
      const source = text == null ? "" : String(text);
      const quote = comment && comment.quote != null ? String(comment.quote) : "";
      if (quote.length === 0) return null;
      const prefix = comment && comment.prefix != null ? String(comment.prefix) : "";
      const suffix = comment && comment.suffix != null ? String(comment.suffix) : "";
      let best = null;
      let index = source.indexOf(quote);
      while (index !== -1) {
        const end = index + quote.length;
        const before = source.slice(Math.max(0, index - prefix.length), index);
        const after = source.slice(end, Math.min(source.length, end + suffix.length));
        const prefixScore = commonSuffixLength(before, prefix);
        const suffixScore = commonPrefixLength(after, suffix);
        const score = prefixScore + suffixScore;
        if (best === null || score > best.score) {
          best = {
            start: index,
            end,
            exact: prefixScore === prefix.length && suffixScore === suffix.length,
            score
          };
        }
        index = source.indexOf(quote, index + 1);
      }
      return best;
    }
    function locateAll(text, comments) {
      const result = /* @__PURE__ */ new Map();
      const list = Array.isArray(comments) ? comments : [];
      for (const comment of list) {
        if (!comment || comment.id == null) continue;
        const found = locateAnchor(text, comment);
        result.set(comment.id, found ? { start: found.start, end: found.end } : null);
      }
      return result;
    }
    function collapseWhitespace(value) {
      let text = "";
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
          text += " ";
          map.push(pendingIndex);
          pendingSpace = false;
        }
        text += char;
        map.push(index);
      }
      return { text, map };
    }
    function lineAt(source, index) {
      let line = 1;
      for (let cursor = 0; cursor < index && cursor < source.length; cursor += 1) {
        if (source[cursor] === "\n") line += 1;
      }
      return line;
    }
    var MARKUP_CHARS = /* @__PURE__ */ new Set(["|", "`", "*", "_", "~", "#", ">", "[", "]", "(", ")", "!", "\\", "-", "+", "="]);
    function compactMarkup(value) {
      let text = "";
      const map = [];
      let lineStart = true;
      for (let index = 0; index < value.length; index += 1) {
        const char = value[index];
        if (/\s/u.test(char)) {
          if (char === "\n" || char === "\r") lineStart = true;
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
        if (char === "<") {
          const close = value.indexOf(">", index + 1);
          if (close !== -1 && close - index <= 120) {
            index = close;
            continue;
          }
        }
        if (char === "]" && value[index + 1] === "(") {
          const close = value.indexOf(")", index + 2);
          if (close !== -1) {
            index = close;
            continue;
          }
        }
        if (char === "!" && (value[index + 1] === "[" || value[index + 1] === "(")) continue;
        if (MARKUP_CHARS.has(char)) continue;
        text += char;
        map.push(index);
      }
      return { text, map };
    }
    function lineOfNormalized(source, normalized, needle) {
      const index = normalized.text.indexOf(needle);
      if (index === -1) return null;
      return lineAt(source, normalized.map[index]);
    }
    function lineOfQuote(sourceText, quote) {
      const source = sourceText == null ? "" : String(sourceText);
      const rawQuote = quote == null ? "" : String(quote).trim();
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

    // src/client/core/dom.js
    var MAX_QUOTE_LENGTH = 400;
    var DOCUMENT_POSITION_FOLLOWING = 4;
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
    function textLength(node) {
      if (!node) return 0;
      if (node.nodeType === 3) return (node.nodeValue || "").length;
      const children = node.childNodes;
      if (!children) return 0;
      let total = 0;
      for (let index = 0; index < children.length; index += 1) total += textLength(children[index]);
      return total;
    }
    function containsNode(container, node) {
      if (!container || !node) return false;
      if (container === node) return true;
      if (typeof container.contains === "function") return container.contains(node);
      return false;
    }
    function toPlainRect(rect) {
      const width = typeof rect.width === "number" ? rect.width : rect.right - rect.left;
      const height = typeof rect.height === "number" ? rect.height : rect.bottom - rect.top;
      return {
        left: rect.left,
        top: rect.top,
        right: typeof rect.right === "number" ? rect.right : rect.left + width,
        bottom: typeof rect.bottom === "number" ? rect.bottom : rect.top + height,
        width,
        height
      };
    }
    function makeRect(left, top, right, bottom) {
      const width = right - left;
      const height = bottom - top;
      if (typeof DOMRect === "function") {
        try {
          return new DOMRect(left, top, width, height);
        } catch {
        }
      }
      return { left, top, right, bottom, width, height, x: left, y: top };
    }
    function firstSelectionRect(range) {
      try {
        if (typeof range.getClientRects === "function") {
          const rects = range.getClientRects();
          for (let index = 0; index < rects.length; index += 1) {
            const rect = rects[index];
            if (rect && (rect.width > 0 || rect.height > 0)) return toPlainRect(rect);
          }
        }
      } catch {
      }
      try {
        if (typeof range.getBoundingClientRect === "function") {
          const rect = range.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) return toPlainRect(rect);
        }
      } catch {
      }
      return null;
    }
    function sectionAt(container, node) {
      if (!container || !node || typeof container.querySelectorAll !== "function") return "";
      let headings;
      try {
        headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      } catch {
        return "";
      }
      let section = "";
      for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        if (!heading || typeof heading.compareDocumentPosition !== "function") continue;
        const position = heading.compareDocumentPosition(node);
        if (!(position & DOCUMENT_POSITION_FOLLOWING)) continue;
        const text = String(heading.textContent || "").replace(/#+\s*$/, "").trim();
        if (text.length > 0) section = text;
      }
      return section;
    }
    function offsetOf(container, node, offset) {
      let consumed = 0;
      let found;
      const visit = (current) => {
        if (found !== void 0) return;
        if (current === node) {
          if (current.nodeType === 3) {
            const length = (current.nodeValue || "").length;
            found = consumed + Math.min(Math.max(Number(offset) || 0, 0), length);
            return;
          }
          const children2 = current.childNodes;
          let total = consumed;
          if (children2) {
            const limit = Math.min(Math.max(Number(offset) || 0, 0), children2.length);
            for (let index = 0; index < limit; index += 1) total += textLength(children2[index]);
          }
          found = total;
          return;
        }
        if (current.nodeType === 3) {
          consumed += (current.nodeValue || "").length;
          return;
        }
        const children = current.childNodes;
        if (!children) return;
        for (let index = 0; index < children.length; index += 1) visit(children[index]);
      };
      visit(container);
      return found === void 0 ? null : found;
    }
    function scrollRangeIntoView(range) {
      try {
        const startNode = range.startContainer;
        const element = startNode && startNode.nodeType === 1 ? startNode : startNode && startNode.parentElement;
        if (element && typeof element.scrollIntoView === "function") {
          element.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      } catch {
      }
    }
    function documentText(container) {
      if (!container) return "";
      let text = "";
      const visit = (node) => {
        if (!node) return;
        if (node.nodeType === 3) {
          text += node.nodeValue || "";
          return;
        }
        const children = node.childNodes;
        if (!children) return;
        for (let index = 0; index < children.length; index += 1) visit(children[index]);
      };
      visit(container);
      return text;
    }
    function sectionAtOffset(container, offset) {
      if (!container) return "";
      const range = rangeFromOffsets(container, offset, offset);
      if (range === null) return "";
      return sectionAt(container, range.startContainer);
    }
    function rangeFromOffsets(container, start, end) {
      if (!container) return null;
      const begin = Number(start);
      const finish = Number(end);
      if (!Number.isInteger(begin) || !Number.isInteger(finish)) return null;
      if (begin < 0 || finish < 0 || begin > finish) return null;
      const text = documentText(container);
      if (finish > text.length) return null;
      if (typeof document === "undefined" || !document || typeof document.createRange !== "function") return null;
      let consumed = 0;
      let startNode = null;
      let startOffset = 0;
      let endNode = null;
      let endOffset = 0;
      for (const node of textNodes(container)) {
        const length = (node.nodeValue || "").length;
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
    function readSelection(container) {
      if (!container || typeof window === "undefined") return null;
      const selection = typeof window.getSelection === "function" ? window.getSelection() : null;
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
        rect
      };
    }
    function setHighlight(name, container, ranges) {
      if (!name) return;
      const api = typeof CSS !== "undefined" && CSS ? CSS : null;
      if (!api || !api.highlights) return;
      const HighlightCtor = typeof Highlight === "function" ? Highlight : void 0;
      if (typeof HighlightCtor !== "function") return;
      const list = Array.isArray(ranges) ? ranges : ranges ? [ranges] : [];
      const domRanges = [];
      for (const item of list) {
        if (!item) continue;
        if (typeof item.start === "number" && typeof item.end === "number") {
          const range = rangeFromOffsets(container, item.start, item.end);
          if (range) domRanges.push(range);
        } else if (typeof item.setStart === "function" && item.startContainer) {
          domRanges.push(item);
        }
      }
      try {
        api.highlights.set(name, new HighlightCtor(...domRanges));
      } catch {
      }
    }
    function clearHighlight(name) {
      if (!name) return;
      const api = typeof CSS !== "undefined" && CSS ? CSS : null;
      if (!api || !api.highlights || typeof api.highlights.delete !== "function") return;
      try {
        api.highlights.delete(name);
      } catch {
      }
    }
    function rangeRect(range) {
      if (!range) return null;
      const rects = [];
      try {
        if (typeof range.getClientRects === "function") {
          const list = range.getClientRects();
          for (let index = 0; index < list.length; index += 1) rects.push(list[index]);
        }
      } catch {
      }
      const usable = rects.filter((rect) => rect && (rect.width > 0 || rect.height > 0));
      const pool = usable.length > 0 ? usable : rects;
      if (pool.length === 0) {
        try {
          if (typeof range.getBoundingClientRect === "function") {
            const bound = range.getBoundingClientRect();
            if (bound && (bound.width > 0 || bound.height > 0)) return toPlainRect(bound);
          }
        } catch {
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
        right = Math.max(right, typeof rect.right === "number" ? rect.right : rect.left + rect.width);
        bottom = Math.max(bottom, typeof rect.bottom === "number" ? rect.bottom : rect.top + rect.height);
      }
      if (!(right > left || bottom > top)) return null;
      return makeRect(left, top, right, bottom);
    }
    function scrollToRange(container, range) {
      if (!container || !range) return;
      const rect = rangeRect(range);
      if (!rect) return;
      const margin = 40;
      let containerRect = null;
      try {
        if (typeof container.getBoundingClientRect === "function") containerRect = container.getBoundingClientRect();
      } catch {
        containerRect = null;
      }
      const viewHeight = typeof container.clientHeight === "number" && container.clientHeight > 0 ? container.clientHeight : containerRect ? containerRect.height : 0;
      const scrollHeight = typeof container.scrollHeight === "number" ? container.scrollHeight : 0;
      const scrollTop = typeof container.scrollTop === "number" ? container.scrollTop : 0;
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
        if (typeof container.scrollTo === "function") {
          container.scrollTo({ top: target, behavior: "smooth" });
          return;
        }
      } catch {
      }
      container.scrollTop = target;
    }

    // src/client/core/message.js
    var DEFAULT_LABELS = {
      "message.header": "\u4EE5\u4E0B\u662F\u6211\u5BF9\u6587\u6863\u300A{fileName}\u300B\uFF08{filePath}\uFF09\u7684\u4FEE\u6539\u610F\u89C1\uFF0C\u8BF7\u9010\u6761\u5904\u7406\uFF1A",
      "message.headerNoPath": "\u4EE5\u4E0B\u662F\u6211\u5BF9\u6587\u6863\u300A{fileName}\u300B\u7684\u4FEE\u6539\u610F\u89C1\uFF0C\u8BF7\u9010\u6761\u5904\u7406\uFF1A",
      "message.line": "\u7B2C {line} \u884C",
      "message.section": "\u7AE0\u8282\u300C{section}\u300D",
      "message.quoteLabel": "\u539F\u6587\uFF1A",
      "message.commentLabel": "\u4FEE\u6539\u610F\u89C1\uFF1A{body}",
      "message.noteLabel": "\u6574\u4F53\u8BF4\u660E\uFF1A{note}",
      "message.footer": "\u8BF7\u53EA\u4FEE\u6539\u4E0A\u8FF0\u6307\u51FA\u7684\u4F4D\u7F6E\uFF0C\u4FDD\u6301\u5176\u4ED6\u5185\u5BB9\u4E0E\u683C\u5F0F\u4E0D\u53D8\uFF1B\u5B8C\u6210\u540E\u9010\u6761\u8BF4\u660E\u5904\u7406\u7ED3\u679C\u3002"
    };
    var LABEL_KEYS = {
      "message.header": ["message.header", "header"],
      "message.headerNoPath": ["message.headerNoPath", "headerNoPath"],
      "message.path": ["message.path", "path"],
      "message.line": ["message.line", "line"],
      "message.section": ["message.section", "section"],
      "message.quoteLabel": ["message.quoteLabel", "message.original", "original"],
      "message.commentLabel": ["message.commentLabel", "message.instruction", "instruction"],
      "message.noteLabel": ["message.noteLabel", "message.note", "note"],
      "message.footer": ["message.footer", "footer"]
    };
    function interpolate(template, params = {}) {
      return String(template).replace(
        /\{(\w+)\}/g,
        (match, name) => Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match
      );
    }
    function rawLabel(labels, key) {
      const candidates = LABEL_KEYS[key] || [key];
      for (const candidate of candidates) {
        if (typeof labels === "function") {
          const value = labels(candidate);
          if (typeof value === "string" && value.length > 0 && value !== candidate) return value;
          continue;
        }
        if (labels && typeof labels === "object") {
          const value = labels[candidate];
          if (typeof value === "string" && value.length > 0) return value;
        }
      }
      return void 0;
    }
    function label(labels, key, params = {}) {
      const template = rawLabel(labels, key) ?? DEFAULT_LABELS[key] ?? "";
      return interpolate(template, params);
    }
    function labelWithValue(labels, key, param, value, params = {}) {
      const template = rawLabel(labels, key) ?? DEFAULT_LABELS[key] ?? "";
      if (template.includes(`{${param}}`)) {
        return interpolate(template, { ...params, [param]: value });
      }
      return `${template}${value}`;
    }
    function toText(value) {
      return value == null ? "" : String(value);
    }
    function stripPathPlaceholder(template) {
      return template.replace(/[ \t]*[（(]\s*\{filePath\}\s*[）)]/g, "");
    }
    function buildHeader(labels, fileName, filePath) {
      const headerTemplate = rawLabel(labels, "message.header") ?? DEFAULT_LABELS["message.header"];
      if (filePath.length === 0) {
        const noPath = rawLabel(labels, "message.headerNoPath");
        if (typeof noPath === "string" && noPath.length > 0) {
          return interpolate(noPath, { fileName });
        }
        return interpolate(stripPathPlaceholder(headerTemplate), { fileName });
      }
      if (headerTemplate.includes("{filePath}")) {
        return interpolate(headerTemplate, { fileName, filePath });
      }
      const header = interpolate(headerTemplate, { fileName });
      const pathTemplate = rawLabel(labels, "message.path");
      const pathLine = typeof pathTemplate === "string" && pathTemplate.length > 0 ? interpolate(pathTemplate, { filePath }) : filePath;
      return `${header}
    ${pathLine}`;
    }
    function formatComment(comment, index, labels) {
      const lineNumber = Number.isInteger(comment && comment.line) && comment.line > 0 ? comment.line : null;
      const section = toText(comment && comment.section).trim();
      const quote = toText(comment && comment.quote).trim();
      const body = toText(comment && comment.body).trim();
      const location = [];
      if (lineNumber !== null) location.push(label(labels, "message.line", { line: lineNumber }));
      if (section.length > 0) location.push(label(labels, "message.section", { section }));
      const head = location.length > 0 ? `${index}. ${location.join(" \xB7 ")}` : `${index}.`;
      const lines = [head];
      if (quote.length > 0) {
        lines.push(`   ${label(labels, "message.quoteLabel")}`);
        for (const quoteLine of quote.split(/\r?\n/)) {
          lines.push(`   > ${quoteLine}`);
        }
      }
      lines.push(`   ${labelWithValue(labels, "message.commentLabel", "body", body)}`);
      return lines.join("\n");
    }
    function composeReviewMessage({ fileName, filePath, note, comments, labels } = {}) {
      const name = toText(fileName).trim();
      const path = toText(filePath).trim();
      const noteText = toText(note).trim();
      const list = (Array.isArray(comments) ? comments : []).filter((comment) => comment && typeof comment === "object").slice().sort((a, b) => (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0));
      const items = list.map((comment, index) => formatComment(comment, index + 1, labels));
      const blocks = [buildHeader(labels, name, path)];
      if (items.length > 0) blocks.push(items.join("\n\n"));
      if (noteText.length > 0) {
        blocks.push(labelWithValue(labels, "message.noteLabel", "note", noteText));
      }
      blocks.push(label(labels, "message.footer"));
      return blocks.join("\n\n").replace(/[ \t]+$/gm, "");
    }

    // src/client/ui/panel.jsx
    var import_react2 = __toESM(require("react"), 1);

    // src/client/ui/styles.js
    var TAG2 = "md-review/ui";
    var UI_CSS = `
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
    var injected = false;
    function ensureStyle() {
      if (injected) return;
      if (typeof document === "undefined") return;
      injected = true;
      if (document.querySelector(`style[data-plugin-css="${TAG2}"]`) !== null) return;
      const tag = document.createElement("style");
      tag.dataset.pluginCss = TAG2;
      tag.dataset.plugin = "md-review";
      tag.textContent = UI_CSS;
      document.head.appendChild(tag);
    }

    // src/client/ui/card.jsx
    var import_react = __toESM(require("react"), 1);
    var import_jsx_runtime = require("react/jsx-runtime");
    var SVG = {
      width: 15,
      height: 15,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false"
    };
    function IconLocate() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...SVG, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "7.2", cy: "7.2", r: "4.2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.4 10.4 13.6 13.6" })
      ] });
    }
    function IconEdit() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...SVG, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.6 3.1 12.9 7.4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.1 12.9 3.7 9.6 10.8 2.5a1.2 1.2 0 0 1 1.7 0l1 1a1.2 1.2 0 0 1 0 1.7L6.4 12.3Z" })
      ] });
    }
    function IconTrash() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...SVG, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.8 4.4h10.4M6.2 4.4V3.1h3.6v1.3M4.1 4.4l.5 8.1a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.5-8.1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.7 7v3.4M9.3 7v3.4" })
      ] });
    }
    function ReviewCommentCard({ comment, index, active, stale, flash, t, onActivate, onEdit, onDelete }) {
      ensureStyle();
      const [editing, setEditing] = import_react.default.useState(false);
      const [draft, setDraft] = import_react.default.useState(comment.body);
      const [confirming, setConfirming] = import_react.default.useState(false);
      const inputRef = import_react.default.useRef(null);
      const sent = comment.status === "sent";
      import_react.default.useEffect(() => {
        if (!editing) return;
        setDraft(comment.body);
        const frame = requestAnimationFrame(() => {
          const input = inputRef.current;
          if (input === null) return;
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        });
        return () => cancelAnimationFrame(frame);
      }, [editing]);
      import_react.default.useEffect(() => {
        if (!confirming) return void 0;
        const timer = setTimeout(() => setConfirming(false), 2600);
        return () => clearTimeout(timer);
      }, [confirming]);
      const cancel = () => {
        setEditing(false);
        setDraft(comment.body);
      };
      const save = () => {
        const body = draft.trim();
        if (body === "") {
          setEditing(false);
          return;
        }
        if (body !== comment.body) onEdit?.(comment.id, body);
        setEditing(false);
      };
      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          cancel();
          return;
        }
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          event.stopPropagation();
          save();
        }
      };
      const deleteClick = () => {
        if (confirming) {
          setConfirming(false);
          onDelete?.(comment.id);
          return;
        }
        setConfirming(true);
      };
      const meta = [];
      if (comment.line !== null && comment.line !== void 0) {
        meta.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mdrev-meta-line", children: t("card.line", { line: comment.line }) }, "line"));
      }
      if (comment.section) {
        meta.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("panel.section", { section: comment.section }) }, "section"));
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "article",
        {
          className: "mdrev-card",
          "data-comment-id": comment.id,
          "data-active": active ? "true" : void 0,
          "data-sent": sent ? "true" : void 0,
          "data-flash": flash ? "true" : void 0,
          "aria-label": t("aria.commentIndex", { index, excerpt: comment.quote }),
          onClick: (event) => {
            if (event.target.closest("button, textarea") !== null) return;
            onActivate?.(comment.id);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-head", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mdrev-badge", title: t("card.index", { index }), "aria-hidden": "true", children: index }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-meta", children: [
                meta,
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "mdrev-card-tags", children: [
                  sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mdrev-tag", children: t("panel.sent") }) : null,
                  stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mdrev-tag", "data-warn": "true", children: t("panel.stale") }) : null
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "mdrev-icon-btn",
                    onClick: () => onActivate?.(comment.id),
                    "aria-label": t("aria.locateComment"),
                    title: t("card.locate"),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLocate, {})
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "mdrev-icon-btn",
                    onClick: () => setEditing(true),
                    "aria-label": t("aria.editComment"),
                    title: t("card.edit"),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEdit, {})
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "mdrev-icon-btn",
                    "data-danger": confirming ? "true" : void 0,
                    onClick: deleteClick,
                    "aria-label": confirming ? t("card.deleteConfirm") : t("aria.deleteComment"),
                    title: confirming ? t("card.deleteConfirm") : t("card.delete"),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, {})
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-main", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { className: "mdrev-quote", "aria-label": t("card.quoteAria"), children: comment.quote }),
              editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-edit", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "textarea",
                  {
                    ref: inputRef,
                    className: "mdrev-input",
                    rows: 3,
                    value: draft,
                    "aria-label": t("aria.commentBody"),
                    onChange: (event) => setDraft(event.target.value),
                    onKeyDown
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mdrev-card-edit-actions", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "mdrev-btn mdrev-btn-ghost mdrev-btn-sm", onClick: cancel, children: t("common.cancel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "mdrev-btn mdrev-btn-primary mdrev-btn-sm",
                      onClick: save,
                      disabled: draft.trim() === "",
                      children: t("common.save")
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mdrev-body", children: comment.body })
            ] })
          ]
        }
      );
    }
    function CommentPins({ pins = [], onActivate, t }) {
      ensureStyle();
      if (pins.length === 0) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mdrev-pin-layer", children: pins.map((pin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: "mdrev-pin",
          style: { top: `${pin.top}px`, left: `${pin.left}px` },
          "data-active": pin.active ? "true" : void 0,
          "data-sent": pin.sent ? "true" : void 0,
          "data-flash": pin.flash ? "true" : void 0,
          "aria-label": t("aria.pin", { index: pin.index }),
          title: t("aria.pin", { index: pin.index }),
          onClick: (event) => {
            event.stopPropagation();
            onActivate?.(pin.id);
          },
          children: pin.index
        },
        pin.id
      )) });
    }

    // src/client/ui/panel.jsx
    var import_jsx_runtime2 = require("react/jsx-runtime");
    function IconComment({ children }) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "svg",
        {
          width: "15",
          height: "15",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13.7 7.4c0 2.9-2.6 5.2-5.7 5.2-.6 0-1.2-.1-1.7-.3l-3.4 1.2 1.1-2.8C2.7 9.7 2.1 8.6 2.1 7.4c0-2.9 2.6-5.2 5.8-5.2s5.8 2.3 5.8 5.2Z" }),
            children
          ]
        }
      );
    }
    function IconChevronRight() {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "svg",
        {
          width: "15",
          height: "15",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m6 3.5 4.5 4.5L6 12.5" })
        }
      );
    }
    function IconClose() {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "svg",
        {
          width: "15",
          height: "15",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m4 4 8 8M12 4l-8 8" })
        }
      );
    }
    function IconSend() {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "svg",
        {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13.4 2.6 7.3 8.7M13.4 2.6 9.8 13.4l-2.5-4.7L2.6 6.2Z" })
        }
      );
    }
    function IconInsert() {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "svg",
        {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M6.6 3.2H3.4a1 1 0 0 0-1 1v8.4a1 1 0 0 0 1 1h8.4a1 1 0 0 0 1-1V9.4" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8.2 8 13 3.2M9.6 3.1H13v3.4" })
          ]
        }
      );
    }
    function IconClear() {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "svg",
        {
          width: "12",
          height: "12",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M2.8 4.4h10.4M6.2 4.4V3.1h3.6v1.3M4.1 4.4l.5 8.1a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.5-8.1" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M6.7 7v3.4M9.3 7v3.4" })
          ]
        }
      );
    }
    function EmptyState({ t }) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mdrev-empty-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconComment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M5.6 7.3h4.8M5.6 9.9h2.6" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mdrev-empty-title", children: t("panel.emptyHint") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mdrev-empty-sub", children: t("panel.emptySubHint") })
      ] });
    }
    function measureTextarea(element, minHeight, maxHeight) {
      if (element === null || element === void 0) return;
      element.style.height = "auto";
      const next = Math.min(Math.max(element.scrollHeight, minHeight), maxHeight);
      element.style.height = `${next}px`;
    }
    function ReviewPanel({
      open = true,
      drawer = false,
      comments = [],
      activeId = null,
      note = "",
      sending = false,
      canSend = false,
      toast = null,
      flashId = null,
      staleIds,
      pendingCount,
      onTogglePanel,
      onActivate,
      onEdit,
      onDelete,
      onClearSent,
      onNoteChange,
      onSend,
      onCloseDrawer,
      onInsert,
      t
    }) {
      ensureStyle();
      const listRef = import_react2.default.useRef(null);
      const noteRef = import_react2.default.useRef(null);
      const pending = typeof pendingCount === "number" ? pendingCount : comments.filter((item) => item.status === "open").length;
      const sentCount = comments.filter((item) => item.status === "sent").length;
      import_react2.default.useLayoutEffect(() => {
        measureTextarea(noteRef.current, 54, 104);
      }, [note]);
      import_react2.default.useEffect(() => {
        if (activeId === null || listRef.current === null) return;
        const card = listRef.current.querySelector(`[data-comment-id="${activeId}"]`);
        if (card !== null) card.scrollIntoView({ block: "nearest" });
      }, [activeId]);
      import_react2.default.useEffect(() => {
        if (!drawer || !open) return void 0;
        const onKeyDown = (event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          event.stopPropagation();
          onCloseDrawer?.();
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [drawer, open, onCloseDrawer]);
      if (!open) {
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: "mdrev-toggle",
            onClick: onTogglePanel,
            "aria-label": t("aria.reviewToggle", { count: pending }),
            title: pending > 0 ? t("panel.expand") : t("composer.openHint"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconComment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M5.6 7.3h4.8M5.6 9.9h2.6" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("panel.openComments") }),
              pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-toggle-count", children: pending }) : null
            ]
          }
        );
      }
      const drawerMode = Boolean(drawer);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        drawerMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mdrev-scrim", "aria-hidden": "true", onClick: () => onCloseDrawer?.() }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "aside",
          {
            className: "mdrev-panel",
            "data-drawer": drawerMode ? "true" : void 0,
            role: drawerMode ? "dialog" : "complementary",
            "aria-modal": drawerMode ? "true" : void 0,
            "aria-label": t("panel.aria"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-panel-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-panel-title", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("panel.title") }),
                  comments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-count", "aria-hidden": "true", children: comments.length }) : null
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "mdrev-icon-btn mdrev-panel-toggle",
                    onClick: drawerMode ? () => onCloseDrawer?.() : () => onTogglePanel?.(),
                    "aria-label": drawerMode ? t("panel.closeDrawer") : t("panel.collapse"),
                    title: drawerMode ? t("panel.closeDrawer") : t("panel.collapse"),
                    children: drawerMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconChevronRight, {})
                  }
                )
              ] }),
              comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyState, { t }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mdrev-list", ref: listRef, role: "list", children: comments.map((comment, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                ReviewCommentCard,
                {
                  comment,
                  index: index + 1,
                  active: comment.id === activeId,
                  stale: staleIds !== void 0 && staleIds !== null && staleIds.has(comment.id) === true,
                  flash: comment.id === flashId,
                  t,
                  onActivate,
                  onEdit,
                  onDelete
                },
                comment.id
              )) }),
              comments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-composer", children: [
                toast !== null && toast !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mdrev-toast", role: "status", children: toast }, toast) : null,
                sentCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mdrev-composer-top", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: "mdrev-link-btn",
                    onClick: () => onClearSent?.(),
                    "aria-label": t("aria.clearSent"),
                    title: t("aria.clearSent"),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClear, {}),
                      t("composer.clearSent", { count: sentCount })
                    ]
                  }
                ) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "textarea",
                  {
                    ref: noteRef,
                    className: "mdrev-input",
                    rows: 2,
                    value: note,
                    placeholder: t("composer.placeholder"),
                    "aria-label": t("composer.noteLabel"),
                    onChange: (event) => onNoteChange?.(event.target.value)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-composer-meta", title: t("composer.hint"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-composer-pending", children: pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "mdrev-dot", "aria-hidden": "true" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("panel.pending", { count: pending }) })
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("composer.empty") }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-composer-chars", children: t("composer.chars", { count: (note ?? "").length }) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mdrev-send-row", children: [
                  typeof onInsert === "function" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                    "button",
                    {
                      type: "button",
                      className: "mdrev-btn mdrev-btn-ghost mdrev-insert",
                      onClick: () => onInsert(),
                      disabled: sending || !canSend,
                      "aria-label": t("composer.insert"),
                      title: t("composer.insert"),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconInsert, {}),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-insert-label", children: t("composer.insert") })
                      ]
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "mdrev-btn mdrev-btn-primary",
                      onClick: () => onSend?.(),
                      disabled: sending || !canSend || pending === 0,
                      "aria-label": t("aria.send"),
                      title: pending > 0 ? t("composer.sendCount", { count: pending }) : t("composer.empty"),
                      children: sending ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-spinner" }),
                        t("composer.sending")
                      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconSend, {}),
                        t("composer.send"),
                        pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mdrev-send-count", children: pending }) : null
                      ] })
                    }
                  )
                ] })
              ] }) : null
            ]
          }
        )
      ] });
    }

    // src/client/ui/toolbar.jsx
    var import_react3 = __toESM(require("react"), 1);
    var import_react_dom = require("react-dom");
    var import_jsx_runtime3 = require("react/jsx-runtime");
    var TOOLBAR_HEIGHT = 30;
    var EDITOR_MAX_WIDTH = 352;
    var EDITOR_MAX_HEIGHT = 240;
    var MARGIN = 8;
    function IconPlus() {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "svg",
        {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.6",
          strokeLinecap: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M8 3.2v9.6M3.2 8h9.6" })
        }
      );
    }
    function IconClose2() {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "svg",
        {
          width: "15",
          height: "15",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "m4 4 8 8M12 4l-8 8" })
        }
      );
    }
    var clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    function SelectionToolbar({ rect, onAdd, t }) {
      ensureStyle();
      if (rect === null || rect === void 0 || typeof document === "undefined") return null;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centerX = rect.left + rect.width / 2;
      const left = clamp(centerX, 72, viewportWidth - 72);
      const spaceAbove = rect.top - MARGIN;
      const spaceBelow = viewportHeight - rect.bottom - MARGIN;
      const flip = spaceAbove < TOOLBAR_HEIGHT + 8 && spaceBelow > spaceAbove;
      const top = flip ? Math.min(rect.bottom + MARGIN, viewportHeight - TOOLBAR_HEIGHT - 6) : Math.max(rect.top - MARGIN, TOOLBAR_HEIGHT + 6);
      return (0, import_react_dom.createPortal)(
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "mdrev-toolbar-wrap",
            "data-flip": flip ? "true" : "false",
            style: { left: `${left}px`, top: `${top}px` },
            onMouseDown: (event) => event.preventDefault(),
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "button",
              {
                type: "button",
                className: "mdrev-toolbar",
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => onAdd?.(),
                "aria-label": t("toolbar.addAria"),
                title: t("toolbar.addAria"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconPlus, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("toolbar.add") })
                ]
              }
            )
          }
        ),
        document.body
      );
    }
    function CommentEditor({ rect, quote = "", value = "", onChange, onSave, onCancel, saving = false, t }) {
      ensureStyle();
      const boxRef = import_react3.default.useRef(null);
      const inputRef = import_react3.default.useRef(null);
      const [position, setPosition] = import_react3.default.useState(null);
      const [showError, setShowError] = import_react3.default.useState(false);
      const valid = typeof value === "string" && value.trim() !== "";
      import_react3.default.useLayoutEffect(() => {
        if (rect === null || rect === void 0) return;
        const box = boxRef.current;
        if (box === null) return;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const width = Math.min(EDITOR_MAX_WIDTH, viewportWidth - 2 * MARGIN - 8);
        const height = Math.max(box.offsetHeight, EDITOR_MAX_HEIGHT);
        const centerX = rect.left + rect.width / 2;
        const left = clamp(centerX - width / 2, MARGIN + 4, viewportWidth - width - MARGIN - 4);
        const below = rect.bottom + 10;
        const above = rect.top - 10 - height;
        let top;
        if (below + height + MARGIN <= viewportHeight) top = below;
        else if (above >= MARGIN) top = above;
        else top = Math.max(MARGIN, viewportHeight - height - MARGIN);
        setPosition({ left, top, width });
      }, [rect]);
      import_react3.default.useEffect(() => {
        const onKeyDown = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onCancel?.();
            return;
          }
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (saving) return;
            if (valid) onSave?.();
            else setShowError(true);
          }
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [valid, saving, onSave, onCancel]);
      import_react3.default.useEffect(() => {
        const input = inputRef.current;
        if (input === null) return;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }, []);
      if (rect === null || rect === void 0 || typeof document === "undefined") return null;
      const style = {
        left: `${position === null ? -9999 : position.left}px`,
        top: `${position === null ? -9999 : position.top}px`,
        width: `${position === null ? EDITOR_MAX_WIDTH : position.width}px`,
        visibility: position === null ? "hidden" : "visible"
      };
      return (0, import_react_dom.createPortal)(
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mdrev-editor", ref: boxRef, style, role: "dialog", "aria-label": t("editor.title"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mdrev-editor-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mdrev-editor-title", children: t("editor.title") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "mdrev-icon-btn",
                onClick: onCancel,
                disabled: saving,
                "aria-label": t("aria.closeEditor"),
                title: t("common.close"),
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconClose2, {})
              }
            )
          ] }),
          quote !== "" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mdrev-editor-quote", "aria-label": t("aria.quote"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mdrev-editor-quote-label", children: t("editor.quoteLabel") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mdrev-editor-quote-text", children: quote })
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "textarea",
            {
              ref: inputRef,
              className: "mdrev-input",
              rows: 4,
              value,
              placeholder: t("editor.placeholder"),
              "aria-label": t("aria.commentBody"),
              onChange: (event) => {
                if (showError) setShowError(false);
                onChange?.(event.target.value);
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mdrev-editor-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mdrev-editor-hint", "data-error": showError && !valid ? "true" : void 0, children: valid ? t("editor.saveHint") : t("editor.empty") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mdrev-editor-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "mdrev-btn mdrev-btn-ghost mdrev-btn-sm", onClick: onCancel, disabled: saving, children: t("editor.cancel") }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "mdrev-btn mdrev-btn-primary mdrev-btn-sm",
                  onClick: () => {
                    if (!valid) {
                      setShowError(true);
                      return;
                    }
                    onSave?.();
                  },
                  disabled: saving || !valid,
                  children: saving ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mdrev-spinner" }),
                    t("editor.saving")
                  ] }) : t("editor.save")
                }
              )
            ] })
          ] })
        ] }),
        document.body
      );
    }

    // src/client/review-body.jsx
    var import_jsx_runtime4 = require("react/jsx-runtime");
    var FRONTMATTER = /^\uFEFF?---[ \t]*\r?\n(?:([\s\S]*?)\r?\n)??(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/u;
    function splitFrontmatter(text) {
      const match = FRONTMATTER.exec(text);
      if (match === null) return void 0;
      return { source: match[1] ?? "", body: text.slice(match[0].length) };
    }
    function FrontmatterCard({ source }) {
      if (source.trim() === "") return null;
      const rows = [];
      const raw = [];
      for (const line of source.split(/\r?\n/u)) {
        if (line.trim() === "") continue;
        const match = /^([A-Za-z0-9_.-]+):[ \t]*(.*)$/u.exec(line);
        if (match === null) {
          raw.push(line);
          continue;
        }
        rows.push({ key: match[1], value: match[2].replace(/^['"]|['"]$/gu, "") });
      }
      if (rows.length === 0) {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mdrev-frontmatter", "data-mdrev-frontmatter": "raw", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { className: "mdrev-frontmatter-raw", children: source }) });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mdrev-frontmatter", "data-mdrev-frontmatter": "fields", children: [
        rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react4.default.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mdrev-frontmatter-key", children: row.key }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mdrev-frontmatter-value", children: row.value })
        ] }, row.key)),
        raw.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { className: "mdrev-frontmatter-raw", children: raw.join("\n") }) : null
      ] });
    }
    function nameOf(absolutePath, title, address) {
      if (typeof title === "string" && title !== "") return title;
      const source = typeof absolutePath === "string" && absolutePath !== "" ? absolutePath : address;
      const cut = Math.max(source.lastIndexOf("/"), source.lastIndexOf("\\"));
      const name = cut === -1 ? source : source.slice(cut + 1);
      try {
        return decodeURIComponent(name);
      } catch (_error) {
        return name;
      }
    }
    function isStale(positions, id) {
      return positions.get(id) === null;
    }
    var NO_INPUT_HOOK = () => void 0;
    function ReviewBody(props) {
      const { content, resourceAddress, scrollportRef, useResource, useTabInfo, useInput, inputActions, t } = props;
      ensureLayoutStyle();
      ensureStyle();
      const { tab } = useTabInfo();
      const meta = useResource(resourceAddress);
      const absolutePath = meta.value?.absolutePath;
      const text = content !== void 0 && content.kind === "text" ? content.text : "";
      const eof = content !== void 0 && content.kind === "text" ? content.eof : true;
      const store = import_react4.default.useMemo(() => createCommentStore(resourceAddress), [resourceAddress]);
      const snapshot = import_react4.default.useSyncExternalStore(store.subscribe, store.getSnapshot);
      const { comments, note, activeId } = snapshot;
      const pending = openComments(snapshot);
      const [positions, setPositions] = import_react4.default.useState(() => /* @__PURE__ */ new Map());
      const [selection, setSelection] = import_react4.default.useState(null);
      const [editor, setEditor] = import_react4.default.useState(null);
      const [draftBody, setDraftBody] = import_react4.default.useState("");
      const [panelOpen, setPanelOpen] = import_react4.default.useState(true);
      const [drawer, setDrawer] = import_react4.default.useState(false);
      const [pins, setPins] = import_react4.default.useState([]);
      const [toast, setToast] = import_react4.default.useState(null);
      const [sending, setSending] = import_react4.default.useState(false);
      const [flashId, setFlashId] = import_react4.default.useState(null);
      const useInputSafe = typeof useInput === "function" ? useInput : NO_INPUT_HOOK;
      const input = useInputSafe((state) => state);
      const inputPhase = input === void 0 ? void 0 : input.phase;
      const inputDraft = input === void 0 ? void 0 : input.draft;
      const scrollerRef = import_react4.default.useRef(null);
      const innerRef = import_react4.default.useRef(null);
      const docRef = import_react4.default.useRef(null);
      const rootRef = import_react4.default.useRef(null);
      const pendingSentRef = import_react4.default.useRef(null);
      const toastTimerRef = import_react4.default.useRef(null);
      const flashTimerRef = import_react4.default.useRef(null);
      const labels = import_react4.default.useMemo(() => markdownLabels(t), [t]);
      const pathImages = import_react4.default.useMemo(
        () => ({ resolve: (destination) => resolveImageUrl(absolutePath, destination) }),
        [absolutePath]
      );
      const setScroller = import_react4.default.useCallback(
        (element) => {
          scrollerRef.current = element;
          scrollportRef(element);
        },
        [scrollportRef]
      );
      import_react4.default.useEffect(() => () => scrollportRef(null), [scrollportRef]);
      const showToast = import_react4.default.useCallback((message) => {
        if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
        setToast(message);
        toastTimerRef.current = setTimeout(() => {
          toastTimerRef.current = null;
          setToast(null);
        }, 2200);
      }, []);
      import_react4.default.useEffect(
        () => () => {
          if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
          if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
        },
        []
      );
      import_react4.default.useEffect(() => {
        const container = docRef.current;
        if (container === null) return;
        const rendered = documentText(container);
        const located = locateAll(rendered, comments);
        setPositions(located);
        const refreshed = [];
        for (const comment of comments) {
          const spot = located.get(comment.id);
          if (spot === void 0 || spot === null) continue;
          const line = lineOfQuote(text, comment.quote);
          const section = sectionAtOffset(container, spot.start);
          if (line !== comment.line || section !== comment.section) {
            refreshed.push({ id: comment.id, line, section });
          }
        }
        if (refreshed.length > 0) store.relocateComments(refreshed);
        const ranges = [];
        for (const comment of comments) {
          const spot = located.get(comment.id);
          if (spot === void 0 || spot === null) continue;
          const range = rangeFromOffsets(container, spot.start, spot.end);
          if (range !== null) ranges.push(range);
        }
        setHighlight("md-review", container, ranges);
        if (activeId !== null) {
          const spot = located.get(activeId);
          const activeRange = spot ? rangeFromOffsets(container, spot.start, spot.end) : null;
          setHighlight("md-review-active", container, activeRange === null ? [] : [activeRange]);
        } else {
          clearHighlight("md-review-active");
        }
      }, [text, comments, activeId]);
      import_react4.default.useEffect(() => {
        const container = docRef.current;
        if (container === null) return;
        const spot = editor !== null ? editor : selection;
        if (spot === null || spot === void 0) {
          clearHighlight("md-review-draft");
          return;
        }
        const range = rangeFromOffsets(container, spot.start, spot.end);
        setHighlight("md-review-draft", container, range === null ? [] : [range]);
      }, [selection, editor, text]);
      const measurePins = import_react4.default.useCallback(() => {
        const container = docRef.current;
        const inner = innerRef.current;
        if (container === null || inner === null) return;
        const innerBox = inner.getBoundingClientRect();
        const gutterX = inner.clientWidth - 26;
        const rows = [];
        for (let index = 0; index < comments.length; index += 1) {
          const comment = comments[index];
          const spot = positions.get(comment.id);
          if (spot === void 0 || spot === null) continue;
          const range = rangeFromOffsets(container, spot.start, spot.end);
          if (range === null) continue;
          const rect = rangeRect(range);
          if (rect === null) continue;
          let y = rect.top - innerBox.top + rect.height / 2;
          for (const row of rows) {
            if (Math.abs(row.y - y) < 18) y = row.y + 18;
          }
          rows.push({
            id: comment.id,
            index: index + 1,
            left: gutterX,
            top: y,
            active: comment.id === activeId,
            sent: comment.status === "sent",
            stale: positions.get(comment.id) === null
          });
        }
        rows.sort((a, b) => a.top - b.top);
        setPins(rows);
      }, [comments, positions, activeId]);
      import_react4.default.useEffect(() => {
        measurePins();
      }, [measurePins, text]);
      import_react4.default.useEffect(() => {
        const inner = innerRef.current;
        if (inner === null) return void 0;
        const observer = new ResizeObserver(() => measurePins());
        observer.observe(inner);
        const onResize = () => measurePins();
        window.addEventListener("resize", onResize);
        return () => {
          observer.disconnect();
          window.removeEventListener("resize", onResize);
        };
      }, [measurePins]);
      import_react4.default.useEffect(() => {
        const container = docRef.current;
        if (container === null) return void 0;
        let frame = 0;
        const update = () => {
          frame = 0;
          if (editor !== null) return;
          const next = readSelection(container);
          setSelection((previous) => {
            if (previous === null && next === null) return previous;
            if (previous !== null && next !== null && previous.start === next.start && previous.end === next.end) {
              return previous;
            }
            return next;
          });
        };
        const schedule = () => {
          if (frame !== 0) return;
          frame = window.requestAnimationFrame(update);
        };
        document.addEventListener("selectionchange", schedule);
        const scroller = scrollerRef.current;
        if (scroller !== null) {
          scroller.addEventListener("mouseup", schedule);
          scroller.addEventListener("keyup", schedule);
        }
        return () => {
          if (frame !== 0) window.cancelAnimationFrame(frame);
          document.removeEventListener("selectionchange", schedule);
          if (scroller !== null) {
            scroller.removeEventListener("mouseup", schedule);
            scroller.removeEventListener("keyup", schedule);
          }
        };
      }, [editor, text]);
      import_react4.default.useEffect(() => {
        const root = rootRef.current;
        if (root === null) return void 0;
        const measure = () => {
          setDrawer(root.clientWidth > 0 && root.clientWidth < 560);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(root);
        return () => observer.disconnect();
      }, []);
      const clearNativeSelection = import_react4.default.useCallback(() => {
        try {
          window.getSelection()?.removeAllRanges();
        } catch (_error) {
        }
      }, []);
      const beginComment = import_react4.default.useCallback(() => {
        if (selection === null) return;
        setEditor({ ...selection });
        setDraftBody("");
        setSelection(null);
      }, [selection]);
      const cancelEditor = import_react4.default.useCallback(() => {
        setEditor(null);
        setDraftBody("");
        clearHighlight("md-review-draft");
      }, []);
      const saveComment = import_react4.default.useCallback(() => {
        if (editor === null) return;
        const body = draftBody.trim();
        if (body === "") return;
        const line = lineOfQuote(text, editor.quote);
        store.addComment({
          quote: editor.quote,
          prefix: editor.prefix,
          suffix: editor.suffix,
          section: editor.section,
          line,
          body
        });
        setEditor(null);
        setDraftBody("");
        if (!drawer) setPanelOpen(true);
        clearNativeSelection();
      }, [editor, draftBody, text, store, clearNativeSelection, drawer]);
      const activate = import_react4.default.useCallback(
        (id, options = {}) => {
          store.setActive(id);
          const container = docRef.current;
          const scroller = scrollerRef.current;
          if (container === null || scroller === null) return;
          const spot = positions.get(id);
          if (spot === void 0 || spot === null) {
            showToast(t("panel.stale"));
            return;
          }
          const range = rangeFromOffsets(container, spot.start, spot.end);
          if (range === null) return;
          if (drawer) setPanelOpen(false);
          scrollToRange(scroller, range);
          if (options.flash !== false) {
            setFlashId(id);
            if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
            flashTimerRef.current = setTimeout(() => {
              flashTimerRef.current = null;
              setFlashId(null);
            }, 1400);
          }
        },
        [store, positions, showToast, t, drawer]
      );
      const onDocumentClick = import_react4.default.useCallback(
        (event) => {
          const container = docRef.current;
          if (container === null) return;
          const native = window.getSelection();
          if (native !== null && native.toString().trim() !== "") return;
          let offsetNode = null;
          let offset = 0;
          if (typeof document.caretPositionFromPoint === "function") {
            const point = document.caretPositionFromPoint(event.clientX, event.clientY);
            if (point !== void 0 && point !== null) {
              offsetNode = point.offsetNode;
              offset = point.offset;
            }
          } else if (typeof document.caretRangeFromPoint === "function") {
            const range = document.caretRangeFromPoint(event.clientX, event.clientY);
            if (range !== null && range !== void 0) {
              offsetNode = range.startContainer;
              offset = range.startOffset;
            }
          }
          if (offsetNode === null || offsetNode === void 0 || !container.contains(offsetNode)) return;
          const ordered = [...comments].reverse();
          for (const comment of ordered) {
            const spot = positions.get(comment.id);
            if (spot === void 0 || spot === null) continue;
            const range = rangeFromOffsets(container, spot.start, spot.end);
            if (range === null) continue;
            const relation = range.comparePoint(offsetNode, offset);
            if (relation === 0) {
              activate(comment.id);
              return;
            }
          }
        },
        [comments, positions, activate]
      );
      const sendPending = import_react4.default.useCallback(() => {
        if (sending || pending.length === 0 || inputActions === void 0 || inputActions === null) return;
        const fileName = nameOf(absolutePath, tab?.title, resourceAddress);
        const message = composeReviewMessage({
          fileName,
          filePath: absolutePath ?? "",
          note,
          comments: pending,
          labels: messageLabels(t)
        });
        pendingSentRef.current = {
          ids: pending.map((comment) => comment.id),
          message,
          accepted: false,
          startedAt: Date.now()
        };
        setSending(true);
        try {
          inputActions.setDraft(message);
          inputActions.submit();
        } catch (_error) {
          pendingSentRef.current = null;
          setSending(false);
          showToast(t("composer.failedToast"));
        }
      }, [sending, pending, inputActions, absolutePath, tab, resourceAddress, note, t, showToast]);
      const insertOnly = import_react4.default.useCallback(() => {
        if (pending.length === 0 || inputActions === void 0 || inputActions === null) return;
        const fileName = nameOf(absolutePath, tab?.title, resourceAddress);
        const message = composeReviewMessage({
          fileName,
          filePath: absolutePath ?? "",
          note,
          comments: pending,
          labels: messageLabels(t)
        });
        try {
          inputActions.setDraft(message);
          showToast(t("composer.insertedToast"));
        } catch (_error) {
          showToast(t("composer.failedToast"));
        }
      }, [pending, inputActions, absolutePath, tab, resourceAddress, note, t, showToast]);
      import_react4.default.useEffect(() => {
        const sent = pendingSentRef.current;
        if (!sending || sent === null) return void 0;
        const finish = (ok) => {
          if (pendingSentRef.current !== sent) return;
          pendingSentRef.current = null;
          setSending(false);
          if (ok) {
            store.markSent(sent.ids);
            store.flush();
            showToast(t("composer.sentToast", { count: sent.ids.length }));
          } else {
            showToast(t("composer.failedToast"));
          }
        };
        const phase = inputPhase === void 0 ? "plain" : inputPhase;
        const draft = inputDraft === void 0 ? "" : inputDraft;
        if (phase !== "plain") sent.accepted = true;
        if (phase === "plain") {
          if (draft === "") {
            if (sent.accepted) {
              finish(true);
              return void 0;
            }
            const settle = setTimeout(() => finish(true), 400);
            return () => clearTimeout(settle);
          }
          if (sent.accepted) {
            finish(false);
            return void 0;
          }
          const refusal = setTimeout(() => finish(false), 1e3);
          return () => clearTimeout(refusal);
        }
        const safety = setTimeout(() => finish(false), 2e4);
        return () => clearTimeout(safety);
      }, [sending, inputPhase, inputDraft, store, showToast, t]);
      const split = import_react4.default.useMemo(() => splitFrontmatter(text), [text]);
      if (content === void 0 || content.kind !== "text") return null;
      const staleIds = /* @__PURE__ */ new Set();
      for (const comment of comments) {
        if (isStale(positions, comment.id)) staleIds.add(comment.id);
      }
      const editorQuote = editor === null ? "" : editor.quote;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mdrev-app", "data-mdrev-root": "true", ref: rootRef, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mdrev-doc", ref: setScroller, "data-mdrev-doc-scroller": "true", tabIndex: -1, onClick: onDocumentClick, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mdrev-doc-inner", ref: innerRef, children: [
          split === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FrontmatterCard, { source: split.source }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mdrev-md", "data-mdrev-document": "true", ref: docRef, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_dsh_client_ui_primitives.MarkdownText,
            {
              text: split?.body ?? text,
              streaming: !eof,
              labels,
              pathImages
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CommentPins, { pins, onActivate: activate, t })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ReviewPanel,
          {
            open: panelOpen,
            drawer,
            comments,
            activeId,
            flashId,
            staleIds,
            note,
            sending,
            canSend: pending.length > 0 && inputActions !== void 0 && inputActions !== null,
            pendingCount: pending.length,
            toast,
            onTogglePanel: () => setPanelOpen((value) => !value),
            onActivate: activate,
            onEdit: (id, body) => store.updateComment(id, { body }),
            onDelete: (id) => store.removeComment(id),
            onClearSent: () => store.clearSent(),
            onNoteChange: (value) => store.setNote(value),
            onSend: sendPending,
            onInsert: insertOnly,
            onCloseDrawer: () => setPanelOpen(false),
            t
          }
        ),
        selection !== null && editor === null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SelectionToolbar, { rect: selection.rect, onAdd: beginComment, t }) : null,
        editor !== null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          CommentEditor,
          {
            rect: editor.rect,
            quote: editorQuote,
            value: draftBody,
            onChange: setDraftBody,
            onSave: saveComment,
            onCancel: cancelEditor,
            t
          }
        ) : null
      ] });
    }

    // src/client/index.js
    var IMPLEMENTATION_ID = "dsh-md-review";
    var inject = ["slots", "locale", "documentPreviews"];
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, dictionaries), "md-review: dictionaries");
      ctx.effect(
        () => ctx.documentPreviews.register({
          id: IMPLEMENTATION_ID,
          extensions: ["md", "markdown"],
          priority: "extension",
          title: () => ctx.locale.bind(NS)("viewer.label"),
          loading: "text-pages",
          wrap: false
        }),
        "md-review: document definition"
      );
      ctx.effect(
        () => ctx.slots.inject(
          "sidebar.right.tab.document",
          () => ctx.slots.register(
            {
              name: "sidebar.right.tab.document",
              key: IMPLEMENTATION_ID,
              locale: NS
            },
            ReviewBody
          )
        ),
        "md-review: document body"
      );
    }

    return module.exports;
  },
});
