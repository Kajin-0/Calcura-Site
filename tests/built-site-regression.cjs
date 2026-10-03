#!/usr/bin/env node
// Verifies the DEPLOYED ARTIFACT (dist/), not the source: run after `npm run build`.
//
//   - every page is prerendered (real content before any JavaScript runs)
//   - every script, stylesheet, preload, icon, and social image the HTML references exists
//   - 404.html works at any URL depth (all of its URLs are absolute)
//   - the prerendered markup is exactly what the components render (hydration cannot mismatch)
//   - bundle sizes stay inside a budget
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
assert.ok(fs.existsSync(dist), 'dist/ is missing: run `npm run build` before `npm run test:built-site`');
let checks = 0;
function check(condition, message) {
  checks++;
  assert.ok(condition, message);
}
const read = (file) => fs.readFileSync(path.join(dist, file), 'utf8');
const has = (file) => fs.existsSync(path.join(dist, file));

const PAGES = [
  { file: 'index.html', url: '/', h1: /Practice integrals\./ },
  { file: 'classroom/index.html', url: '/classroom/', h1: /Classroom/ },
  { file: 'contact/index.html', url: '/contact/', h1: /Questions, support, or classroom inquiries\./ },
  { file: '404.html', url: '/404.html', h1: /doesn.t exist/, absolute: true },
];

// Resolve a reference found in a page the way a browser would, to a path inside dist/.
function resolveReference(pageUrl, ref) {
  if (/^https:\/\/calcura\.study\//.test(ref)) return ref.replace('https://calcura.study/', '');
  if (/^[a-z]+:/i.test(ref)) return null; // external
  const base = new URL(`https://calcura.study${pageUrl}`);
  const url = new URL(ref, base);
  return decodeURIComponent(url.pathname.slice(1));
}

for (const page of PAGES) {
  const html = read(page.file);
  const label = page.file;

  // Prerendered content, not an empty shell.
  const rootMarkup = html.match(/<div id="root">([\s\S]*)<\/div>\s*(?:<\/body>)/);
  check(rootMarkup && rootMarkup[1].length > 3000, `${label}: #root must contain prerendered markup`);
  check(/<h1\b/.test(html) && page.h1.test(html.match(/<h1\b[\s\S]*?<\/h1>/)[0].replace(/<[^>]+>/g, ' ')), `${label}: prerendered h1 must match the page`);
  check(/<main\b[^>]*id="main"/.test(html), `${label}: prerendered main landmark`);
  check(!/<div id="root"><\/div>/.test(html), `${label}: root must not be empty`);

  // Every local reference resolves to a real file.
  const refs = [...html.matchAll(/\s(?:src|href)="([^"#]+)"/g)].map((m) => m[1]);
  const localRefs = refs.filter((ref) => !/^(?:https:\/\/(?!calcura\.study)|mailto:|tel:)/.test(ref));
  for (const ref of localRefs) {
    const target = resolveReference(page.url, ref);
    if (target === null) continue;
    // App links and page links are routes (directory index or a mounted app), not files.
    if (/^(?:app\/?|classroom\/?|contact\/?|)$/.test(target.split('?')[0])) continue;
    check(has(target) || has(path.join(target, 'index.html')), `${label}: reference "${ref}" does not resolve to a built file (${target})`);
  }

  // Metadata assets referenced as absolute production URLs must exist in the artifact.
  for (const image of html.matchAll(/(?:og|twitter):image"\s+content="(https:\/\/calcura\.study\/[^"]+)"|content="(https:\/\/calcura\.study\/[^"]+\.png)"/g)) {
    const url = image[1] || image[2];
    check(has(url.replace('https://calcura.study/', '')), `${label}: social image ${url} is missing from dist/`);
  }

  // Fonts: the critical Inter file is preloaded and exists; nothing is fetched from a third party.
  const preload = html.match(/<link rel="preload" href="([^"]+)" as="font" type="font\/woff2" crossorigin \/>/);
  check(preload, `${label}: critical font preload`);
  check(has(resolveReference(page.url, preload[1])), `${label}: preloaded font must exist (${preload[1]})`);
  check(!/fonts\.googleapis|fonts\.gstatic/.test(html), `${label}: no third-party font requests`);
  check(!/localhost|127\.0\.0\.1|\/src\/entries\//.test(html), `${label}: no dev-server references in the built page`);

  // Script + styles are wired.
  check(/<script type="module" crossorigin src="[^"]+\.js"><\/script>/.test(html), `${label}: module entry script`);
  check(/<link rel="stylesheet" crossorigin href="[^"]+\.css">/.test(html), `${label}: stylesheet`);

  if (page.absolute) {
    // 404.html is served at /anything/deep/inside, so no URL may be page-relative.
    const relative = [...html.matchAll(/\s(?:src|href)="(\.{1,2}\/[^"]*)"/g)].map((m) => m[1]);
    check(relative.length === 0, `${label}: URLs must be absolute for arbitrary-depth serving (found ${relative.join(', ')})`);
  }
}

// Prerendered markup must equal a fresh render of the same components (hydration safety).
const { renderPage } = require('./helpers/render.cjs');
for (const [file, key] of [['index.html', 'home'], ['classroom/index.html', 'classroom'], ['contact/index.html', 'contact'], ['404.html', 'notFound']]) {
  check(read(file).includes(`<div id="root">${renderPage(key)}</div>`), `${file}: prerendered markup must match the components exactly`);
}

// Static files that must ship.
for (const file of ['robots.txt', 'sitemap.xml', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'og-home.png', 'og-classroom.png', 'CNAME']) {
  check(has(file), `dist/${file} must ship`);
}
check(read('CNAME').trim() === 'calcura.study', 'dist/CNAME must keep the production domain');
for (const loc of read('sitemap.xml').matchAll(/<loc>https:\/\/calcura\.study(\/[^<]*)<\/loc>/g)) {
  check(has(path.join(loc[1].slice(1), 'index.html')) || (loc[1] === '/' && has('index.html')), `sitemap URL ${loc[1]} must be a built page`);
}

// Bundle budget (raw bytes). Generous but real: a framework swap or accidental import trips it.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const size = (pattern) => assets.filter((name) => pattern.test(name)).reduce((sum, name) => sum + fs.statSync(path.join(dist, 'assets', name)).size, 0);
check(size(/\.js$/) < 300 * 1024, `Total JavaScript must stay under 300 kB (got ${(size(/\.js$/) / 1024).toFixed(1)} kB)`);
check(size(/\.css$/) < 90 * 1024, `Total CSS must stay under 90 kB (got ${(size(/\.css$/) / 1024).toFixed(1)} kB)`);
check(!assets.some((name) => /\.map$/.test(name)), 'Source maps must not ship');
// Only latin Inter is on the critical path; the other subsets must stay lazy (unicode-range).
check(assets.some((name) => /^inter-latin-wght-normal-.+\.woff2$/.test(name)), 'Inter Latin must be bundled');
check(assets.some((name) => /^stix-two-text-latin-500-normal-.+\.woff2$/.test(name)), 'STIX Two Text must be bundled for maths');

console.log(`built-site-regression passed (${checks} assertions)`);
