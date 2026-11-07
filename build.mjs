/**
 * Build the browser half into the hand-written ModuleLoader wrapper at
 * ./client.js. The wrapper reproduces what a compiled client bundle does by
 * hand: register one factory with the page's lazy CJS loader, inside which the
 * bundled code runs with the loader-provided `require`.
 */
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';

const EXTERNALS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-dockkit',
  'zod',
  '@tanstack/react-virtual',
];

const result = await build({
  entryPoints: ['src/client/index.js'],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome120'],
  jsx: 'automatic',
  external: EXTERNALS,
  legalComments: 'none',
  logLevel: 'warning',
  sourcemap: false,
});

const bundle = result.outputFiles[0].text;
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const wrapper = `window.__ModuleLoader__.load({
  id: ${JSON.stringify(pkg.name)},
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
${indent(bundle, 4)}
    return module.exports;
  },
});
`;
await writeFile('client.js', wrapper);
console.log(`client.js written (${(wrapper.length / 1024).toFixed(1)} KiB)`);

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length > 0 ? pad + line : line))
    .join('\n');
}
