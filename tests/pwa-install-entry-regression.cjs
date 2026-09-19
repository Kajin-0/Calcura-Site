#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

for (const file of ['src/main.jsx', 'src/siteShared.jsx']) {
  const source = read(file);
  assert.ok(source.includes("'/app/?install=1'"), `${file} must route install intent into the scoped PWA`);
  assert.ok(source.includes('Install web app'), `${file} must identify the scoped web-app install path`);
  assert.ok(source.includes('Add Calcura to your device'), `${file} must describe the Android web-app action`);
  assert.ok(source.includes('Download Android APK'), `${file} must retain the Android APK option`);
  assert.ok(source.includes('Add to Home Screen'), `${file} must retain iOS installation guidance`);
  assert.ok(source.includes("WEB_APP_URL = '/app/'"), `${file} login links must continue to open the app without install intent`);
  assert.ok(!source.includes('Install / Open Calcura'), `${file} must not imply that opening equals installation`);
}

console.log('pwa-install-entry-regression passed');
