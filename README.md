# Calcura Site

The public site for **Calcura**, served at [calcura.study](https://calcura.study).

| Route | Page |
|-------|------|
| `/` | Free student app: what it does, how to get it |
| `/classroom/` | Calcura Classroom for teachers (Teacher free, Pro $19/month or $149/year USD; Team, School, University planned) |
| `/contact/` | Contact form (Formspree) |
| `/404.html` | Not-found page (served by GitHub Pages at any depth) |
| `/app/` | The student web app (PWA build artifact, copied in; not edited here) |

The Classroom product itself lives at `classroom.calcura.study`; this site only links to its sign-in and sign-up.

## Develop

Node 22 (see `.nvmrc`).

```bash
npm ci
npm run dev        # Vite dev server
npm run build      # client build + SSR build + prerender into dist/
npm run preview    # serve dist/ exactly as built
```

`npm run build` prerenders every page to static HTML (`scripts/prerender.mjs`), so visitors, crawlers and link-preview bots get real content before any JavaScript runs. The client then hydrates that markup.

## Structure

```
index.html, classroom/, contact/, 404.html   Vite entry documents (heads, social cards, structured data)
src/
  entries/        one client entry per page + shared hydrate-or-create mount
  entry-server.jsx  server renderer used by prerendering and by the tests
  pages/          HomePage, ClassroomPage, ContactPage, NotFoundPage (+ home/ previews, contact/ form)
  components/     SiteHeader, SiteFooter, PageShell, DownloadChooser, Logo, Icons
  site/           links.js (every destination), chooser lifecycle hook, same-page navigation
  styles/         tokens, base, components, then one stylesheet per page
brand/            sources for the favicon, touch icon and social cards (+ render script)
public/           static files copied as-is (icons, social cards, robots.txt, sitemap.xml, CNAME, app/)
scripts/          prerender.mjs
tests/            regression suites (below)
```

Design tokens (colour, type, radii, shadows, layout, motion) live in `src/styles/tokens.css`. Fonts (Inter, STIX Two Text) are self-hosted through Fontsource; there are no third-party requests.

Destinations (app, install, APK, teacher sign-in and sign-up) are defined once in `src/site/links.js`.

## Tests

```bash
npm run test:classroom-entry         # teacher entry points, tiers, pricing, banned claims (on rendered HTML)
npm run test:download-chooser-a11y   # chooser dialog + PWA install routing
npm run test:site-quality            # contrast, font sizes, heads, landmarks, headings, ids, links, assets
npm run test:deployment-gates        # the workflows run every gate, in the right order
npm run build && npm run test:built-site   # the deployed artifact: prerender, asset paths, 404 depth, budgets
```

Source tests render the real components with esbuild (`tests/helpers/render.cjs`) and assert on the HTML visitors receive. `test:built-site` needs a fresh `dist/`.

## Deployment

`.github/workflows/deploy-pages.yml` runs the source gates, builds, runs the artifact gate, then publishes `dist/` to GitHub Pages. It runs only on pushes to `main` (and manual dispatch). `.github/workflows/check.yml` runs the same gates on pull requests.

If Pages is not configured, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## Brand assets

`public/favicon.svg` is hand-authored. The PNG icons and the two 1200×630 social cards are rendered from `brand/` with Playwright, which is deliberately not a dependency of this site:

```bash
npm install --no-save playwright
npx playwright install chromium
node brand/render-assets.cjs
```

Commit the regenerated files in `public/`.

## Related

Calcura application repository: https://github.com/Kajin-0/Calcura
