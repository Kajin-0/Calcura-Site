import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import '../refinements.css';
import '../pages.css';
import { Arrow, Check, ClassroomPreview, SiteFooter, SiteHeader } from '../site-shell.jsx';

const plans = [
  { name: 'Tutor', seats: '10 seats', price: '$39', period: '/ month', text: 'For independent tutors and very small groups.' },
  { name: 'Small Team', seats: '30 seats', price: '$79', period: '/ month', text: 'For tutoring centers and compact programs.', featured: true },
  { name: 'Classroom', seats: '100 seats', price: '$199', period: '/ month', text: 'For course sections and larger programs.' },
  { name: 'Institution', seats: '300–1,000+ seats', price: 'Custom', period: '', text: 'Annual plans for departments, campuses, and larger deployments.' },
];

function ClassroomPage() {
  return (
    <div>
      <SiteHeader active="classroom" />
      <main>
        <section className="page-hero shell classroom-page-hero">
          <div className="page-hero-copy">
            <div className="eyebrow">CALCURA CLASSROOM</div>
            <h1>See how your students are actually practicing.</h1>
            <p>
              Calcura Classroom adds managed classes, seat controls, roster visibility, progress sync, and instructor analytics around the free student app.
            </p>
            <div className="hero-actions">
              <a className="button" href="/contact/">Request a pilot <Arrow /></a>
              <a className="button button-secondary" href="/#features">Explore the student app</a>
            </div>
          </div>
          <div className="classroom-hero-proof">
            <span>PILOT PRODUCT</span>
            <strong>Free app for students.<br />Managed visibility for educators.</strong>
            <p>The instructor layer remains browser-based while students continue practicing in Calcura.</p>
          </div>
        </section>

        <section className="section classroom-section">
          <div className="shell">
            <div className="section-heading classroom-heading">
              <div className="eyebrow">HOW IT WORKS</div>
              <h2>A lightweight classroom layer around the student experience.</h2>
            </div>
            <div className="classroom-flow">
              <div><strong>Create a class</strong><p>Instructor signs in on the web and receives a join code for the course or tutoring group.</p></div>
              <div><strong>Students join</strong><p>Students enter the class code in Calcura. One active student uses one managed seat.</p></div>
              <div><strong>Progress syncs</strong><p>Instructor sees roster-level and class-level learning metrics without changing the core practice flow.</p></div>
            </div>
          </div>
        </section>

        <section className="section classroom-preview-section">
          <div className="shell">
            <div className="section-heading centered classroom-preview-heading">
              <div className="eyebrow">INSTRUCTOR PORTAL PREVIEW</div>
              <h2>Class-level visibility without turning practice into surveillance.</h2>
              <p>The product direction focuses on useful learning signals: completion, attempts, independent solve rate, consistency, and where students may need support.</p>
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
              <p>These are proposed founding-pilot tiers and can be adjusted before payments are connected.</p>
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
                  <a href="/contact/" className={`button ${plan.featured ? '' : 'button-secondary'} full-width`}>
                    Request pilot <Arrow />
                  </a>
                </article>
              ))}
            </div>
            <p className="pricing-footnote">Need 300, 500, 1,000, or unlimited seats? Institutional plans can be quoted around the deployment instead of forcing a fixed public tier.</p>
          </div>
        </section>

        <section className="section pilot-section">
          <div className="shell pilot-panel">
            <div>
              <div className="eyebrow light">FOUNDING PILOT</div>
              <h2>Built for the first instructor and tutoring-center pilots.</h2>
              <p>Use the pilot to validate seat structure, reporting, classroom workflows, and the metrics instructors actually find useful before broader rollout.</p>
            </div>
            <div className="pilot-actions">
              <a className="button button-white" href="/contact/">Request a pilot</a>
              <a className="button button-ghost-light" href="/">Back to student site</a>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div className="section-heading">
              <div className="eyebrow">CLASSROOM FAQ</div>
              <h2>The commercial model in one page.</h2>
            </div>
            <div className="faq-list">
              <details open>
                <summary>What does a classroom seat represent?</summary>
                <p>One active student participating in an organization’s managed Calcura environment. A seat is not the same thing as a download or device installation.</p>
              </details>
              <details>
                <summary>Does a student lose Calcura if a class license ends?</summary>
                <p>No. The student keeps the free app and local practice. Only the organization-linked classroom services would end.</p>
              </details>
              <details>
                <summary>Is the instructor portal already production-ready?</summary>
                <p>Not yet. The current site shows the product direction and dashboard preview. Authentication, cloud synchronization, billing, and the production instructor backend remain the next implementation layer.</p>
              </details>
              <details>
                <summary>Can a department or larger institution request custom capacity?</summary>
                <p>Yes. Larger deployments can be quoted around required seat count and rollout scope rather than forcing a fixed public tier.</p>
              </details>
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
    <ClassroomPage />
  </React.StrictMode>,
);
