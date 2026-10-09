import {
  Arrow,
  ChartIcon,
  ClipboardIcon,
  Check,
  PlusIcon,
  SlidersIcon,
  UsersIcon,
} from '../components/Icons.jsx';
import PageShell from '../components/PageShell.jsx';
import { TEACHER_SIGN_IN_URL, TEACHER_SIGN_UP_URL, WEB_APP_URL } from '../site/links.js';

const FLOW_STEPS = [
  {
    title: 'Create a class',
    body: 'Create your free teacher account, open your workspace, create a class, and share its join code.',
  },
  {
    title: 'Students join with a code',
    body: 'Students sign in to Calcura, open Classroom assignments, and enter your class code.',
  },
  {
    title: 'Assign practice. See progress.',
    body: 'Publish an assignment. Students work in Calcura, and recorded results appear in your dashboard and assignment analytics.',
  },
];

function WorkspaceIllustration() {
  return (
    <div className="workspace" aria-hidden="true">
      <div className="workspace-window">
        <div className="workspace-bar"><i /><i /><i /></div>
        <div className="workspace-body">
          <div className="workspace-side">
            <span className="ws-nav is-active"><UsersIcon /> Classes</span>
            <span className="ws-nav"><ClipboardIcon /> Assignments</span>
            <span className="ws-nav"><ChartIcon /> Analytics</span>
          </div>
          <div className="workspace-main">
            <div className="ws-title-row">
              <span className="ws-line ws-line-title" />
              <span className="status-chip live">Published</span>
            </div>
            <div className="ws-list">
              <div className="ws-row"><span className="ws-avatar" /><span className="ws-lines"><span className="ws-line" /><span className="ws-line ws-line-short" /></span></div>
              <div className="ws-row"><span className="ws-avatar" /><span className="ws-lines"><span className="ws-line" /><span className="ws-line ws-line-short" /></span></div>
              <div className="ws-row"><span className="ws-avatar" /><span className="ws-lines"><span className="ws-line" /><span className="ws-line ws-line-short" /></span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="workspace-code">
        <span>Class join code</span>
        <strong>••••••</strong>
      </div>
    </div>
  );
}

export default function ClassroomPage() {
  return (
    <PageShell active="classroom" pageClass="page-classroom">
      <section className="page-hero" aria-labelledby="classroom-title">
        <div className="shell page-hero-inner">
          <div className="page-hero-copy">
            <div className="classroom-overline">
              <span className="eyebrow">Calcura Classroom</span>
              <span className="status-chip live">Live now</span>
            </div>
            <h1 id="classroom-title">Calcura Classroom</h1>
            <p className="classroom-hero-lead">Your classes. Their practice. A clearer view.</p>
            <p className="page-hero-text">
              Create classes, publish calculus assignments, and see progress from the same free Calcura app your
              students already use.
            </p>
            <div className="page-hero-actions">
              <a className="button" href={TEACHER_SIGN_UP_URL}>Create free teacher account <Arrow /></a>
              <a className="button button-secondary" href={TEACHER_SIGN_IN_URL}>Teacher sign in</a>
            </div>
            <p className="classroom-account-note">
              Teacher is free. No credit card required. Create your account with your email and a six-digit code.
            </p>
            <a className="text-link" href={WEB_APP_URL}>Here to practice? Open the free student app <Arrow /></a>
          </div>
          <WorkspaceIllustration />
        </div>
      </section>

      <section className="section classroom-flow" aria-labelledby="classroom-flow-title">
        <div className="shell">
          <div className="section-heading">
            <div className="eyebrow">How it works</div>
            <h2 id="classroom-flow-title">From class setup to student progress.</h2>
            <p>The teacher workspace and student app work together. No separate student Classroom account is needed.</p>
          </div>
          <ol className="flow-steps">
            {FLOW_STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="flow-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section classroom-tools" aria-labelledby="classroom-tools-title">
        <div className="shell tools-layout">
          <div className="section-heading">
            <div className="eyebrow">In your teacher workspace</div>
            <h2 id="classroom-tools-title">Tools for the work of teaching.</h2>
            <p>Classroom handles the organization. Calcura remains the calculus practice engine.</p>
          </div>
          <dl className="tools-grid">
            <div>
              <dt><span className="tool-icon"><UsersIcon /></span>Classes and rosters</dt>
              <dd>Create classes, share student join codes, and view enrolled students in one place.</dd>
            </div>
            <div>
              <dt><span className="tool-icon"><ClipboardIcon /></span>Assignment authoring</dt>
              <dd>Choose practice families, problem counts, and difficulty. Edit drafts, publish assignments, duplicate them, or archive them when finished.</dd>
            </div>
            <div>
              <dt><span className="tool-icon"><ChartIcon /></span>Dashboard and analytics</dt>
              <dd>See completion, accuracy, and attempts from recorded assignment results. Look across classes or into an individual assignment.</dd>
            </div>
            <div>
              <dt><span className="tool-icon"><SlidersIcon /></span>Problem-level controls <span className="status-chip">Pro</span></dt>
              <dd>In draft assignments, regenerate individual problems, lock the ones you want to keep, and reorder them before publishing.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section classroom-tiers" id="pricing" aria-labelledby="classroom-tiers-title">
        <div className="shell">
          <div className="section-heading">
            <div className="eyebrow">Product tiers</div>
            <h2 id="classroom-tiers-title">Start teaching. Add control when you need it.</h2>
            <p>Teacher and Pro are available now. Organizational tiers are part of the roadmap, not self-service checkout products.</p>
          </div>

          <div className="tier-grid">
            <article className="classroom-tier" data-tier="Teacher" aria-labelledby="teacher-tier-title">
              <div className="tier-heading"><h3 id="teacher-tier-title">Teacher</h3><span className="status-chip live">Available now</span></div>
              <p className="classroom-tier-price">Free</p>
              <p className="tier-detail">Classes, join codes, assignment creation and publication, student progress, and basic analytics.</p>
              <a className="button button-secondary" href={TEACHER_SIGN_UP_URL}>Create free teacher account</a>
            </article>
            <article className="classroom-tier is-featured" data-tier="Pro" aria-labelledby="pro-tier-title">
              <div className="tier-heading"><h3 id="pro-tier-title">Pro</h3><span className="status-chip live">Available now</span></div>
              <p className="classroom-tier-price">$19<span> / month</span><span className="classroom-annual-price">or $149 / year · USD</span></p>
              <p className="tier-detail">Everything in Teacher, plus problem-level assignment editing: regenerate, lock, and reorder problems before publishing.</p>
              <a className="button" href={TEACHER_SIGN_IN_URL}>Explore Pro in your workspace <Arrow /></a>
            </article>
          </div>

          <div className="future-tiers" role="group" aria-label="Planned organizational tiers">
            <article data-tier="Team"><div><h3>Team</h3><span className="status-chip muted">Planned</span></div><p>For future multi-instructor use. Pricing and availability are not announced.</p></article>
            <article data-tier="School"><div><h3>School</h3><span className="status-chip muted">Planned</span></div><p>For future school and department deployments. Pricing and availability are not announced.</p></article>
            <article data-tier="University"><div><h3>University</h3><span className="status-chip muted">Quote-only · planned</span></div><p>For institutional requirements. Discuss a future deployment through an individual inquiry.</p></article>
          </div>
          <p className="tier-note">
            Pro is the current self-service paid upgrade. Team, School, and University are not available to purchase online.{' '}
            <a className="text-link" href="/contact/">Discuss institutional requirements <Arrow /></a>
          </p>
        </div>
      </section>

      <section className="classroom-students" aria-labelledby="classroom-students-title">
        <div className="shell">
          <div className="students-panel">
            <div className="students-mark" aria-hidden="true"><Check /></div>
            <div className="students-copy">
              <div className="eyebrow">The student principle</div>
              <h2 id="classroom-students-title">Calcura stays free for students.</h2>
            </div>
            <div className="students-body">
              <p>
                Students can practice independently and join a class without buying Pro. Paid Classroom plans support
                teacher and organizational tools, not a paywall around student calculus practice.
              </p>
              <a className="text-link" href={WEB_APP_URL}>Open the free student app <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section classroom-faq" aria-labelledby="classroom-faq-title">
        <div className="shell faq-layout">
          <div className="section-heading">
            <div className="eyebrow">Classroom FAQ</div>
            <h2 id="classroom-faq-title">A few practical details.</h2>
          </div>
          <div className="faq-list">
            <details name="classroom-faq" open>
              <summary>How do I create a teacher account?<PlusIcon /></summary>
              <p>Choose Create free teacher account, enter your email, and verify the six-digit code sent to you. Your free Teacher workspace is created when you verify the code.</p>
            </details>
            <details name="classroom-faq">
              <summary>Do I need Pro to start teaching?<PlusIcon /></summary>
              <p>No. Teacher includes classes, join codes, assignments, student progress, and basic analytics. You can upgrade to Pro from Billing in your teacher workspace for problem-level assignment controls.</p>
            </details>
            <details name="classroom-faq">
              <summary>What does the progress view measure?<PlusIcon /></summary>
              <p>Dashboard and assignment analytics summarize recorded assignment results. They are not a live activity tracker and do not report every independent practice session.</p>
            </details>
            <details name="classroom-faq">
              <summary>Can a school or university purchase online?<PlusIcon /></summary>
              <p>Not yet. Team and School are planned organizational tiers; University is quote-only and planned. Contact us to discuss requirements. No institutional pricing or seat allocation is currently advertised.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="classroom-start" aria-labelledby="classroom-start-title">
        <div className="shell">
          <div className="start-panel">
            <div>
              <div className="eyebrow">Calcura Classroom</div>
              <h2 id="classroom-start-title">Your next class starts here.</h2>
              <p>Create your free Teacher workspace. No credit card required.</p>
            </div>
            <div className="start-actions">
              <a className="button button-white" href={TEACHER_SIGN_UP_URL}>Create free teacher account <Arrow /></a>
              <a className="start-signin" href={TEACHER_SIGN_IN_URL}>Teacher sign in <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
