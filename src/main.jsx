import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './multipage.css';
import { Arrow, Check, DownloadChooser, SiteFooter, SiteHeader, WEB_APP_URL } from './siteShared.jsx';

const features = [
  ['Guided solutions', 'Work through integration techniques one decision at a time instead of jumping directly to a final answer.'],
  ['Generated practice', 'Build fluency with varied integral problems instead of repeating the same fixed worksheet.'],
  ['Interactive graphs', 'Open the integrand graph while you work to connect symbolic manipulation with function behavior.'],
  ['Private progress', 'Track completion, attempts, first-try success, practice consistency, and skill-level evidence.'],
];

function StudentPreview() {
  return (
    <div className="hero-visual" aria-label="Preview of the Calcura practice experience">
      <div className="preview-orbit preview-orbit-one" />
      <div className="preview-orbit preview-orbit-two" />
      <div className="phone-shell">
        <div className="phone-camera" />
        <div className="phone-screen">
          <div className="app-topbar">
            <div>
              <span className="eyebrow-mini">FREE PLAY</span>
              <strong>Integration by Parts</strong>
            </div>
            <div className="app-actions"><span>▤</span><span>↻</span></div>
          </div>
          <div className="app-label">EXPRESSION</div>
          <div className="math-card">
            <span className="math-large">∫</span>
            <span className="math-expression"><sup>1</sup>⁄<sub>4</sub> x sin(x) dx</span>
          </div>
          <div className="app-graph-card">
            <div className="graph-title-row">
              <div><strong>Work the problem</strong><span>Guided or free-form practice</span></div>
            </div>
            <div className="mini-equation">u = x &nbsp;&nbsp; dv = ¼ sin(x) dx</div>
            <div className="mini-graph">
              <span className="axis axis-x" />
              <span className="axis axis-y" />
              <svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,90 C25,22 47,105 72,76 C94,49 110,91 134,70 C155,52 178,88 198,66 C221,39 236,110 259,75 C279,40 296,21 320,94" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
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
              <a className="button button-secondary" href={WEB_APP_URL}>Open Calcura</a>
            </div>
            <div className="hero-notes">
              <span><Check /> Free for students</span>
              <span><Check /> Offline-first</span>
              <span><Check /> Private progress</span>
            </div>
          </div>
          <StudentPreview />
        </section>

        <section className="proof-strip">
          <div className="shell proof-grid">
            <div><strong>Guided</strong><span>step-by-step practice</span></div>
            <div><strong>Free Play</strong><span>generated integral variety</span></div>
            <div><strong>Graphs</strong><span>visual intuition on demand</span></div>
            <div><strong>Progress</strong><span>private learning analytics</span></div>
          </div>
        </section>

        <section className="section feature-summary" id="features">
          <div className="shell">
            <div className="section-heading centered">
              <div className="eyebrow">BUILT FOR ACTIVE PRACTICE</div>
              <h2>A focused workspace for actually doing calculus.</h2>
              <p>Recognize the technique, work the mathematics, check the result, and understand what to practice next.</p>
            </div>
            <div className="feature-card-grid">
              {features.map(([title, text]) => (
                <article className="feature-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="free-section">
          <div className="shell free-layout">
            <div>
              <div className="eyebrow light">THE STUDENT APP STAYS FREE</div>
              <h2>Practice without a subscription.</h2>
            </div>
            <div className="free-copy">
              <p>
                Students can use Calcura independently without paying or joining an institution. Classroom licensing applies only when an educator wants managed classes, shared progress, and instructor visibility.
              </p>
              <div className="free-points">
                <span><Check /> Personal practice remains free</span>
                <span><Check /> Progress stays private unless a student joins a class</span>
                <span><Check /> Leaving a class never removes the free student app</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-classroom-teaser">
          <div className="shell home-classroom-grid">
            <div className="home-classroom-copy">
              <div className="eyebrow">FOR EDUCATORS</div>
              <h2>Calcura Classroom adds instructor visibility.</h2>
              <p>
                Create managed classes, invite students with a class code, track practice signals, and use seat-based plans without changing the free student experience.
              </p>
              <div className="page-hero-actions">
                <a className="button" href="/classroom/">Explore Classroom <Arrow /></a>
                <a className="button button-secondary" href="/contact/">Contact Calcura</a>
              </div>
            </div>
            <div className="home-classroom-card" aria-label="Classroom dashboard summary">
              <div className="eyebrow">CLASSROOM PREVIEW</div>
              <div className="home-classroom-card-grid">
                <div><span>Active students</span><strong>24</strong></div>
                <div><span>Problems completed</span><strong>486</strong></div>
                <div><span>Independent solve rate</span><strong>71%</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-short-faq">
          <div className="shell faq-layout">
            <div className="section-heading">
              <div className="eyebrow">QUICK FAQ</div>
              <h2>The essentials.</h2>
            </div>
            <div className="faq-list">
              <details open>
                <summary>Does a student have to pay for Calcura?</summary>
                <p>No. The personal student app is free. Paid plans apply to managed classroom services for educators and organizations.</p>
              </details>
              <details>
                <summary>Does Calcura work without joining a class?</summary>
                <p>Yes. Independent practice is the default. Joining a class is optional.</p>
              </details>
              <details>
                <summary>Where can educators learn more?</summary>
                <p>The Classroom page contains the instructor workflow, capabilities, pricing, and pilot information.</p>
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
              <a className="button button-secondary" href={WEB_APP_URL}>Open Calcura</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
);
