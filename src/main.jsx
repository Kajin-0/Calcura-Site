import React, { useEffect, useId, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import { useDownloadChooserLifecycle } from './useDownloadChooserLifecycle';

const ANDROID_DOWNLOAD_URL =
  'https://github.com/Kajin-0/Calcura-Site/releases/latest/download/Calcura.apk';
const WEB_APP_URL = '/app/';
const PWA_INSTALL_URL = '/app/?install=1';

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

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearLocationHash() {
  if (!window.location.hash) return;
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}`,
  );
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return false;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  clearLocationHash();
  return true;
}

function onSamePageNavClick(event) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href === '#') return;
  const sectionId = decodeURIComponent(href.slice(1));
  if (!sectionId || !document.getElementById(sectionId)) return;
  event.preventDefault();
  scrollToSection(sectionId);
}

function useSamePageNavigation() {
  useEffect(() => {
    document.addEventListener('click', onSamePageNavClick);

    const rawHash = window.location.hash;
    let frameId = 0;
    if (rawHash.length > 1) {
      const sectionId = decodeURIComponent(rawHash.slice(1));
      frameId = window.requestAnimationFrame(() => {
        if (!scrollToSection(sectionId)) {
          clearLocationHash();
        }
      });
    }

    return () => {
      document.removeEventListener('click', onSamePageNavClick);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);
}

function DownloadChooser({ className = '', size = '', variant = 'secondary', shortLabel = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const triggerId = useId();
  const variantClass = variant === 'primary' ? 'button' : 'button button-secondary';
  const sizeClass = size === 'small' ? ' button-small' : '';
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const isIOS = typeof navigator !== 'undefined' && (
    /iPad|iPhone|iPod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
  const isAndroid = /Android/i.test(userAgent);
  const label = shortLabel ? (
    <>
      <span className="chooser-label-full">Download Calcura</span>
      <span className="chooser-label-short">{shortLabel}</span>
    </>
  ) : (
    <>Download Calcura{variant === 'primary' ? <Arrow /> : null}</>
  );

  const closeChooser = useDownloadChooserLifecycle({ open, setOpen, rootRef, triggerRef });

  return (
    <div className={`download-chooser${className ? ` ${className}` : ''}`} ref={rootRef}>
      <button
        type="button"
        id={triggerId}
        ref={triggerRef}
        className={`${variantClass}${sizeClass}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => (open ? closeChooser() : setOpen(true))}
      >
        {label}
      </button>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          className="download-chooser-panel"
        >
          <p id={`${panelId}-title`} className="download-chooser-title">Get Calcura</p>
          <div className="download-chooser-options">
            {isAndroid ? (
              <>
                <a className="download-chooser-option" href={PWA_INSTALL_URL} onClick={() => closeChooser({ restoreFocus: false })}>
                  <strong>Install web app</strong>
                  <span>Add Calcura to your device</span>
                </a>
                <a
                  className="download-chooser-option"
                  href={ANDROID_DOWNLOAD_URL}
                  onClick={() => closeChooser({ restoreFocus: false })}
                >
                  <strong>Download Android APK</strong>
                  <span>Native Android package</span>
                </a>
              </>
            ) : (
              <>
                <a className="download-chooser-option" href={PWA_INSTALL_URL} onClick={() => closeChooser({ restoreFocus: false })}>
                  <strong>Install web app</strong>
                  <span>{isIOS ? 'Then install from Safari' : 'Desktop, phone, and tablet'}</span>
                </a>
                {!isIOS ? (
                  <a
                    className="download-chooser-option"
                    href={ANDROID_DOWNLOAD_URL}
                    onClick={() => closeChooser({ restoreFocus: false })}
                  >
                    <strong>Download Android APK</strong>
                    <span>Native Android package</span>
                  </a>
                ) : null}
              </>
            )}
          </div>
          {isIOS ? (
            <div className="download-chooser-ios-note">
              <strong>Install on iPhone or iPad</strong>
              <span>Open Calcura in Safari, tap Share, then choose Add to Home Screen.</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AppPreview() {
  return (
    <div className="hero-visual" aria-label="Illustration of the Calcura app">
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
            <div className="app-actions">
              <span>▤</span><span>⌁</span><span>↻</span>
            </div>
          </div>

          <div className="app-label">EXPRESSION</div>
          <div className="math-card">
            <span className="math-large">∫</span>
            <span className="math-expression"><sup>1</sup>⁄<sub>4</sub> x sin(x) dx</span>
          </div>

          <div className="app-graph-card">
            <div className="graph-title-row">
              <div>
                <strong>Integrand graph</strong>
                <span>Original problem integrand</span>
              </div>
              <span>×</span>
            </div>
            <div className="mini-equation">¼ x sin(x)</div>
            <div className="mini-graph">
              <span className="axis axis-x" />
              <span className="axis axis-y" />
              <svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,90 C25,22 47,105 72,76 C94,49 110,91 134,70 C155,52 178,88 198,66 C221,39 236,110 259,75 C279,40 296,21 320,94" fill="none" stroke="currentColor" strokeWidth="2.5"/>
              </svg>
            </div>
          </div>
        </div>
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
        <small>Private progress stays on the device unless a student joins a class.</small>
      </div>
    </div>
  );
}

function GuidedPreview() {
  return (
    <div className="product-preview guided-preview">
      <div className="guided-head">
        <div><span>LINEAR U-SUB</span><strong>Step 1 <em>/ 5</em></strong></div>
        <span>▤ &nbsp; ↻ &nbsp; ×</span>
      </div>
      <div className="guided-progress"><span /></div>
      <div className="guided-equation">∫ e<sup>4x − 1</sup> dx</div>
      <div className="guided-instruction">Find the inner function <i>u</i>.</div>
      <div className="guided-answer">Enter your answer…</div>
      <div className="keyboard-row">
        <span>x</span><span>f(x)</span><span>u</span><span>dx</span><span>du</span>
      </div>
    </div>
  );
}

function GraphPreview() {
  return (
    <div className="product-preview graph-preview">
      <div className="modal-title">
        <div><strong>Integrand graph</strong><span>Original problem integrand</span></div>
        <b>×</b>
      </div>
      <div className="formula-chip">¼ x sin(x)</div>
      <div className="large-graph">
        <span className="grid-lines" />
        <span className="axis axis-x" />
        <span className="axis axis-y" />
        <svg viewBox="0 0 400 230" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,153 C28,31 60,190 95,137 C124,96 153,159 184,127 C216,95 242,170 270,124 C304,69 333,41 400,157" fill="none" stroke="currentColor" strokeWidth="3"/>
        </svg>
      </div>
      <span className="graph-help">Drag to pan. Pinch or scroll to zoom.</span>
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
        sin(a ± b) = <span>sin(a) cos(b) ± cos(a) sin(b)</span>
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

function App() {
  useSamePageNavigation();

  return (
    <div id="top">
      <header className="site-header">
        <div className="shell nav-shell">
          <Logo />
          <div className="nav-actions">
            <a className="button button-small nav-login" href={WEB_APP_URL}>
              <span className="nav-login-full">Login to Calcura</span>
              <span className="nav-login-short">Login</span>
            </a>
            <DownloadChooser size="small" shortLabel="Download" />
            <a className="button button-secondary button-small nav-instructor" href="/classroom/">Instructor Sign In</a>
          </div>
        </div>
      </header>

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

        <section className="section shell" id="features">
          <div className="section-heading narrow">
            <div className="eyebrow">BUILT FOR ACTIVE PRACTICE</div>
            <h2>Everything needed to work the problem, not just look up the answer.</h2>
            <p>Calcura keeps the learning loop focused: recognize the technique, do the mathematics, check the result, and understand what to practice next.</p>
          </div>

          <div className="feature-list">
            <article className="feature-row">
              <div className="feature-copy">
                <h3>Learn the technique step by step.</h3>
                <p>Guided Mode breaks a solution into explicit mathematical decisions. Students practice the structure of a method instead of memorizing a completed solution.</p>
                <div className="feature-tag"><StepsIcon /> Guided Mode</div>
              </div>
              <GuidedPreview />
            </article>

            <article className="feature-row reverse">
              <div className="feature-copy">
                <h3>See what the integrand is doing.</h3>
                <p>Open an integrand graph from the problem workspace, then pan and zoom without leaving the practice flow.</p>
                <div className="feature-tag"><GraphIcon /> Interactive graphing</div>
              </div>
              <GraphPreview />
            </article>

            <article className="feature-row">
              <div className="feature-copy">
                <h3>Keep the right reference close.</h3>
                <p>Use built-in identities and definitions when needed. The goal is to reduce context switching without turning practice into answer lookup.</p>
                <div className="feature-tag"><BookIcon /> Reference toolkit</div>
              </div>
              <ReferencePreview />
            </article>

            <article className="feature-row reverse">
              <div className="feature-copy">
                <h3>Track improvement with real practice signals.</h3>
                <p>Completion rate alone is not enough. Calcura also tracks first-attempt success, answer reveals, attempts, time, practice consistency, and skill-level evidence.</p>
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
              <h2>Calcura is free.</h2>
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

        <section className="section pilot-section">
          <div className="shell pilot-panel">
            <div>
              <div className="eyebrow light">CALCURA CLASSROOM</div>
              <h2>Instructor tools now have their own space.</h2>
              <p>
                Explore managed classes, seat plans, shared progress analytics, the instructor dashboard preview,
                pilot details, and classroom pricing on the dedicated Classroom page.
              </p>
            </div>
            <div className="pilot-actions">
              <a className="button button-white" href="/classroom/">Explore Classroom</a>
              <a className="button button-ghost-light" href="/contact/">Contact Calcura</a>
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

      <footer>
        <div className="shell footer-inner">
          <Logo />
          <p>Free calculus practice for students. Classroom tools for educators.</p>
          <div>
            <a href="#features">Features</a>
            <a href="/classroom/">Classroom</a>
            <a href="/contact/">Contact</a>
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
