#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { renderPage, anchors, element } = require('./helpers/render.cjs');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const links = read('src/site/links.js');
const chooser = read('src/components/DownloadChooser.jsx');

assert.ok(links.includes("PWA_INSTALL_URL = '/app/?install=1'"), 'links.js must route install intent into the scoped PWA');
assert.ok(chooser.includes('PWA_INSTALL_URL'), 'chooser must send "Install web app" to the install-intent URL');
assert.ok(chooser.includes('Install web app'), 'chooser must identify the scoped web-app install path');
assert.ok(chooser.includes('Add Calcura to your device'), 'chooser must describe the Android web-app action');
assert.ok(chooser.includes('Download Android APK'), 'chooser must retain the Android APK option');
assert.ok(chooser.includes('Add to Home Screen'), 'chooser must retain iOS installation guidance');
assert.ok(links.includes("WEB_APP_URL = '/app/'"), 'login links must continue to open the app without install intent');
assert.ok(!chooser.includes('Install / Open Calcura'), 'chooser must not imply that opening equals installation');

// Login links (header, footer, hero, download panel) open the app WITHOUT install intent.
for (const key of ['home', 'classroom', 'contact']) {
  const html = renderPage(key);
  const appLinks = anchors(html).filter((a) => a.href && a.href.startsWith('/app/'));
  assert.ok(appLinks.length > 0, `${key} must link to the free web app`);
  assert.ok(
    appLinks.every((a) => a.href === '/app/'),
    `${key}: rendered links to the app must not carry install intent (only the chooser option does)`
  );
}

// The APK link must target the stable "latest release" asset, never a pinned version.
assert.ok(
  /ANDROID_DOWNLOAD_URL =\s*'https:\/\/github\.com\/Kajin-0\/Calcura-Site\/releases\/latest\/download\/Calcura\.apk'/.test(links),
  'Android download must resolve through the latest-release asset URL'
);

// The trigger is the only chooser surface in the closed state; it must be a real button.
const header = element(renderPage('home'), 'header');
assert.ok(/<button\b[^>]*aria-haspopup="dialog"[^>]*>/.test(header), 'header chooser trigger must be a button announcing a dialog');
assert.ok(!/role="dialog"/.test(header), 'chooser panel must not be rendered until opened');

console.log('pwa-install-entry-regression passed');
