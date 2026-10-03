#!/usr/bin/env node
// Regenerates the raster brand assets in public/ from the sources in brand/.
//
// Playwright is intentionally NOT a dependency of this site. To re-run:
//   npm install --no-save playwright && npx playwright install chromium
//   node brand/render-assets.cjs
//
// Outputs: public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png,
//          public/og-home.png, public/og-classroom.png (1200x630)
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'favicon.svg'), path.join(publicDir, 'favicon.svg'));

  const browser = await chromium.launch();

  async function shoot({ url, width, height, scale = 1, out, transparent = false }) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(publicDir, out), omitBackground: transparent });
    await context.close();
    console.log(`wrote public/${out}`);
  }

  const svgPage = (file) => pathToFileURL(path.join(__dirname, file)).href;
  const card = (name) => `${pathToFileURL(path.join(__dirname, 'og-card.html')).href}?card=${name}`;

  await shoot({ url: svgPage('favicon.svg'), width: 32, height: 32, out: 'favicon-32.png', transparent: true });
  await shoot({ url: svgPage('apple-touch-icon.svg'), width: 180, height: 180, out: 'apple-touch-icon.png' });
  await shoot({ url: card('home'), width: 1200, height: 630, out: 'og-home.png' });
  await shoot({ url: card('classroom'), width: 1200, height: 630, out: 'og-classroom.png' });

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
