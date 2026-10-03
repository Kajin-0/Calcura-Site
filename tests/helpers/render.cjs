'use strict';
// Test helper: render the real page components to static HTML (the same markup the prerender step
// ships), so tests assert on what visitors receive instead of grepping JSX source.
//
// esbuild is already present as Vite's bundler; the bundle is written to node_modules/.cache so
// nothing generated is ever tracked or committed.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', '..');
let bundle;

function load() {
  if (bundle) return bundle;
  const esbuild = require('esbuild');
  const outDir = path.join(root, 'node_modules', '.cache', 'site-tests');
  fs.mkdirSync(outDir, { recursive: true });
  const outfile = path.join(outDir, 'entry-server.cjs');
  esbuild.buildSync({
    entryPoints: [path.join(root, 'src', 'entry-server.jsx')],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    jsx: 'automatic',
    loader: { '.js': 'jsx', '.css': 'empty' },
    external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
    logLevel: 'silent',
  });
  bundle = require(outfile);
  return bundle;
}

/** Rendered markup for a page key: home | classroom | contact | notFound. */
function renderPage(key) {
  return load().render(key);
}

const decodeEntities = (value) =>
  value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, '\u00a0');

const textOf = (html) => decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

function attr(attributes, name) {
  const match = attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`));
  return match ? decodeEntities(match[1]) : undefined;
}

/** Every <a> in a fragment: { href, className, text, ariaLabel } (attribute order independent). */
function anchors(html) {
  const found = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    found.push({
      href: attr(match[1], 'href'),
      className: attr(match[1], 'class') || '',
      text: textOf(match[2]),
      ariaLabel: attr(match[1], 'aria-label'),
    });
  }
  return found;
}

/** First element matching an opening-tag regex, balanced on the same tag name. */
function element(html, tag, openPattern) {
  const open = new RegExp(`<${tag}\\b[^>]*${openPattern ? openPattern : ''}[^>]*>`, 'g');
  const start = open.exec(html);
  if (!start) return '';
  const tokens = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
  tokens.lastIndex = start.index + start[0].length;
  let depth = 1;
  let token;
  while ((token = tokens.exec(html))) {
    depth += token[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(start.index, token.index + token[0].length);
  }
  return html.slice(start.index);
}

module.exports = { renderPage, anchors, element, textOf, attr, decodeEntities, root };
