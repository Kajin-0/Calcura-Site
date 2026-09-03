import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m4.5 10.4 3.2 3.1 7.8-7.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GraphIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 19V5m0 14h16M7 15c2-5 4-7 6-5s3 4 7-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Zm3 2h6m-6 4h6m-6 4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProgressIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 18V9m5 9V5m5 13v-6m4 6H3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StepsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="6" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9 6h4a4 4 0 0 1 4 4v4m0 0-2-2m2 2 2-2M9 12h3M9 18h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Logo = () => (
  <a className="brand" href="#top" aria-label="Calcura home">
    <span className="brand-mark">∫</span>
    <span>calcura</span>
  </a>
);

function AppPreview() {
  return (
    <div className="hero-visual" aria-label="Calcura Free Play">
      <div className="preview-orbit preview-orbit-one" />
      <div className="preview-orbit preview-orbit-two" />

      <div className="phone-shell phone-shell-real">
        <div className="phone-camera" />
        <img
          className="phone-screen-image"
          src="./screens/freeplay.webp"
          alt="Calcura Free Play integration problem"
        />
      </div>

      <div className="floating-progress">
        <div className="floating-progress-head">
          <span className="floating-icon"><ProgressIcon /></span>
          <div>
            <strong>Learning Progress</strong>
            <span>Last 7 days</span>
          </div>
        </div>
        <div className="progress-metrics">
          <div><span>Completion</span><strong>85.6%</strong></div>
          <div><span>Practice</span><strong>8 days</strong></div>
        </div>
        <div className="progress-bar"><span /></div>
        <small>Progress stays private on the device.</small>
      </div>
    </div>
  );
}

function GuidedPreview() {
  return (
    <div className="product-preview real-shot-preview">
      <img
        src="./screens/guided.webp"
        alt="Calcura Guided Mode showing a linear u-substitution step"
      />
    </div>
  );
}

function GraphPreview() {
  return (
    <div className="product-preview real-shot-preview graph-shot-preview">
      <img
        src="./screens/graph.webp"
        alt="Calcura integrand graph modal"
      />
    </div>
  );
}

function ReferencePreview() {
  const angles = ['0','π/6','π/4','π/3','π/2'];
  return (
    <div className="product-preview reference-preview">
      <div className="reference-tabs"><strong>Trig</strong><span>Log / Exp</span><span>Hyperbolic</span></div>
      <span className="section-kicker">UNIT CIRCLE</span>
      <div className="unit-circle">
        <span className="circle-axis horizontal" />
        <span className="circle-axis vertical" />
        <span className="circle-dot d1" />
        <span className="circle-dot d2" />
        <span className="circle-dot d3" />
        <span className="circle-dot d4" />
        <b className="angle a1">0</b>
        <b className="angle a2">π/2</b>
        <b className="angle a3">π</b>
        <b className="angle a4">3π/2</b>
      </div>
      <div className="identity-line">
        sin(a ± b) = sin(a) cos(b) ± cos(a) sin(b)
      </div>
      <div className="reference-values">
        {angles.map((angle) => <span key={angle}>{angle}</span>)}
      </div>
    </div>
  );
}

function ProgressPreview() {
  return (
    <div className="product-preview progress-preview">
      <div className="range-tabs"><strong>7 Days</strong><span>30 Days</span><span>90 Days</span><span>All Time</span></div>
      <span className="section-kicker">AT A GLANCE</span>
      <div className="metric-grid">
        <div><span>Completion rate</span><strong>85.6%</strong></div>
        <div><span>Solved on first attempt</span><strong>10.5%</strong></div>
        <div><span>Practice days</span><strong>8</strong></div>
        <div><span>Total</span><strong>153</strong></div>
      </div>
      <div className="outcome-row">
        <span><i className="dot good">✓</i> Correct <strong>131</strong></span>
        <span><i className="dot bad">×</i> Incorrect <strong>16</strong></span>
        <span><i className="dot neutral">−</i> Abandoned <strong>6</strong></span>
      </div>
    </div>
  );
}

function ClassroomPreview() {
  const rows = [
    ['Student 01', '42', '83%', '76%', 'Today'],
    ['Student 02', '31', '68%', '51%', 'Today'],
    ['Student 03', '58', '91%', '84%', 'Yesterday'],
    ['Student 04', '26', '73%', '62%', '2 days ago'],
  ];

  return (
    <div className="dashboard-shell">
      <div className="dashboard-sidebar">
        <Logo />
        <span className="dash-section-label">CLASSROOM</span>
        <strong>Overview</strong>
        <span>Students</span>
        <span>Progress</span>
        <span>Exports</span>
        <div className="seat-card">
          <span>Seats</span>
          <strong>24 / 30</strong>
          <div><i /></div>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-title-row">
          <div><span>CALCURA CLASSROOM</span><h3>Calculus II — Section A</h3></div>
          <span className="preview-badge">PORTAL PREVIEW</span>
        </div>
        <div className="dashboard-cards">
          <div><span>Active students</span><strong>24</strong></div>
          <div><span>Problems completed</span><strong>486</strong></div>
          <div><span>Independent solve rate</span><strong>71%</strong></div>
        </div>
        <div className="student-table">
          <div className="student-table-head"><span>Student</span><span>Problems</span><span>Completion</span><span>Independent</span><span>Last active</span></div>
          {rows.map((row) => (
            <div className="student-table-row" key={row[0]}>
              {row.map((cell, i) => <span key={i}>{cell}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const plans = [
  { name: 'Tutor', seats: '10 seats', price: '$39', period: '/ month', text: 'For independent tutors and very small groups.' },
  { name: 'Small Team', seats: '30 seats', price: '$79', period: '/ month', text: 'For tutoring centers and compact programs.', featured: true },
  { name: 'Classroom', seats: '100 seats', price: '$199', period: '/ month', text: 'For course sections and larger programs.' },
  { name: 'Institution', seats: '300–1,000+ seats', price: 'Custom', period: '', text: 'Annual plans for departments, campuses, and larger deployments.' },
];

function App() {
  return (
    <div id="top">
      <header className="site-header">
        <div className="shell nav-shell">
          <Logo />
          <nav aria-label="Primary navigation">
            <a href="#features">Features</a>
            <a href="#free">Free for students</a>
            <a href="#classroom">Classroom</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="nav-actions">
            <a className="text-link" href="#classroom">Instructor portal</a>
            <a className="button button-small" href="#download">Get Calcura free <Arrow /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow">FREE CALCULUS PRACTICE</div>
            <h1>Practice integrals.<br /><span>Understand every step.</span></h1>
            <p>
              Free calculus practice with guided steps, varied integrals, interactive graphs, and private progress tracking.
            </p>
            <div className="hero-actions">
              <a className="button" href="#download">Get Calcura free <Arrow /></a>
              <a className="button button-secondary" href="#classroom">Explore Calcura Classroom</a>
            </div>
            <div className="hero-notes">
              <span><Check /> Free for students</span>
              <span><Check /> Offline-first</span>
              <span><Check /> No account required for personal use</span>
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

        <section className="section shell" id="features">
          <div className="section-heading narrow">
            <div className="eyebrow">BUILT FOR ACTIVE PRACTICE</div>
            <h2>Work the problem—not just the answer.</h2>
            <p>Recognize the technique, do the mathematics, check the result, and keep moving.</p>
          </div>

          <div className="feature-list">
            <article className="feature-row">
              <div className="feature-copy">
                <span className="feature-number">01</span>
                <h3>Learn the technique step by step.</h3>
                <p>Guided Mode turns a method into a sequence of mathematical decisions.</p>
                <div className="feature-tag"><StepsIcon /> Guided Mode</div>
              </div>
              <GuidedPreview />
            </article>

            <article className="feature-row reverse">
              <div className="feature-copy">
                <span className="feature-number">02</span>
                <h3>See what the integrand is doing.</h3>
                <p>Open the integrand graph, then pan and zoom without leaving the problem.</p>
                <div className="feature-tag"><GraphIcon /> Interactive graphing</div>
              </div>
              <GraphPreview />
            </article>

            <article className="feature-row">
              <div className="feature-copy">
                <span className="feature-number">03</span>
                <h3>Keep the right reference close.</h3>
                <p>Keep identities and definitions close without leaving the practice flow.</p>
                <div className="feature-tag"><BookIcon /> Reference toolkit</div>
              </div>
              <ReferencePreview />
            </article>

            <article className="feature-row reverse">
              <div className="feature-copy">
                <span className="feature-number">04</span>
                <h3>Track improvement with real practice signals.</h3>
                <p>Track completion, first-attempt success, attempts, time, consistency, and skill-level evidence.</p>
                <div className="feature-tag"><ProgressIcon /> Learning Progress</div>
              </div>
              <ProgressPreview />
            </article>
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
                Students use Calcura free. Schools and tutoring organizations pay only for managed classes, shared progress, seats, and instructor visibility.
              </p>
              <div className="free-points">
                <span><Check /> Personal practice remains free</span>
                <span><Check /> Institutional seats apply only to managed classroom access</span>
                <span><Check /> Leaving a class never removes the free student app</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section classroom-section" id="classroom">
          <div className="shell">
            <div className="classroom-top">
              <div className="section-heading classroom-heading">
                <div className="eyebrow">CALCURA CLASSROOM</div>
                <h2>A web dashboard for instructors.</h2>
                <p>
                  Instructors manage classes and seats in the browser. Students keep practicing in Calcura and join with a class code.
                </p>
              </div>
              <div className="pilot-note">
                <span>PILOT STATUS</span>
                <strong>Front-end preview</strong>
                <p>Authentication, sync, billing, and the production backend come next.</p>
              </div>
            </div>

            <div className="classroom-flow">
              <div><span>1</span><strong>Create a class</strong><p>Create a class and get a join code.</p></div>
              <div><span>2</span><strong>Students join</strong><p>Students enter the code in Calcura.</p></div>
              <div><span>3</span><strong>Progress syncs</strong><p>See roster and class-level progress.</p></div>
            </div>

            <ClassroomPreview />

            <div className="classroom-capabilities">
              <span>Class codes</span>
              <span>Seat management</span>
              <span>Student rosters</span>
              <span>Progress sync</span>
              <span>Class analytics</span>
              <span>CSV export</span>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="shell">
            <div className="section-heading centered pricing-heading">
              <div className="eyebrow">EARLY-ACCESS CLASSROOM PRICING</div>
              <h2>Simple seat tiers. Free app for everyone else.</h2>
              <p>Proposed founding-pilot tiers.</p>
            </div>
            <div className="pricing-grid">
              {plans.map((plan) => (
                <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                  {plan.featured && <span className="price-badge">GOOD FOR SMALL CENTERS</span>}
                  <div>
                    <span className="plan-name">{plan.name}</span>
                    <strong className="seat-count">{plan.seats}</strong>
                  </div>
                  <div className="price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
                  <p>{plan.text}</p>
                  <div className="price-features">
                    <span><Check /> Instructor web portal</span>
                    <span><Check /> Managed classroom seats</span>
                    <span><Check /> Shared progress analytics</span>
                  </div>
                  <a href="#pilot" className={`button ${plan.featured ? '' : 'button-secondary'} full-width`}>
                    Request pilot <Arrow />
                  </a>
                </article>
              ))}
            </div>
            <p className="pricing-footnote">
              Need 300, 500, 1,000, or unlimited seats? Institutional plans can be quoted around the deployment instead of forcing a fixed public tier.
            </p>
          </div>
        </section>

        <section className="section pilot-section" id="pilot">
          <div className="shell pilot-panel">
            <div>
              <div className="eyebrow light">FOUNDING PILOT</div>
              <h2>Ready for the first instructor and tutoring-center pilots.</h2>
              <p>
                Next: connect instructor accounts, sync, billing, and the pilot contact flow.
              </p>
            </div>
            <div className="pilot-actions">
              <a className="button button-white" href="https://github.com/Kajin-0/Calcura" target="_blank" rel="noreferrer">View Calcura on GitHub <Arrow /></a>
              <a className="button button-ghost-light" href="#top">Back to top</a>
            </div>
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="shell download-panel">
            <div className="download-logo"><span>∫</span></div>
            <div>
              <span className="eyebrow">CALCURA FOR STUDENTS</span>
              <h2>Practice first. Paywalls never.</h2>
              <p>Production download link will connect here.</p>
            </div>
            <span className="download-status">DOWNLOAD LINK TO CONNECT</span>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <Logo />
          <p>Free calculus practice for students. Classroom tools for educators.</p>
          <div>
            <a href="#features">Features</a>
            <a href="#classroom">Classroom</a>
            <a href="https://github.com/Kajin-0/Calcura" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
