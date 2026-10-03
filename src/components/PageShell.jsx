import SiteFooter from './SiteFooter.jsx';
import SiteHeader from './SiteHeader.jsx';
import { useSamePageNavigation } from '../site/useSamePageNavigation.js';

// Shared page frame: skip link, one header, one footer, one <main> landmark.
export default function PageShell({ active, pageClass = '', children }) {
  useSamePageNavigation();

  return (
    <div className={`page${pageClass ? ` ${pageClass}` : ''}`}>
      <a className="skip-link" href="#main" data-native-hash>Skip to main content</a>
      <SiteHeader active={active} />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}
