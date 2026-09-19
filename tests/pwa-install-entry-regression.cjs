#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

for (const file of ['src/main.jsx', 'src/siteShared.jsx']) {
  const source = read(file);
  assert.ok(source.includes("'/app/?install=1'"), `${file} must route install intent into the scoped PWA`);
  assert.ok(source.includes('Install / Open Calcura'), `${file} must distinguish install/open from a browser visit`);
  assert.ok(source.includes('Download Android APK'), `${file} must retain the Android APK option`);
  assert.ok(source.includes('Add to Home Screen'), `${file} must retain iOS installation guidance`);
  assert.ok(source.includes("WEB_APP_URL = '/app/'"), `${file} login links must continue to open the app without install intent`);
  assert.ok(!/href=\{WEB_APP_URL\}[\s\S]{0,120}<strong>Open Web App/.test(source));
}

console.log('pwa-install-entry-regression passed');
