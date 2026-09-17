import React, { useEffect, useId, useRef, useState } from 'react';

export const ANDROID_DOWNLOAD_URL =
  'https://github.com/Kajin-0/Calcura-Site/releases/latest/download/Calcura.apk';
export const WEB_APP_URL = '/app/';

export const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m4.5 10.4 3.2 3.1 7.8-7.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Logo() {
  return (
    <a className="brand" href="/" aria-label="Calcura home">
      <span className="brand-mark">∫</span>
      <span>calcura</span>
    </a>
  );
}

export function DownloadChooser({ size = '', variant = 'secondary', shortLabel = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();
  const variantClass = variant === 'primary' ? 'button' : 'button button-secondary';
  const sizeClass = size === 'small' ? ' button-small' : '';

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const closeOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);

  return (
    <div className="download-chooser" ref={rootRef}>
      <button
        type="button"
        className={`${variantClass}${sizeClass}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        {shortLabel ? (
          <>
            <span className="chooser-label-full">Download Calcura</span>
            <span className="chooser-label-short">{shortLabel}</span>
          </>
        ) : (
          <>Download Calcura{variant === 'primary' ? <Arrow /> : null}</>
        )}
      </button>
      {open ? (
        <div id={panelId} role="dialog" aria-label="Get Calcura" className="download-chooser-panel">
          <p className="download-chooser-title">Get Calcura</p>
          <div className="download-chooser-options">
            <a className="download-chooser-option" href={WEB_APP_URL} onClick={() => setOpen(false)}>
              <strong>Install Web App</strong>
              <span>Desktop, iPhone, iPad, Android</span>
            </a>
            <a className="download-chooser-option" href={ANDROID_DOWNLOAD_URL} onClick={() => setOpen(false)}>
              <strong>Download Android APK</strong>
              <span>Native Android package</span>
            </a>
          </div>
          <p className="download-chooser-ios-note">On iPhone or iPad, open in Safari and choose Add to Home Screen.</p>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({ active = 'home' }) {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Logo />
        <nav className="primary-nav" aria-label="Primary navigation">
          <a className={active === 'home' ? 'active' : ''} href="/">Home</a>
          <a className={active === 'classroom' ? 'active' : ''} href="/classroom/">Classroom</a>
          <a className={active === 'contact' ? 'active' : ''} href="/contact/">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="button button-small nav-login" href={WEB_APP_URL}>
            <span className="nav-login-full">Login to Calcura</span>
            <span className="nav-login-short">Login</span>
          </a>
          <DownloadChooser size="small" shortLabel="Download" />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-inner">
        <Logo />
        <p>Free calculus practice for students. Classroom tools for educators.</p>
        <div>
          <a href="/">Home</a>
          <a href="/classroom/">Classroom</a>
          <a href="/contact/">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export function AppPreview() {
  return (
    <div className="hero-visual" aria-label="Illustration of the Calcura app">
      <div className="preview-orbit preview-orbit-one" />
      <div className="preview-orbit preview-orbit-two" />
      <div className="phone-shell">
        <div className="phone-camera" />
        <div className="phone-screen">
          <div className="app-topbar">
            <div><span className="eyebrow-mini">FREE PLAY</span><strong>Integration by Parts</strong></div>
            <div className="app-actions"><span>▤</span><span>⌁</span><span>↻</span></div>
          </div>
          <div className="app-label">EXPRESSION</div>
          <div className="math-card">
            <span className="math-large">∫</span>
            <span className="math-expression"><sup>1</sup>⁄<sub>4</sub> x sin(x) dx</span>
          </div>
          <div className="app-graph-card">
            <div className="graph-title-row">
              <div><strong>Integrand graph</strong><span>Original problem integrand</span></div>
              <span>×</span>
            </div>
            <div className="mini-equation">¼ x sin(x)</div>
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
      <div className="floating-progress">
        <div className="floating-progress-head">
          <div><strong>Learning Progress</strong><span>Last 7 days</span></div>
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

export function ClassroomPreview() {
  const rows = [
    ['M. Chen', '42', '83%', '76%', 'Today'],
    ['J. Rivera', '31', '68%', '51%', 'Today'],
    ['A. Patel', '58', '91%', '84%', 'Yesterday'],
    ['S. Brooks', '26', '73%', '62%', '2 days ago'],
  ];

  return (
    <>
      <div className="dashboard-shell">
        <div className="dashboard-sidebar">
          <Logo />
          <span className="dash-section-label">CLASSROOM</span>
          <strong>Overview</strong>
          <span>Students</span>
          <span>Progress</span>
          <span>Exports</span>
          <div className="seat-card"><span>Seats</span><strong>24 / 30</strong><div><i /></div></div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-title-row">
            <div><span>CALCURA CLASSROOM</span><h3>Calculus II: Section A</h3></div>
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
                {row.map((cell, index) => <span key={index}>{cell}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="classroom-mobile">
        <div className="classroom-mobile-head"><span>CALCURA CLASSROOM</span><strong>Calculus II: Section A</strong></div>
        <div className="classroom-mobile-stats">
          <div><strong>24</strong><span>students</span></div>
          <div><strong>486</strong><span>problems</span></div>
          <div><strong>71%</strong><span>independent</span></div>
        </div>
        <div className="classroom-mobile-roster">
          {rows.slice(0, 3).map((row) => (
            <div className="classroom-mobile-row" key={row[0]}><span>{row[0]}</span><strong>{row[2]}</strong></div>
          ))}
        </div>
      </div>
    </>
  );
}
