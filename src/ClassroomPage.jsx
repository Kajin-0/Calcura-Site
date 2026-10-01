import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './multipage.css';
import { Arrow, SiteFooter, SiteHeader, TEACHER_SIGN_IN_URL, WEB_APP_URL } from './siteShared.jsx';

const TEACHER_SIGN_UP_URL = 'https://classroom.calcura.study/signup';

function ClassroomPage() {
  return (
    <div className="classroom-page">
      <SiteHeader active="classroom" />
      <main id="classroom-content">
        <section className="page-hero" aria-labelledby="classroom-title">
          <div className="shell page-hero-inner">
            <div className="classroom-overline"><span>CALCURA CLASSROOM</span><span className="classroom-status">Live now</span></div>
            <h1 id="classroom-title">Calcura Classroom</h1>
            <p className="classroom-hero-lead">Your classes. Their practice. A clearer view.</p>
            <p>Create classes, publish calculus assignments, and see progress from the same free Calcura app your students already use.</p>
            <div className="page-hero-actions">
              <a className="button" href={TEACHER_SIGN_UP_URL}>Create free teacher account <Arrow /></a>
              <a className="button button-secondary" href={TEACHER_SIGN_IN_URL}>Teacher sign in</a>
            </div>
            <p className="classroom-account-note">Teacher is free. No credit card required. Create your account with your email and a six-digit code.</p>
            <a className="classroom-text-link" href={WEB_APP_URL}>Here to practice? Open the free student app →</a>
          </div>
        </section>

        <section className="section classroom-section" aria-labelledby="classroom-flow-title">
          <div className="shell">
            <div className="section-heading classroom-heading">
              <div className="eyebrow">HOW IT WORKS</div>
              <h2 id="classroom-flow-title">From class setup to student progress.</h2>
              <p>The teacher workspace and student app work together. No separate student Classroom account is needed.</p>
            </div>
            <ol className="classroom-live-flow">
              <li><span className="classroom-step" aria-hidden="true">01</span><h3>Create a class</h3><p>Create your free teacher account, open your workspace, create a class, and share its join code.</p></li>
              <li><span className="classroom-step" aria-hidden="true">02</span><h3>Students join with a code</h3><p>Students sign in to Calcura, open Classroom assignments, and enter your class code.</p></li>
              <li><span className="classroom-step" aria-hidden="true">03</span><h3>Assign practice. See progress.</h3><p>Publish an assignment. Students work in Calcura, and recorded results appear in your dashboard and assignment analytics.</p></li>
            </ol>
          </div>
        </section>

        <section className="section classroom-tools-section" aria-labelledby="classroom-tools-title">
          <div className="shell classroom-tools-layout">
            <div className="section-heading">
              <div className="eyebrow">IN YOUR TEACHER WORKSPACE</div>
              <h2 id="classroom-tools-title">Tools for the work of teaching.</h2>
              <p>Classroom handles the organization. Calcura remains the calculus practice engine.</p>
            </div>
            <dl className="classroom-tools">
              <div><dt>Classes and rosters</dt><dd>Create classes, share student join codes, and view enrolled students in one place.</dd></div>
              <div><dt>Assignment authoring</dt><dd>Choose practice families, problem counts, and difficulty. Edit drafts, publish assignments, duplicate them, or archive them when finished.</dd></div>
              <div><dt>Dashboard and analytics</dt><dd>See completion, accuracy, and attempts from recorded assignment results. Look across classes or into an individual assignment.</dd></div>
              <div><dt>Problem-level controls <span className="classroom-status">Pro</span></dt><dd>In draft assignments, regenerate individual problems, lock the ones you want to keep, and reorder them before publishing.</dd></div>
            </dl>
          </div>
        </section>

        <section className="section classroom-tiers-section" id="pricing" aria-labelledby="classroom-tiers-title">
          <div className="shell">
            <div className="section-heading classroom-heading">
              <div className="eyebrow">PRODUCT TIERS</div>
              <h2 id="classroom-tiers-title">Start teaching. Add control when you need it.</h2>
              <p>Teacher and Pro are available now. Organizational tiers are part of the roadmap, not self-service checkout products.</p>
            </div>
            <div className="classroom-current-tiers">
              <article className="classroom-tier" data-tier="Teacher" aria-labelledby="teacher-tier-title">
                <div className="classroom-tier-heading"><h3 id="teacher-tier-title">Teacher</h3><span className="classroom-status">Available now</span></div>
                <p className="classroom-tier-price">Free</p>
                <p>Classes, join codes, assignment creation and publication, student progress, and basic analytics.</p>
                <a className="button button-secondary" href={TEACHER_SIGN_UP_URL}>Create free teacher account</a>
              </article>
              <article className="classroom-tier" data-tier="Pro" aria-labelledby="pro-tier-title">
                <div className="classroom-tier-heading"><h3 id="pro-tier-title">Pro</h3><span className="classroom-status">Available now</span></div>
                <p className="classroom-tier-price">$19<span> / month</span><span className="classroom-annual-price">or $149 / year · USD</span></p>
                <p>Everything in Teacher, plus problem-level assignment editing: regenerate, lock, and reorder problems before publishing.</p>
                <a className="button" href={TEACHER_SIGN_IN_URL}>Explore Pro in your workspace <Arrow /></a>
              </article>
            </div>
            <div className="classroom-future-tiers" aria-label="Planned organizational tiers">
              <article data-tier="Team"><div><h3>Team</h3><span className="classroom-status">Planned</span></div><p>For future multi-instructor use. Pricing and availability are not announced.</p></article>
              <article data-tier="School"><div><h3>School</h3><span className="classroom-status">Planned</span></div><p>For future school and department deployments. Pricing and availability are not announced.</p></article>
              <article data-tier="University"><div><h3>University</h3><span className="classroom-status">Quote-only · planned</span></div><p>For institutional requirements. Discuss a future deployment through an individual inquiry.</p></article>
            </div>
            <p className="classroom-tier-note">Pro is the current self-service paid upgrade. Team, School, and University are not available to purchase online. <a className="classroom-text-link" href="/contact/">Discuss institutional requirements →</a></p>
          </div>
        </section>

        <section className="section classroom-students-section" aria-labelledby="classroom-students-title">
          <div className="shell classroom-students-layout">
            <div className="section-heading"><div className="eyebrow">THE STUDENT PRINCIPLE</div><h2 id="classroom-students-title">Calcura stays free for students.</h2></div>
            <div><p>Students can practice independently and join a class without buying Pro. Paid Classroom plans support teacher and organizational tools, not a paywall around student calculus practice.</p><a className="classroom-text-link" href={WEB_APP_URL}>Open the free student app →</a></div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="classroom-faq-title">
          <div className="shell faq-layout">
            <div className="section-heading"><div className="eyebrow">CLASSROOM FAQ</div><h2 id="classroom-faq-title">A few practical details.</h2></div>
            <div className="faq-list">
              <details open><summary>How do I create a teacher account?</summary><p>Choose Create free teacher account, enter your email, and verify the six-digit code sent to you. Your free Teacher workspace is created when you verify the code.</p></details>
              <details><summary>Do I need Pro to start teaching?</summary><p>No. Teacher includes classes, join codes, assignments, student progress, and basic analytics. You can upgrade to Pro from Billing in your teacher workspace for problem-level assignment controls.</p></details>
              <details><summary>What does the progress view measure?</summary><p>Dashboard and assignment analytics summarize recorded assignment results. They are not a live activity tracker and do not report every independent practice session.</p></details>
              <details><summary>Can a school or university purchase online?</summary><p>Not yet. Team and School are planned organizational tiers; University is quote-only and planned. Contact us to discuss requirements. No institutional pricing or seat allocation is currently advertised.</p></details>
            </div>
          </div>
        </section>

        <section className="section classroom-start-section" aria-labelledby="classroom-start-title">
          <div className="shell classroom-start-panel">
            <div><div className="eyebrow light">CALCURA CLASSROOM</div><h2 id="classroom-start-title">Your next class starts here.</h2><p>Create your free Teacher workspace. No credit card required.</p></div>
            <div className="classroom-start-actions"><a className="button button-white" href={TEACHER_SIGN_UP_URL}>Create free teacher account <Arrow /></a><a className="classroom-signin-light" href={TEACHER_SIGN_IN_URL}>Teacher sign in →</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><ClassroomPage /></React.StrictMode>);
