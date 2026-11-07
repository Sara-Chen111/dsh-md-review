/**
 * i18n consistency checks.
 *
 * The locale namespace is shared by every component, so a key that only exists
 * in one dictionary silently renders as the raw key in the other language.
 * These tests keep `zh`/`en` in lockstep and catch keys referenced from UI
 * source but never translated.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dictionaries, format, messageLabels, markdownLabels } from '../src/client/i18n.js';

const CLIENT_DIR = fileURLToPath(new URL('../src/client/', import.meta.url));

/** Every `.js`/`.jsx` file under src/client except the dictionary itself. */
function sourceFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const file = `${directory}${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...sourceFiles(`${file}/`));
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
      if (entry.name !== 'i18n.js') files.push(file);
    }
  }
  return files;
}

test('dictionaries: zh and en expose exactly the same keys', () => {
  const zh = Object.keys(dictionaries.zh).sort();
  const en = Object.keys(dictionaries.en).sort();
  const missingInEn = zh.filter((key) => !(key in dictionaries.en));
  const missingInZh = en.filter((key) => !(key in dictionaries.zh));
  assert.deepEqual(missingInEn, [], 'keys missing from en');
  assert.deepEqual(missingInZh, [], 'keys missing from zh');
});

test('dictionaries: every t() key used in client source exists in both locales', () => {
  const files = sourceFiles(CLIENT_DIR);
  assert.ok(files.length > 0);
  const used = new Set();
  // Matches t('key') and t("key") references in JSX/JS.
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/\bt\(\s*'(?<key>[a-zA-Z][\w.]*)'\s*\)/gu)) {
      used.add(match.groups.key);
    }
  }
  assert.ok(used.size > 40, `expected many translation keys, found ${used.size}`);
  const missingInZh = [...used].filter((key) => !(key in dictionaries.zh));
  const missingInEn = [...used].filter((key) => !(key in dictionaries.en));
  assert.deepEqual(missingInZh, [], 'keys used in source but missing from zh');
  assert.deepEqual(missingInEn, [], 'keys used in source but missing from en');
});

test('format: interpolates {name} placeholders and leaves unknown ones intact', () => {
  assert.equal(format('第 {line} 行', { line: 12 }), '第 12 行');
  assert.equal(format('{count} 条批注', { count: 0 }), '0 条批注');
  assert.equal(format('第 {line} 行', {}), '第 {line} 行');
  assert.equal(format('literal'), 'literal');
  // Numeric zero and empty string are legitimate substitutions.
  assert.equal(format('{a}|{b}', { a: 0, b: '' }), '0|');
});

test('messageLabels: template set resolves in both languages', () => {
  for (const dictionary of [dictionaries.zh, dictionaries.en]) {
    const t = (key) => dictionary[key];
    const labels = messageLabels(t);
    for (const [name, value] of Object.entries(labels)) {
      assert.equal(typeof value, 'string', `message label ${name} is a string`);
      assert.notEqual(value, undefined);
      assert.ok(value.length > 0, `message label ${name} is not empty`);
      assert.ok(!value.startsWith('message.'), `message label ${name} is translated`);
    }
    assert.ok(labels.header.includes('{fileName}'));
    assert.ok(labels.note.includes('{note}'));
    assert.ok(labels.instruction.includes('{body}'));
  }
});

test('markdownLabels: primitive labels resolve in both languages', () => {
  for (const dictionary of [dictionaries.zh, dictionaries.en]) {
    const t = (key) => dictionary[key];
    const labels = markdownLabels(t);
    assert.equal(typeof labels.code.copyLabel, 'string');
    assert.equal(typeof labels.footnotes, 'string');
    assert.ok(!labels.code.copyLabel.startsWith('code.'));
  }
});
