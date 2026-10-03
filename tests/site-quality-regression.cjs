#!/usr/bin/env node
// Site quality guardrails: the polish this site was rebuilt around, pinned so it cannot quietly rot.
//
//   1. Design tokens: every text/background pair we ship clears WCAG AA (4.5:1).
//   2. CSS hygiene: no sub-12px text, no stray !important, reduced-motion + focus-visible present.
//   3. Self-hosted fonts: no third-party font requests anywhere.
//   4. Document heads: title, description, canonical, social cards, icons, theme colour.
//   5. Rendered markup: landmarks, one h1, heading order, unique ids, valid references,
//      accessible names, decorative SVG hidden, safe external links, no placeholder text.
//   6. Link integrity: every internal href is a real route and every hash has a target.
//   7. Brand assets: icons and 1200x630 social cards exist; robots.txt and sitemap match canonicals.
//   8. Prerender is deterministic (hydration depends on it).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { renderPage, anchors, element, textOf, attr } = require('./helpers/render.cjs');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
let checks = 0;
function check(condition, message) {
  checks++;
  assert.ok(condition, message);
}

const cssFiles = fs.readdirSync(path.join(root, 'src', 'styles')).filter((name) => name.endsWith('.css'));
const css = Object.fromEntries(cssFiles.map((name) => [name, read(`src/styles/${name}`)]));
const allCss = Object.values(css).join('\n');

// --- 1. Tokens: contrast ---------------------------------------------------------------------
const tokens = {};
for (const match of css['tokens.css'].matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6});/gi)) tokens[match[1]] = match[2];
const channel = (value) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const contrast = (fg, bg) => {
  const [hi, lo] = [luminance(tokens[fg]), luminance(tokens[bg])].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};
const AA_PAIRS = [
  ['text', 'surface'], ['text', 'surface-alt'], ['text', 'surface-sunken'],
  ['text-muted', 'surface'], ['text-muted', 'surface-alt'], ['text-muted', 'surface-sunken'],
  ['text-subtle', 'surface'], ['text-subtle', 'surface-alt'], ['text-subtle', 'surface-sunken'],
  ['neutral', 'surface'],
  ['accent', 'surface'], ['accent', 'surface-alt'],
  ['accent-strong', 'surface'], ['accent-strong', 'accent-soft'],
  ['surface', 'accent'], ['surface', 'accent-strong'],
  ['on-dark', 'navy'], ['on-dark-muted', 'navy'], ['on-dark-muted', 'navy-2'], ['on-dark', 'ink'],
  ['positive', 'surface'], ['negative', 'surface'], ['ink', 'surface'],
];
for (const [fg, bg] of AA_PAIRS) {
  check(tokens[fg] && tokens[bg], `Token --${fg} and --${bg} must exist`);
  check(contrast(fg, bg) >= 4.5, `--${fg} on --${bg} must be at least 4.5:1 (got ${contrast(fg, bg).toFixed(2)})`);
}
// Plain --accent on --accent-soft is 4.47:1. Any chip on that tint must use --accent-strong.
for (const [file, source] of Object.entries(css)) {
  for (const rule of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (/background(?:-color)?:[^;]*accent-soft/.test(rule[2])) {
      check(!/(?:^|[;\s])color:\s*var\(--accent\)\s*;/.test(rule[2]), `${file}: "${rule[1].trim().slice(0, 60)}" puts --accent text on --accent-soft (use --accent-strong)`);
    }
  }
}

// --- 2. CSS hygiene -----------------------------------------------------------------------------
const customProps = {};
for (const match of allCss.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/gi)) customProps[match[1]] = match[2].trim();
function toPx(value, depth = 0) {
  const v = value.trim();
  if (depth > 4) return null;
  const variable = v.match(/^var\((--[a-z0-9-]+)\)$/i);
  if (variable) return customProps[variable[1]] ? toPx(customProps[variable[1]], depth + 1) : null;
  const clamp = v.match(/^clamp\(\s*([^,]+),/);
  if (clamp) return toPx(clamp[1], depth + 1);
  const fn = v.match(/^(max|min)\((.*)\)$/);
  if (fn) {
    const parts = fn[2].split(',').map((part) => toPx(part, depth + 1)).filter((px) => px !== null);
    if (!parts.length) return null;
    return fn[1] === 'max' ? Math.max(...parts) : Math.min(...parts);
  }
  const length = v.match(/^([\d.]+)(px|rem)$/);
  if (length) return Number(length[1]) * (length[2] === 'rem' ? 16 : 1);
  return null;
}
// The hero phone and its floating Learning Progress card are scaled replicas of the real app UI, so
// their type is deliberately small. That is allowed only because they are aria-hidden illustration
// described once by the wrapper's label (asserted against the rendered markup in section 5 below);
// they still may not go under 9px. Every other rule keeps the 12px floor.
const REPLICA_SELECTORS = [/^\.phone-/, /^\.floating-progress/, /^\.progress-metrics/];
const REPLICA_FLOOR_PX = 9;
for (const [file, source] of Object.entries(css)) {
  for (const rule of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = rule[1].split('*/').pop().split(',').map((selector) => selector.trim());
    const replica = selectors.every((selector) => REPLICA_SELECTORS.some((pattern) => pattern.test(selector)));
    const floor = replica ? REPLICA_FLOOR_PX : 12;
    for (const decl of rule[2].matchAll(/font-size:\s*([^;]+)/g)) {
      const value = decl[1].trim();
      const px = toPx(value);
      if (px !== null) check(px >= floor, `${file}: "${selectors[0]}" font-size ${value} resolves to ${px}px (minimum ${floor}px)`);
      const relative = value.match(/^([\d.]+)em$/);
      if (relative) check(Number(relative[1]) >= 1, `${file}: font-size ${value} shrinks text with no rem floor (wrap in max(..., 0.75rem))`);
    }
  }
}
for (const [file, source] of Object.entries(css)) {
  if (file !== 'base.css') check(!/!important/.test(source), `${file}: !important is reserved for the base reset`);
}
check(/prefers-reduced-motion:\s*reduce/.test(css['base.css']), 'Reduced-motion preference must be honoured');
check(/:focus-visible/.test(css['base.css']), 'Keyboard focus must have a visible style');
// An outline may be removed only (a) for the programmatic skip-link target (<main tabindex="-1">,
// not a control) or (b) when the same rule draws the shared focus ring instead.
for (const [file, source] of Object.entries(css)) {
  for (const rule of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/outline:\s*(?:none|0)\s*;/.test(rule[2])) continue;
    const selector = rule[1].trim().replace(/\s+/g, ' ').split('*/').pop().trim();
    const replaced = /box-shadow:\s*var\(--shadow-focus\)/.test(rule[2]);
    check(selector === 'main:focus' || replaced || /:focus:not\(:focus-visible\)$/.test(selector), `${file}: "${selector}" removes the focus outline without a visible replacement`);
  }
}
check(!/@import\s+url\(/.test(allCss), 'CSS must not import remote stylesheets');

// --- 3. Self-hosted fonts -----------------------------------------------------------------------
const htmlSources = { 'index.html': read('index.html'), 'classroom/index.html': read('classroom/index.html'), 'contact/index.html': read('contact/index.html'), '404.html': read('404.html') };
const srcFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(rel);
    else srcFiles.push(rel);
  }
})('src');
for (const [name, html] of Object.entries(htmlSources)) {
  check(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html), `${name} must not request Google Fonts`);
}
for (const file of srcFiles.filter((f) => /\.(css|jsx?)$/.test(f))) {
  check(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(read(file)), `${file} must not request Google Fonts`);
}
check(/@fontsource-variable\/inter/.test(css['fonts.css']) && /@fontsource\/stix-two-text/.test(css['fonts.css']), 'Inter and STIX Two Text must come from self-hosted packages');
check(/font-display:\s*swap|font-display/.test(read('node_modules/@fontsource-variable/inter/index.css')), 'Self-hosted fonts must declare font-display');

// --- 4. Document heads --------------------------------------------------------------------------
const CANONICALS = {
  'index.html': 'https://calcura.study/',
  'classroom/index.html': 'https://calcura.study/classroom/',
  'contact/index.html': 'https://calcura.study/contact/',
};
const meta = (html, key, value) => {
  const match = html.match(new RegExp(`<meta\\s+${key}="${value}"\\s+content="([^"]*)"`, 's')) || html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+${key}="${value}"`, 's'));
  return match ? match[1].replace(/\s+/g, ' ') : undefined;
};
for (const [name, canonical] of Object.entries(CANONICALS)) {
  const html = htmlSources[name];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  check(title && title.length >= 10 && title.length <= 70, `${name}: title must be 10-70 characters`);
  const description = meta(html, 'name', 'description');
  check(description && description.length >= 70 && description.length <= 200, `${name}: description must be 70-200 characters`);
  check(html.includes(`<link rel="canonical" href="${canonical}" />`), `${name}: canonical must be ${canonical}`);
  check(meta(html, 'property', 'og:url') === canonical, `${name}: og:url must match canonical`);
  check(meta(html, 'property', 'og:title') && meta(html, 'property', 'og:description'), `${name}: og:title and og:description required`);
  check(/^https:\/\/calcura\.study\/og-[a-z]+\.png$/.test(meta(html, 'property', 'og:image') || ''), `${name}: og:image must be an absolute calcura.study PNG`);
  check(meta(html, 'property', 'og:image:width') === '1200' && meta(html, 'property', 'og:image:height') === '630', `${name}: og:image dimensions must be declared`);
  check(meta(html, 'property', 'og:image:alt'), `${name}: og:image:alt required`);
  check(meta(html, 'name', 'twitter:card') === 'summary_large_image', `${name}: twitter card must be summary_large_image`);
  check(meta(html, 'name', 'twitter:image') === meta(html, 'property', 'og:image'), `${name}: twitter:image must match og:image`);
  check(meta(html, 'name', 'theme-color') === '#ffffff', `${name}: theme-color required`);
  check(/<html lang="en">/.test(html), `${name}: html lang required`);
  check(/<meta name="viewport" content="width=device-width, initial-scale=1.0" \/>/.test(html), `${name}: responsive viewport required`);
  check(/rel="icon"[^>]*favicon\.svg/.test(html) && /rel="apple-touch-icon"/.test(html), `${name}: icons required`);
  check((html.match(/<div id="root"><\/div>/g) || []).length === 1, `${name}: exactly one empty #root to prerender into`);
}
check(/<meta name="robots" content="noindex" \/>/.test(htmlSources['404.html']), '404 page must be noindex');
const jsonLd = htmlSources['index.html'].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check(jsonLd, 'Home must ship structured data');
const graph = JSON.parse(jsonLd[1])['@graph'];
check(graph.some((n) => n['@type'] === 'Organization') && graph.some((n) => n['@type'] === 'WebSite'), 'Structured data must describe the organization and website');
const app = graph.find((n) => n['@type'] === 'SoftwareApplication');
check(app && app.offers.price === '0' && app.offers.priceCurrency === 'USD', 'Structured data must state that the student app is free');

// --- 5 & 6. Rendered markup ---------------------------------------------------------------------
const PAGES = { home: '/', classroom: '/classroom/', contact: '/contact/', notFound: '/404.html' };
const rendered = Object.fromEntries(Object.keys(PAGES).map((key) => [key, renderPage(key)]));
const idsOf = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);

function stripAriaHidden(html) {
  let out = html;
  for (;;) {
    const open = /<([a-z0-9]+)\b[^>]*\saria-hidden="true"[^>]*?(\/?)>/.exec(out);
    if (!open) return out;
    if (open[2] === '/' || /\/>$/.test(open[0])) {
      out = out.slice(0, open.index) + out.slice(open.index + open[0].length);
      continue;
    }
    const tag = open[1];
    const tokensRe = new RegExp(`<${tag}\\b[^>]*?(/?)>|</${tag}>`, 'g');
    tokensRe.lastIndex = open.index + open[0].length;
    let depth = 1;
    let end = out.length;
    let token;
    while ((token = tokensRe.exec(out))) {
      if (token[0].startsWith('</')) depth -= 1;
      else if (token[1] !== '/') depth += 1;
      if (depth === 0) { end = token.index + token[0].length; break; }
    }
    out = out.slice(0, open.index) + out.slice(end);
  }
}

const idsByRoute = {};
for (const [key, html] of Object.entries(rendered)) idsByRoute[PAGES[key]] = new Set(idsOf(html));
const KNOWN_ROUTES = new Set(['/', '/classroom/', '/contact/', '/app/', '/404.html']);

for (const [key, html] of Object.entries(rendered)) {
  const label = `${key} page`;
  check((html.match(/<h1\b/g) || []).length === 1, `${label}: exactly one h1`);
  check((html.match(/<main\b/g) || []).length === 1 && /<main\b[^>]*\sid="main"/.test(html), `${label}: exactly one <main id="main">`);
  check((html.match(/<header\b/g) || []).length === 1, `${label}: exactly one header landmark`);
  check((html.match(/<footer\b/g) || []).length === 1, `${label}: exactly one footer landmark`);
  check(/<nav\b[^>]*aria-label="[^"]+"/.test(html), `${label}: navigation landmarks must be labelled`);
  check(anchors(html)[0]?.href === '#main', `${label}: the skip link must be the first focusable link`);

  // Heading order: never skip a level on the way down.
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  check(levels[0] === 1, `${label}: first heading must be the h1`);
  levels.forEach((level, index) => {
    if (index) check(level - levels[index - 1] <= 1, `${label}: heading order jumps from h${levels[index - 1]} to h${level}`);
  });

  // Ids and references.
  const ids = idsOf(html);
  check(new Set(ids).size === ids.length, `${label}: ids must be unique (${ids.filter((id, i) => ids.indexOf(id) !== i).join(', ')})`);
  for (const tag of html.matchAll(/<[a-z0-9]+\b[^>]*>/g)) {
    for (const name of ['aria-labelledby', 'aria-describedby']) {
      for (const ref of (attr(tag[0], name) || '').split(/\s+/).filter(Boolean)) check(ids.includes(ref), `${label}: ${name} points at missing id "${ref}"`);
    }
    const controls = attr(tag[0], 'aria-controls');
    if (controls && attr(tag[0], 'aria-expanded') !== 'false') check(ids.includes(controls), `${label}: aria-controls points at missing id "${controls}"`);
    const forId = attr(tag[0], 'for');
    if (forId) check(ids.includes(forId), `${label}: label for="${forId}" has no control`);
  }

  // Accessible names.
  for (const a of anchors(html)) check(a.text || a.ariaLabel, `${label}: link to ${a.href} has no accessible name`);
  for (const button of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    check(textOf(button[2]) || attr(button[1], 'aria-label'), `${label}: a button has no accessible name`);
  }
  for (const input of html.matchAll(/<(input|select|textarea)\b([^>]*)>/g)) {
    const attrs = input[2];
    if (/type="(?:hidden|submit)"/.test(attrs)) continue;
    const id = attr(attrs, 'id');
    const labelled = attr(attrs, 'aria-label') || attr(attrs, 'aria-labelledby') || (id && new RegExp(`<label\\b[^>]*for="${id}"`).test(html));
    check(labelled || attr(attrs, 'tabindex') === '-1', `${label}: a ${input[1]} has no label`);
  }
  for (const img of html.matchAll(/<img\b([^>]*)>/g)) check(attr(img[1], 'alt') !== undefined, `${label}: <img> needs alt text`);

  // Every SVG that survives removing aria-hidden regions must be an explicitly labelled image.
  for (const svg of stripAriaHidden(html).matchAll(/<svg\b([^>]*)>/g)) {
    check(attr(svg[1], 'role') === 'img' && attr(svg[1], 'aria-label'), `${label}: an <svg> is neither hidden nor labelled`);
  }
  // role="img" containers must carry a label.
  for (const tag of html.matchAll(/<[a-z0-9]+\b[^>]*\srole="img"[^>]*>/g)) check(attr(tag[0], 'aria-label'), `${label}: role="img" needs aria-label`);

  // The hero phone replica is exempt from the 12px text floor (see section 2) only while it is hidden
  // from assistive technology and described once by its wrapper.
  if (key === 'home') {
    const hero = element(html, 'div', 'class="hero-visual"');
    const heroOpen = (hero.match(/^<div\b[^>]*>/) || [''])[0];
    check(/\srole="img"/.test(heroOpen) && attr(heroOpen, 'aria-label'), 'home: .hero-visual must be one labelled role="img"');
    for (const cls of ['phone-shell', 'floating-progress']) {
      const open = (hero.match(new RegExp(`<div\\b[^>]*class="${cls}"[^>]*>`)) || [''])[0];
      check(/\saria-hidden="true"/.test(open), `home: .${cls} is a text-size-exempt replica and must be aria-hidden`);
    }
  }

  // Safe links.
  for (const a of anchors(html)) {
    check(a.href && a.href !== '#' && !/^javascript:/i.test(a.href), `${label}: unsafe or empty href "${a.href}"`);
    if (/^https?:/.test(a.href)) check(a.href.startsWith('https://'), `${label}: external links must use https (${a.href})`);
  }
  for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) check(/rel="[^"]*noopener/.test(tag[0]), `${label}: target=_blank needs rel=noopener`);

  // Placeholder / debug text must never ship.
  const text = textOf(html);
  check(!/lorem ipsum|TODO|FIXME|undefined|\bNaN\b|\[object |{{|}}/.test(text), `${label}: placeholder or debug text in rendered copy`);
  check(!/\s—\s—|\.\.\.\.|\s,\s|&amp;amp;/.test(html), `${label}: malformed punctuation or double-escaped entities`);
  check(!/<script\b/.test(html), `${label}: prerendered markup must not contain scripts`);

  // Link integrity.
  for (const a of anchors(html)) {
    if (/^https:/.test(a.href)) continue;
    const [pathAndQuery, hash] = a.href.split('#');
    const route = pathAndQuery.split('?')[0] || PAGES[key];
    if (pathAndQuery === '' ) {
      if (hash) check(idsByRoute[PAGES[key]].has(hash), `${label}: #${hash} has no target on this page`);
      continue;
    }
    check(KNOWN_ROUTES.has(route), `${label}: internal link to unknown route ${a.href}`);
    if (hash && idsByRoute[route]) check(idsByRoute[route].has(hash), `${label}: ${a.href} points at a missing section`);
  }
}

// Page identity.
check(/Practice integrals\./.test(textOf(element(rendered.home, 'h1'))), 'Home h1 must lead with the product promise');
check(/Questions, support, or classroom inquiries\./.test(textOf(element(rendered.contact, 'h1'))), 'Contact h1 must state the page purpose');
check(/\bClassroom\b/.test(textOf(element(rendered.classroom, 'h1'))), 'Classroom h1 must name the product');
check(/doesn.t exist/i.test(textOf(element(rendered.notFound, 'h1'))), '404 page must say the page does not exist');
check(anchors(element(rendered.notFound, 'main')).some((a) => a.href === '/'), '404 page must offer a way home');
for (const key of ['home', 'classroom', 'contact']) {
  check(element(rendered[key], 'header').includes('aria-current="page"'), `${key}: header must mark the current page`);
}

// --- 7. Brand assets ----------------------------------------------------------------------------
function pngSize(file) {
  const buffer = fs.readFileSync(path.join(root, file));
  check(buffer.subarray(1, 4).toString('ascii') === 'PNG', `${file} must be a PNG`);
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}
check(JSON.stringify(pngSize('public/og-home.png')) === '[1200,630]', 'og-home.png must be 1200x630');
check(JSON.stringify(pngSize('public/og-classroom.png')) === '[1200,630]', 'og-classroom.png must be 1200x630');
check(JSON.stringify(pngSize('public/apple-touch-icon.png')) === '[180,180]', 'apple-touch-icon.png must be 180x180');
check(JSON.stringify(pngSize('public/favicon-32.png')) === '[32,32]', 'favicon-32.png must be 32x32');
check(/<svg\b/.test(read('public/favicon.svg')), 'favicon.svg must be an SVG');
check(exists('public/CNAME') && read('public/CNAME').trim() === 'calcura.study', 'public/CNAME must keep the production domain');
const robots = read('public/robots.txt');
check(/User-agent:\s*\*/.test(robots) && /Sitemap:\s*https:\/\/calcura\.study\/sitemap\.xml/.test(robots), 'robots.txt must allow crawling and point at the sitemap');
const sitemap = [...read('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
check(JSON.stringify(sitemap) === JSON.stringify(Object.values(CANONICALS).sort()), 'sitemap.xml must list exactly the canonical pages');

// --- 8. Determinism -------------------------------------------------------------------------------
for (const key of Object.keys(PAGES)) check(renderPage(key) === rendered[key], `${key}: prerender must be deterministic (hydration depends on it)`);

console.log(`site-quality-regression passed (${checks} assertions)`);
