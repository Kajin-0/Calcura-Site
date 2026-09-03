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

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Calcura home">
      <span className="brand-mark">∫</span>
      <span>calcura</span>
    </a>
  );
}

function PhoneShot({ src, alt, className = '' }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-speaker" />
      <img src={src} alt={alt} />
    </div>
  );
}

function ClassroomPreview() {
  const students = [
    ['Student 01', '42', '83%', '76%'],
    ['Student 02', '31', '68%', '51%'],
    ['Student 03', '58', '91%', '84%'],
    ['Student 04', '26', '73%', '62%'],
  ];

  return (
    <div className="portal">
      <aside>
        <Logo />
        <span className="aside-label">CLASSROOM</span>
        <strong>Overview</strong>
        <span>Students</span>
        <span>Progress</span>
        <div className="seats">
          <small>Seats</small>
          <b>24 / 30</b>
          <i><em /></i>
        </div>
      </aside>

      <div className="portal-main">
        <div className="portal-head">
          <div>
            <small>CALCURA CLASSROOM</small>
            <h3>Calculus II — Section A</h3>
          </div>
          <span>PREVIEW</span>
        </div>

        <div className="portal-metrics">
          <div><small>Students</small><b>24</b></div>
          <div><small>Problems</small><b>486</b></div>
          <div><small>Independent</small><b>71%</b></div>
        </div>

        <div className="portal-table">
          <div className="portal-row portal-row-head">
            <span>Student</span><span>Problems</span><span>Complete</span><span>Independent</span>
          </div>
          {students.map((row) => (
            <div className="portal-row" key={row[0]}>
              {row.map((cell) => <span key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const plans = [
  ['Tutor', '10 seats', '$39', '/mo'],
  ['Small Team', '30 seats', '$79', '/mo'],
  ['Classroom', '100 seats', '$199', '/mo'],
  ['Institution', '300–1,000+', 'Custom', ''],
];

function App() {
  return (
    <div id="top">
      <header>
        <div className="shell nav">
          <Logo />
          <nav>
            <a href="#app">App</a>
            <a href="#classroom">Classroom</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <a className="nav-cta" href="#download">Get Calcura</a>
        </div>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <span className="eyebrow">FREE CALCULUS PRACTICE</span>
            <h1>Learn integrals<br />by doing them.</h1>
            <p>Guided steps, generated practice, graphs, and progress tracking. Free for students.</p>
            <div className="hero-actions">
              <a className="button" href="#download">Get Calcura <Arrow /></a>
              <a className="text-button" href="#classroom">For educators <Arrow /></a>
            </div>
            <div className="trust">
              <span><Check /> Free</span>
              <span><Check /> Offline-first</span>
              <span><Check /> No account required</span>
            </div>
          </div>

          <div className="hero-shot">
            <div className="hero-halo" />
            <PhoneShot
              src="./screens/freeplay.webp"
              alt="Calcura Free Play integration problem"
              className="hero-phone"
            />
            <div className="hero-chip hero-chip-one">
              <b>Free Play</b>
              <span>Generated practice</span>
            </div>
            <div className="hero-chip hero-chip-two">
              <b>Learning Progress</b>
              <span>Know what to practice next</span>
            </div>
          </div>
        </section>

        <section className="signal-strip">
          <div className="shell signals">
            <span>Guided practice</span>
            <span>Free Play</span>
            <span>Interactive graphs</span>
            <span>Learning progress</span>
          </div>
        </section>

        <section className="section shell" id="app">
          <div className="section-head">
            <span className="eyebrow">THE APP</span>
            <h2>Practice without the clutter.</h2>
          </div>

          <div className="showcase-grid">
            <article className="showcase showcase-guided">
              <div className="showcase-copy">
                <span>01</span>
                <h3>Guided, not given.</h3>
                <p>Work the method one step at a time.</p>
              </div>
              <div className="shot-stage">
                <PhoneShot src="./screens/guided.webp" alt="Calcura Guided Mode showing a linear u-substitution step" />
              </div>
            </article>

            <article className="showcase showcase-graph">
              <div className="showcase-copy">
                <span>02</span>
                <h3>See the function.</h3>
                <p>Open the integrand graph without leaving the problem.</p>
              </div>
              <div className="shot-stage">
                <PhoneShot src="./screens/graph.webp" alt="Calcura integrand graph modal" />
              </div>
            </article>
          </div>

          <div className="compact-features">
            <div>
              <b>Equivalent answers</b>
              <span>Checks the mathematics, not just a matching string.</span>
            </div>
            <div>
              <b>Built-in reference</b>
              <span>Keep identities and core formulas close.</span>
            </div>
            <div>
              <b>Progress signals</b>
              <span>Track completion, attempts, independence, and focus areas.</span>
            </div>
          </div>
        </section>

        <section className="free-band">
          <div className="shell free-band-inner">
            <div>
              <span className="eyebrow eyebrow-light">FOR STUDENTS</span>
              <h2>Calcura stays free.</h2>
            </div>
            <p>Schools pay for managed classes and instructor tools—not access to the math.</p>
          </div>
        </section>

        <section className="section shell classroom" id="classroom">
          <div className="classroom-intro">
            <div className="section-head">
              <span className="eyebrow">CALCURA CLASSROOM</span>
              <h2>The instructor side lives on the web.</h2>
              <p>Students keep using Calcura. Educators get the class view.</p>
            </div>
            <div className="classroom-points">
              <span><Check /> Class codes</span>
              <span><Check /> Roster + progress</span>
              <span><Check /> Seat controls</span>
            </div>
          </div>

          <ClassroomPreview />

          <p className="preview-note">Classroom is the next product layer. The dashboard above is a front-end preview.</p>
        </section>

        <section className="pricing" id="pricing">
          <div className="shell">
            <div className="section-head pricing-head">
              <span className="eyebrow">PILOT PRICING</span>
              <h2>Simple seat plans.</h2>
            </div>

            <div className="plans">
              {plans.map(([name, seats, price, period], index) => (
                <article className={index === 1 ? 'plan plan-featured' : 'plan'} key={name}>
                  <div>
                    <span className="plan-name">{name}</span>
                    <b className="plan-seats">{seats}</b>
                  </div>
                  <div className="plan-price">
                    <strong>{price}</strong>
                    <span>{period}</span>
                  </div>
                  <a href="#pilot">Pilot interest <Arrow /></a>
                </article>
              ))}
            </div>

            <p className="pricing-note">Need 300, 500, 1,000, or unlimited seats? Quote the deployment.</p>
          </div>
        </section>

        <section className="section shell" id="pilot">
          <div className="cta-panel">
            <div>
              <span className="eyebrow eyebrow-light">FOR EDUCATORS</span>
              <h2>Bring Calcura into a class.</h2>
              <p>Instructor accounts, sync, and billing are the next implementation step.</p>
            </div>
            <a className="button button-light" href="#top">Pilot interest <Arrow /></a>
          </div>
        </section>

        <section className="download shell" id="download">
          <div className="download-mark">∫</div>
          <div>
            <span className="eyebrow">CALCURA</span>
            <h2>Free for students.</h2>
            <p>Production download link will connect here.</p>
          </div>
          <span className="status">DOWNLOAD LINK TO CONNECT</span>
        </section>
      </main>

      <footer>
        <div className="shell footer">
          <Logo />
          <span>Free calculus practice. Classroom tools for educators.</span>
          <a href="#top">Back to top ↑</a>
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
