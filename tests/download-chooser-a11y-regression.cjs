#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const lifecycle = read('src/site/useDownloadChooserLifecycle.js');

// One chooser component now serves every page, so the whole contract is pinned on it once.
const chooserFile = 'src/components/DownloadChooser.jsx';
const chooser = read(chooserFile);
assert.ok(chooser.includes('useDownloadChooserLifecycle'), `${chooserFile} must use shared chooser lifecycle`);
assert.ok(chooser.includes('aria-modal="true"'), `${chooserFile} chooser must be modal to assistive technology`);
assert.ok(chooser.includes('aria-labelledby'), `${chooserFile} chooser must retain an accessible title`);
assert.ok(chooser.includes('triggerRef'), `${chooserFile} chooser must retain its opener`);
assert.ok(chooser.includes('restoreFocus: false'), `${chooserFile} links must avoid stealing focus during navigation`);
assert.ok(chooser.includes('aria-expanded'), `${chooserFile} trigger must expose its expanded state`);
assert.ok(chooser.includes('aria-controls'), `${chooserFile} trigger must reference its panel`);
assert.ok(chooser.includes('aria-haspopup="dialog"'), `${chooserFile} trigger must announce that it opens a dialog`);

// No page may ship its own copy of the chooser: a second copy is where accessibility drifts.
for (const file of ['src/components/SiteHeader.jsx', 'src/pages/HomePage.jsx', 'src/pages/ClassroomPage.jsx', 'src/pages/ContactPage.jsx']) {
  assert.ok(!read(file).includes('aria-modal'), `${file} must use the shared DownloadChooser instead of its own dialog`);
}
for (const file of ['src/components/SiteHeader.jsx', 'src/pages/HomePage.jsx']) {
  assert.ok(read(file).includes('DownloadChooser'), `${file} must expose the shared DownloadChooser`);
}

assert.ok(lifecycle.includes("first?.focus()"), 'chooser must focus the first option on open');
assert.ok(lifecycle.includes("event.key === 'Escape'"), 'chooser must close on Escape');
assert.ok(lifecycle.includes("event.key !== 'Tab'"), 'chooser must handle Tab traversal');
assert.ok(lifecycle.includes('event.shiftKey'), 'chooser must contain reverse Tab traversal');
assert.ok(lifecycle.includes('triggerRef.current.focus()'), 'chooser must restore focus to its opener');
assert.ok(lifecycle.includes("document.addEventListener('pointerdown'"), 'chooser must dismiss on outside pointer interaction');
assert.ok(lifecycle.includes('element.isConnected'), 'chooser must be able to tell whether its opener is still in the document');
// The guard must actually gate the focus restore, not merely exist as an unused helper.
assert.ok(
  /restoreFocusRef\.current\s*&&\s*isConnected\(triggerRef\.current\)[\s\S]{0,80}triggerRef\.current\.focus\(\)/.test(lifecycle),
  'chooser must only restore focus to an opener that is still connected'
);

console.log('download-chooser-a11y-regression passed');
