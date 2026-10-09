import { IntegralGlyph, ProgressIcon } from '../../components/Icons.jsx';

/* All previews are illustrations of the Calcura app, not live product. They are described to
   assistive technology once (role="img" + label) and their inner markup is hidden from it. */

const Fraction = ({ top, bottom }) => (
  <span className="frac">
    <span>{top}</span>
    <span>{bottom}</span>
  </span>
);

/* The hero phone is a scaled replica of the real app (Free Play screen + Integrand graph) with the
   Learning Progress card floating over it. The curve is a hand-drawn stylisation of the integrand,
   exactly as in the original page. */
const PHONE_CURVE =
  'M0,90 C25,22 47,105 72,76 C94,49 110,91 134,70 C155,52 178,88 198,66 C221,39 236,110 259,75 C279,40 296,21 320,94';

function PhoneIcon({ children }) {
  return (
    <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function AppPreview() {
  return (
    <div
      className="hero-visual"
      role="img"
      aria-label="Illustration of the Calcura app: a Free Play integration by parts problem with its integrand graph, and a Learning Progress summary. Private progress stays on the device unless a student joins a class."
    >
      <div className="phone-shell" aria-hidden="true">
        <div className="phone-camera" />
        <div className="phone-screen">
          <div className="phone-topbar">
            <div className="phone-title">
              <span className="phone-eyebrow">FREE PLAY</span>
              <strong>Integration by Parts</strong>
            </div>
            <div className="phone-actions">
              <PhoneIcon><path d="M5 5h14v14H5zM9 9h6M9 13h4" /></PhoneIcon>
              <PhoneIcon><path d="M4 16c3-9 5-9 8-3s5 5 8-5" /></PhoneIcon>
              <PhoneIcon><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15m0 5v-5h5" /></PhoneIcon>
            </div>
          </div>

          <div className="phone-label">EXPRESSION</div>
          <div className="phone-math-card">
            <IntegralGlyph className="phone-integral" />
            <span className="math-line phone-expression">
              <Fraction top="1" bottom="4" />
              <i>x</i> sin(<i>x</i>) <i>dx</i>
            </span>
          </div>

          <div className="phone-graph-card">
            <div className="phone-graph-head">
              <div>
                <strong>Integrand graph</strong>
                <span>Original problem integrand</span>
              </div>
              <span>×</span>
            </div>
            <div className="phone-equation math-line">
              <Fraction top="1" bottom="4" />
              <i>x</i> sin(<i>x</i>)
            </div>
            <div className="phone-graph">
              <span className="phone-axis phone-axis-x" />
              <span className="phone-axis phone-axis-y" />
              <svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d={PHONE_CURVE} fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-progress" aria-hidden="true">
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
