#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const lifecycle = read('src/useDownloadChooserLifecycle.js');

for (const file of ['src/main.jsx', 'src/siteShared.jsx']) {
  const source = read(file);
  assert.ok(source.includes("useDownloadChooserLifecycle"), `${file} must use shared chooser lifecycle`);
  assert.ok(source.includes('aria-modal="true"'), `${file} chooser must be modal to assistive technology`);
  assert.ok(source.includes('aria-labelledby'), `${file} chooser must retain an accessible title`);
  assert.ok(source.includes('triggerRef'), `${file} chooser must retain its opener`);
  assert.ok(source.includes('restoreFocus: false'), `${file} links must avoid stealing focus during navigation`);
}

assert.ok(lifecycle.includes("first?.focus()"), 'chooser must focus the first option on open');
assert.ok(lifecycle.includes("event.key === 'Escape'"), 'chooser must close on Escape');
assert.ok(lifecycle.includes("event.key !== 'Tab'"), 'chooser must handle Tab traversal');
assert.ok(lifecycle.includes('event.shiftKey'), 'chooser must contain reverse Tab traversal');
assert.ok(lifecycle.includes('triggerRef.current.focus()'), 'chooser must restore focus to its opener');
assert.ok(lifecycle.includes("document.addEventListener('pointerdown'"), 'chooser must dismiss on outside pointer interaction');
assert.ok(lifecycle.includes('isConnected'), 'chooser must avoid restoring focus to a removed opener');

console.log('download-chooser-a11y-regression passed');
