import PageShell from '../../components/PageShell.jsx';

export default function LegalPage({ title, intro, children }) {
  return (
    <PageShell pageClass="page-legal">
      <section className="page-hero page-hero--compact" aria-labelledby="legal-title">
        <div className="shell">
          <div className="eyebrow">Calcura</div>
          <h1 id="legal-title">{title}</h1>
          <p className="page-hero-text">{intro}</p>
          <p className="legal-effective">Effective date: <time dateTime="2026-10-04">October 4, 2026</time></p>
        </div>
      </section>
      <article className="shell legal-content" aria-label={title}>
        {children}
      </article>
    </PageShell>
  );
}
