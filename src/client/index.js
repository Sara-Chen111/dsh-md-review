/**
 * Client half of the md-review bundle.
 *
 * Registers a Markdown document-preview implementation that replaces the
 * builtin viewer with a review-oriented one: the document renders through the
 * shared MarkdownText primitive, while a comment panel and a unified composer
 * live beside it. The builtin Markdown viewer stays available in the viewer
 * dropdown.
 */
import { ReviewBody } from './review-body.jsx';
import { NS, dictionaries } from './i18n.js';

/** Identity of this document implementation (also the key of its slot body). */
export const IMPLEMENTATION_ID = 'dsh-md-review';

/** Required client services. */
export const inject = ['slots', 'locale', 'documentPreviews'];

/** Client plugin body. */
export function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, dictionaries), 'md-review: dictionaries');
  ctx.effect(
    () =>
      ctx.documentPreviews.register({
        id: IMPLEMENTATION_ID,
        extensions: ['md', 'markdown'],
        priority: 'extension',
        title: () => ctx.locale.bind(NS)('viewer.label'),
        loading: 'text-pages',
        wrap: false,
      }),
    'md-review: document definition',
  );
  ctx.effect(
    () =>
      ctx.slots.inject('sidebar.right.tab.document', () =>
        ctx.slots.register(
          {
            name: 'sidebar.right.tab.document',
            key: IMPLEMENTATION_ID,
            locale: NS,
          },
          ReviewBody,
        ),
      ),
    'md-review: document body',
  );
}
