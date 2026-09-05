# Calcura Site

Public marketing site and educator-facing product scaffold for **Calcura**.

## Current scope

The site currently includes:

- product marketing for the free Calcura student app;
- guided practice, graphing, reference, and learning-progress previews;
- a Calcura Classroom product section;
- a browser-based instructor dashboard concept;
- seat-based early-access pricing;
- responsive desktop/mobile layouts;
- GitHub Pages deployment workflow.

The student app remains free in the proposed commercial model. Paid seats apply only to the managed **Calcura Classroom** layer.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Pull requests run the same production build with a 10-minute timeout.

## Deployment

`.github/workflows/deploy-pages.yml` builds and deploys `dist/` to GitHub Pages after changes land on `main`.

If GitHub Pages is not already configured for the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## Product placeholders still to connect

The front end intentionally does **not** pretend that infrastructure exists yet. Before the site can accept real instructor customers, connect:

1. a sales/pilot contact destination;
2. instructor authentication;
3. organization/class/seat backend;
4. student progress synchronization from Calcura;
5. payment/billing;
6. production instructor portal data.

The dashboard shown on the marketing page uses clearly labeled demo data.

## Related project

Calcura application repository: https://github.com/Kajin-0/Calcura
