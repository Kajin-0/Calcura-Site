import { Arrow } from '../components/Icons.jsx';
import PageShell from '../components/PageShell.jsx';
import { WEB_APP_URL } from '../site/links.js';

export default function NotFoundPage() {
  return (
    <PageShell active="" pageClass="page-not-found">
      <section className="not-found" aria-labelledby="not-found-title">
        <div className="shell not-found-inner">
          <p className="not-found-code" aria-hidden="true">404</p>
          <h1 id="not-found-title">This page doesn&rsquo;t exist.</h1>
          <p>The link may be out of date, or the address may have been mistyped.</p>
          <div className="not-found-actions">
            <a className="button" href="/">Back to Calcura <Arrow /></a>
            <a className="button button-secondary" href="/classroom/">Calcura Classroom</a>
            <a className="button button-secondary" href={WEB_APP_URL}>Open the student app</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
