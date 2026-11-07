/**
 * Aggregator for the browser-core unit tests.
 *
 * `node --test test/` resolves the directory positional as a module entry on
 * Node 23 (a directory is loaded via its `index`), so this file imports every
 * sibling `*.test.js` in deterministic order. Adding a new test file therefore
 * needs no edit here, and `node --test test/*.test.js` also works unchanged.
 */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));
const testFiles = readdirSync(directory)
  // Ignore hidden files: this volume creates AppleDouble `._foo.test.js`
  // companions that are not JavaScript.
  .filter((name) => !name.startsWith('.') && name.endsWith('.test.js'))
  .sort();

for (const name of testFiles) {
  await import(new URL(name, import.meta.url));
}
