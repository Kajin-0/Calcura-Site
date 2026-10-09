import DownloadChooser from '../components/DownloadChooser.jsx';
import {
  Arrow,
  BookIcon,
  CalcuraIntegralMark,
  Check,
  GraphIcon,
  ProgressIcon,
  ShuffleIcon,
  StepsIcon,
} from '../components/Icons.jsx';
import PageShell from '../components/PageShell.jsx';
import { TEACHER_SIGN_IN_URL, WEB_APP_URL } from '../site/links.js';
import { GraphPreview, GuidedPreview, ProgressPreview, ReferencePreview } from './home/AppScreens.jsx';
import { AppPreview } from './home/Previews.jsx';

const CAPABILITIES = [
  { Icon: StepsIcon, title: 'Guided', detail: 'step-by-step practice' },
  { Icon: ShuffleIcon, title: 'Free Play', detail: 'generated integral variety' },
  { Icon: GraphIcon, title: 'Graphs', detail: 'visual intuition on demand' },
  { Icon: ProgressIcon, title: 'Progress', detail: 'private learning analytics' },
];

const FEATURES = [
  {
    id: 'guided',
    tag: 'Guided Mode',
    Icon: StepsIcon,
    title: 'Learn the technique step by step.',
    body: 'Guided Mode breaks a solution into explicit mathematical decisions. Students practice the structure of a method instead of memorizing a completed solution.',
    Preview: GuidedPreview,
  },
  {
    id: 'graphing',
    tag: 'Interactive graphing',
    Icon: GraphIcon,
    title: 'See what the integrand is doing.',
    body: 'Open an integrand graph from the problem workspace, then pan and zoom without leaving the practice flow.',
    Preview: GraphPreview,
    reverse: true,
  },
  {
    id: 'reference',
    tag: 'Reference toolkit',
    Icon: BookIcon,
    title: 'Keep the right reference close.',
    body: 'Use built-in identities and definitions when needed. The goal is to reduce context switching without turning practice into answer lookup.',
    Preview: ReferencePreview,
  },
  {
    id: 'progress',
    tag: 'Learning Progress',
    Icon: ProgressIcon,
    title: 'Track improvement with real practice signals.',
    body: 'Completion rate alone is not enough. Calcura also tracks first-attempt success, answer reveals, attempts, time, practice consistency, and skill-level evidence.',
    Preview: ProgressPreview,
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <PageShell active="home" pageClass="page-home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Free calculus practice</div>
            <h1 id="hero-title">
              Practice integrals.
              <br />
              <span>Understand every step.</span>
            </h1>
            <p className="hero-lead">
              Calcura is a free calculus practice app built around guided problem solving, varied integral practice,
              interactive graphs, and private learning progress.
            </p>
            <div className="hero-actions">
              <DownloadChooser variant="primary" align="start" />
              <a className="button button-secondary" href={WEB_APP_URL}>Login to Calcura</a>
            </div>
            <a className="hero-classroom-link text-link" href="/classroom/">Explore Calcura Classroom<Arrow /></a>
            <ul className="hero-notes">
              <li><Check /> Free for students</li>
              <li><Check /> Offline-first</li>
              <li><Check /> Simple email sign-in</li>
            </ul>
          </div>
          <AppPreview />
        </div>
      </section>

      <section className="capabilities" aria-label="What Calcura includes">
        <ul className="shell capability-grid">
          {CAPABILITIES.map(({ Icon, title, detail }) => (
            <li key={title}>
              <span className="capability-icon"><Icon /></span>
              <span className="capability-text">
                <strong>{title}</strong>
                <span>{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section features" id="features" aria-labelledby="features-title">
        <div className="shell">
          <div className="section-heading centered">
            <div className="eyebrow">Built for active practice</div>
            <h2 id="features-title">Everything needed to work the problem, not just look up the answer.</h2>
            <p>
              Calcura keeps the learning loop focused: recognize the technique, do the mathematics, check the result,
              and understand what to practice next.
            </p>
          </div>

          <div className="feature-list">
            {FEATURES.map(({ id, tag, Icon, title, body, Preview, reverse }) => (
              <article key={id} className={`feature-row${reverse ? ' reverse' : ''}`}>
                <div className="feature-copy">
                  <div className="feature-tag"><Icon /> {tag}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <div className="feature-stage">
                  <Preview />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="free-section" id="free" aria-labelledby="free-title">
        <div className="shell free-layout">
          <div>
            <div className="eyebrow">The student app stays free</div>
            <h2 id="free-title">Calcura is free.</h2>
          </div>
          <div className="free-copy">
            <p>
              Students can use Calcura independently without buying a subscription or joining an institution.
              Teachers can start with free Classroom tools and upgrade to Pro for problem-level assignment controls.
            </p>
            <ul className="free-points">
              <li><Check /> Personal practice remains free</li>
              <li><Check /> Paid upgrades support teacher tools, not student access</li>
              <li><Check /> Leaving a class never removes the free student app</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section classroom-promo" aria-labelledby="classroom-promo-title">
        <div className="shell">
          <div className="promo-panel">
            <div className="promo-copy">
              <div className="eyebrow">Calcura Classroom</div>
              <h2 id="classroom-promo-title">Instructor tools now have their own space.</h2>
              <p>
                Create classes, publish assignments, and see student progress in the live teacher workspace.
                Explore Teacher, Pro, and the organizational roadmap on the Classroom page.
              </p>
            </div>
            <div className="promo-actions">
              <a className="button button-white" href={TEACHER_SIGN_IN_URL}>Teacher access</a>
              <a className="button button-ghost-light" href="/classroom/">Explore Classroom</a>
            </div>
          </div>
        </div>
      </section>

      <section className="download-section" id="download" aria-labelledby="download-title">
        <div className="shell">
          <div className="download-panel">
            <div className="download-mark" aria-hidden="true">
              <span className="brand-mark"><CalcuraIntegralMark weight={16} /></span>
            </div>
            <div className="download-copy">
              <div className="eyebrow">Calcura for students</div>
              <h2 id="download-title">Practice first. Paywalls never.</h2>
              <p>Free calculus practice on desktop, phone, and tablet.</p>
            </div>
            <div className="download-actions">
              <DownloadChooser variant="primary" align="end" />
              <a className="button button-secondary" href={WEB_APP_URL}>Login to Calcura</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
