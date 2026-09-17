import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './pages.css';
import { AppPreview, Arrow, Check, DownloadChooser, SiteFooter, SiteHeader, WEB_APP_URL } from './site-shell.jsx';

const featureCards = [
  {
    title: 'Guided solutions',
    text: 'Practice integration techniques one decision at a time instead of skipping directly to a final answer.',
  },
  {
    title: 'Generated practice',
    text: 'Work through varied integral forms in Free Play so pattern recognition grows with repetition.',
  },
  {
    title: 'Interactive graphs',
    text: 'Open the integrand graph from the problem workspace to connect symbolic work with function behavior.',
  },
  {
    title: 'Meaningful progress',
    text: 'Track completion, first-attempt success, practice consistency, time, attempts, and recommended focus areas.',
  },
];

function HomePage() {
  return (
    <div>
      <SiteHeader active="home" />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow">FREE CALCULUS PRACTICE</div>
            <h1>Practice integrals.<br /><span>Understand every step.</span></h1>
            <p>
              Calcura is a free calculus practice app built around guided problem solving, varied integral practice,
              interactive graphs, and private learning progress.
            </p>
            <div className="hero-actions">
              <DownloadChooser variant="primary" />
              <a className="button button-secondary" href={WEB_APP_URL}>Login to Calcura</a>
            </div>
            <div className="hero-actions hero-actions-secondary">
              <a className="hero-classroom-link" href="/classroom/">Explore Calcura Classroom</a>
            </div>
            <div className="hero-notes">
              <span><Check /> Free for students</span>
              <span><Check /> Offline-first</span>
              <span><Check /> Simple email sign-in</span>
            </div>
          </div>
          <AppPreview />
        </section>

        <section className="proof-strip">
          <div className="shell proof-grid">
            <div><strong>Guided</strong><span>step-by-step practice</span></div>
            <div><strong>Free Play</strong><span>generated integral variety</span></div>
            <div><strong>Graphs</strong><span>visual intuition on demand</span></div>
            <div><strong>Progress</strong><span>private learning analytics</span></div>
          </div>
        </section>

        <section className="section shell home-capabilities" id="features">
          <div className="section-heading narrow">
            <div className="eyebrow">BUILT FOR ACTIVE PRACTICE</div>
            <h2>Everything needed to work the problem, not just look up the answer.</h2>
            <p>Calcura keeps the learning loop focused: recognize the technique, do the mathematics, check the result, and understand what to practice next.</p>
          </div>
          <div className="home-feature-grid">
            {featureCards.map((feature, index) => (
              <article className="home-feature-card" key={feature.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="free-section" id="free">
          <div className="shell free-layout">
            <div>
              <div className="eyebrow light">THE STUDENT APP STAYS FREE</div>
              <h2>Calcura is free.<br />The classroom layer is the product.</h2>
            </div>
            <div className="free-copy">
              <p>
                Students can use Calcura independently without buying a subscription or joining an institution.
                Schools and tutoring organizations pay only when they want managed classes, shared progress, seat controls, and instructor visibility.
              </p>
              <div className="free-points">
                <span><Check /> Personal practice remains free</span>
                <span><Check /> Institutional seats apply only to managed classroom access</span>
                <span><Check /> Leaving a class never removes the free student app</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section classroom-teaser">
          <div className="shell classroom-teaser-layout">
            <div className="section-heading">
              <div className="eyebrow">CALCURA CLASSROOM</div>
              <h2>Visibility for instructors without changing the student practice experience.</h2>
              <p>
                Managed classes add rosters, seat controls, progress sync, classroom analytics, and instructor-facing reporting to the free Calcura app.
              </p>
              <a className="text-cta" href="/classroom/">Explore Calcura Classroom <Arrow /></a>
            </div>
            <div className="classroom-teaser-card" aria-label="Calcura Classroom summary">
              <div><span>ACTIVE STUDENTS</span><strong>24</strong></div>
              <div><span>PROBLEMS COMPLETED</span><strong>486</strong></div>
              <div><span>INDEPENDENT SOLVE RATE</span><strong>71%</strong></div>
              <p>Instructor portal preview · class-level and roster-level visibility</p>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div className="section-heading">
              <div className="eyebrow">FAQ</div>
              <h2>The essentials.</h2>
            </div>
            <div className="faq-list">
              <details open>
                <summary>Does a student have to pay for Calcura?</summary>
                <p>No. The personal student app is free. Institutional fees apply only to managed classroom access and instructor services.</p>
              </details>
              <details>
                <summary>Does Calcura work without joining a class?</summary>
                <p>Yes. Students can practice independently, keep local progress, and use the core learning experience without an institutional account.</p>
              </details>
              <details>
                <summary>Where can instructors learn more?</summary>
                <p>The Classroom page covers the instructor workflow, portal preview, proposed pilot pricing, and pilot inquiry path.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="shell download-panel">
            <div className="download-logo"><span>∫</span></div>
            <div>
              <span className="eyebrow">CALCURA FOR STUDENTS</span>
              <h2>Practice first. Paywalls never.</h2>
              <p>Free calculus practice on desktop, phone, and tablet.</p>
            </div>
            <div className="download-actions">
              <DownloadChooser />
              <a className="button button-secondary" href={WEB_APP_URL}>Login to Calcura</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
);
