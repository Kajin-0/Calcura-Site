import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

// Production pages are prerendered (see scripts/prerender.mjs) and hydrated here.
// During `vite dev` the root is empty, so it falls back to a normal client render.
export function mount(Page) {
  const container = document.getElementById('root');
  const tree = (
    <StrictMode>
      <Page />
    </StrictMode>
  );

  if (container.hasChildNodes()) {
    hydrateRoot(container, tree);
  } else {
    createRoot(container).render(tree);
  }
}
