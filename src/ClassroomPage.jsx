import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './multipage.css';
import { Arrow, Check, SiteFooter, SiteHeader } from './siteShared.jsx';

const plans = [
  { name: 'Tutor', seats: '10 seats', price: '$39', period: '/mo' },
  { name: 'Small Team', seats: '30 seats', price: '$79', period: '/mo', featured: true },
  { name: 'Classroom', seats: '100 seats', price: '$199', period: '/mo' },
  { name: 'Institution', seats: '300–1,000+', price: 'Custom', period: '' },
];

function DashboardPreview() {
  const rows = [
    ['M. Chen', '42', '83%', '76%', 'Today'],
    ['J. Rivera', '31', '68%', '51%', 'Today'],
    ['A. Patel', '58', '91%', '84%', 'Yesterday'],
    ['S. Brooks', '26', '73%', '62%', '2 days ago'],
  ];

  return (
    <div className="dashboard-shell">
      <div className="dashboard-sidebar">
        <span className="dash-section-label">CLASSROOM</span>
        <strong>Overview</strong>
        <span>Students</span>
        <span>Progress</span>
        <span>Exports</span>
        <div className="seat-card">
          <span>Seats</span><strong>24 / 30</strong><div><i /></div>
        </div>
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
  );
}

function ClassroomPage() {
  return (
    <div className="classroom-page">
      <SiteHeader active="classroom" />
      <main>
        <section className="page-hero">
          <div className="shell page-hero-inner">
            <div className="eyebrow">CALCURA CLASSROOM</div>
            <h1>See how your students are actually practicing.</h1>
            <p>
              Calcura Classroom adds a browser-based instructor layer to the free student app: managed classes, seat controls, shared progress, and practice analytics without putting student practice behind a paywall.
            </p>
            <div className="page-hero-actions">
              <a className="button" href="/contact/">Request a pilot <Arrow /></a>
              <a className="button button-secondary" href="/">View student app</a>
            </div>
            <div className="classroom-hero-proof">
              <div><strong>Class codes</strong><span>Students opt into a managed class without losing independent practice.</span></div>
              <div><strong>Learning signals</strong><span>See completion, attempts, first-try success, and practice consistency.</span></div>
              <div><strong>Seat controls</strong><span>License the managed classroom layer rather than charging every student.</span></div>
            </div>
          </div>
        </section>

        <section className="section classroom-section">
          <div className="shell">
            <div className="section-heading classroom-heading">
              <div className="eyebrow">HOW IT WORKS</div>
              <h2>A simple classroom layer around the same student app.</h2>
              <p>Administration stays on the web. Students keep practicing in Calcura and join a class only when they want their progress shared with an instructor.</p>
            </div>
            <div className="classroom-flow">
              <div><strong>Create a class</strong><p>Instructor signs in on the web and receives a join code.</p></div>
              <div><strong>Students join</strong><p>Students enter the code in Calcura. One active student uses one seat.</p></div>
              <div><strong>Progress syncs</strong><p>Instructor sees roster-level and class-level learning metrics.</p></div>
            </div>
            <DashboardPreview />
            <div className="classroom-capabilities">
              <span>Class codes</span><span>Seat management</span><span>Student rosters</span><span>Progress sync</span><span>Class analytics</span><span>CSV export</span>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="shell">
            <div className="section-heading centered pricing-heading">
              <div className="eyebrow">PILOT PRICING</div>
              <h2>Simple seat plans.</h2>
              <p>Founding-pilot pricing for tutors, centers, classrooms, and institutions.</p>
            </div>
            <div className="pricing-grid">
              {plans.map((plan) => (
                <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                  <div><span className="plan-name">{plan.name}</span><strong className="seat-count">{plan.seats}</strong></div>
                  <div className="price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
                  <div className="price-features">
                    <span><Check /> Instructor web portal</span>
                    <span><Check /> Managed classroom seats</span>
                    <span><Check /> Shared progress analytics</span>
                  </div>
                  <a href="/contact/" className={`button ${plan.featured ? '' : 'button-secondary'} full-width`}>Request pilot <Arrow /></a>
                </article>
              ))}
            </div>
            <p className="pricing-footnote">Need 300, 500, 1,000, or unlimited seats? Institutional plans can be quoted around the deployment.</p>
          </div>
        </section>

        <section className="section pilot-section">
          <div className="shell pilot-panel">
            <div>
              <div className="eyebrow light">FOUNDING PILOT</div>
              <h2>Built for the first instructor and tutoring-center pilots.</h2>
              <p>Use the pilot to validate class setup, student joining, roster visibility, progress metrics, and the operational workflow before a broader rollout.</p>
            </div>
            <div className="pilot-actions">
              <a className="button button-white" href="/contact/">Request a pilot</a>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div className="section-heading"><div className="eyebrow">CLASSROOM FAQ</div><h2>The commercial model.</h2></div>
            <div className="faq-list">
              <details open><summary>What does a classroom seat represent?</summary><p>One active student participating in an organization’s managed Calcura environment. A seat is not the same thing as a download or device installation.</p></details>
              <details><summary>Does Calcura stop working if a class license ends?</summary><p>No. The student keeps the free app and local practice. Only the organization-linked classroom services end.</p></details>
              <details><summary>Is the instructor portal fully live?</summary><p>The front-end product direction is in place. Production authentication, cloud synchronization, billing, and backend services remain the implementation layer for the pilot.</p></details>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><ClassroomPage /></React.StrictMode>);
