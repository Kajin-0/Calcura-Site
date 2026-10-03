// Post-build step: render each page to static HTML and inject it into the built document.
// The client bundle then hydrates the markup (src/entries/mount.jsx), so visitors, crawlers,
// and link-preview bots all get real content before any JavaScript runs.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

const { render } = await import(pathToFileURL(path.join(root, '.ssr', 'entry-server.js')).href);

const PAGES = [
  { file: 'index.html', key: 'home' },
  { file: 'classroom/index.html', key: 'classroom' },
  { file: 'contact/index.html', key: 'contact' },
  { file: '404.html', key: 'notFound', absoluteAssets: true },
];

const EMPTY_ROOT = '<div id="root"></div>';

const assets = await readdir(path.join(dist, 'assets'));
// Only the Latin Inter file is on the critical path (all body copy); everything else loads lazily.
const interLatin = assets.find((name) => /^inter-latin-wght-normal-.+\.woff2$/.test(name));
if (!interLatin) throw new Error('Expected a built Inter Latin variable font in dist/assets');
const preloadLink = (prefix) =>
  `<link rel="preload" href="${prefix}assets/${interLatin}" as="font" type="font/woff2" crossorigin />`;

for (const page of PAGES) {
  const target = path.join(dist, page.file);
  let html = await readFile(target, 'utf8');

  if (!html.includes(EMPTY_ROOT)) {
    throw new Error(`${page.file}: expected an empty #root to prerender into`);
  }

  // 404.html is served for arbitrary depths (/a/b/c), so none of its URLs (scripts, styles, icons)
  // may be page-relative. Rewrite the template before any rendered copy is injected.
  if (page.absoluteAssets) html = html.replaceAll('"./', '"/');

  // Same prefix Vite used for this page's own assets, so the preload always matches a real file.
  const depth = page.file.split('/').length - 1;
  const prefix = page.absoluteAssets ? '/' : depth === 0 ? './' : '../'.repeat(depth);

  const markup = render(page.key);
  // Function replacers: rendered copy contains "$" (prices) which String.replace would treat specially.
  html = html.replace(EMPTY_ROOT, () => `<div id="root">${markup}</div>`);
  html = html.replace('</head>', () => `    ${preloadLink(prefix)}\n  </head>`);

  await writeFile(target, html);
  console.log(`prerendered ${page.file} (${markup.length.toLocaleString('en-US')} bytes of markup)`);
}
