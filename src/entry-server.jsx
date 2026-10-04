import { renderToString } from 'react-dom/server';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';

// Server entry used by scripts/prerender.mjs and the test helpers. Pages are pure functions of
// their props and import no CSS, so the same components render on the server and hydrate on the client.
export const PAGES = {
  home: HomePage,
  classroom: ClassroomPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  notFound: NotFoundPage,
};

export function render(pageKey) {
  const Page = PAGES[pageKey];
  if (!Page) throw new Error(`Unknown page: ${pageKey}`);
  return renderToString(<Page />);
}
