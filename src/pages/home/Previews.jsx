import { IntegralGlyph, ProgressIcon } from '../../components/Icons.jsx';
import { buildPlot } from './plot.js';

/* All previews are illustrations of the Calcura app, not live product. They are described to
   assistive technology once (role="img" + label) and their inner markup is hidden from it. */

const FEATURE_PLOT = buildPlot({ width: 360, height: 200 });

function Plot({ plot, className = '' }) {
  return (
    <svg
      className={`plot${className ? ` ${className}` : ''}`}
      viewBox={`0 0 ${plot.width} ${plot.height}`}
      width={plot.width}
      height={plot.height}
      aria-hidden="true"
      focusable="false"
    >
      {plot.gridX.map((x) => (
        <line key={`x${x}`} className="plot-grid" x1={x} x2={x} y1="0" y2={plot.height} />
      ))}
      {plot.gridY.map((y) => (
        <line key={`y${y}`} className="plot-grid" x1="0" x2={plot.width} y1={y} y2={y} />
      ))}
      <line className="plot-axis" x1="0" x2={plot.width} y1={plot.originY} y2={plot.originY} />
      <line className="plot-axis" x1={plot.originX} x2={plot.originX} y1="0" y2={plot.height} />
      <path className="plot-curve" d={plot.d} />
    </svg>
  );
}

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
      <div className="preview-orbit preview-orbit-one" aria-hidden="true" />
      <div className="preview-orbit preview-orbit-two" aria-hidden="true" />

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
export function GuidedPreview() {
  return (
    <div
      className="preview-card preview-guided"
      role="img"
      aria-label="Illustration of a Guided problem: step 1 of 5, find the inner function u for the integral of e to the 4x minus 1."
    >
      <div aria-hidden="true">
        <div className="preview-head">
          <div className="preview-step">
            <span className="app-kicker">Linear u-sub</span>
            <strong>Step 1 <em>/ 5</em></strong>
          </div>
        </div>
        <div className="guided-progress"><span /></div>
        <div className="guided-equation">
          <IntegralGlyph className="integral-glyph" />
          <span className="math-line">
            <i>e</i><sup>4<i>x</i> − 1</sup> <i>dx</i>
          </span>
        </div>
        <div className="guided-instruction">Find the inner function <i>u</i>.</div>
        <div className="guided-answer">Enter your answer…</div>
        <div className="keyboard-row">
          <span><i>x</i></span><span>f(<i>x</i>)</span><span><i>u</i></span><span><i>dx</i></span><span><i>du</i></span>
        </div>
      </div>
    </div>
  );
}

export function GraphPreview() {
  return (
    <div
      className="preview-card preview-graph"
      role="img"
      aria-label="Illustration of the integrand graph for one quarter x times sine of x, with pan and zoom hint."
    >
      <div aria-hidden="true">
        <div className="app-graph-head">
          <div>
            <strong>Integrand graph</strong>
            <span>Original problem integrand</span>
          </div>
          <span className="app-close">×</span>
        </div>
        <div className="app-formula app-formula-chip">
          <Fraction top="1" bottom="4" />
          <i>x</i> sin(<i>x</i>)
        </div>
        <Plot plot={FEATURE_PLOT} className="plot-large" />
        <span className="graph-help">Drag to pan. Pinch or scroll to zoom.</span>
      </div>
    </div>
  );
}

const ANGLE_STEPS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const CENTER = 100;
const RADIUS = 72;
const point = (deg, r = RADIUS) => ({
  x: Math.round((CENTER + r * Math.cos((deg * Math.PI) / 180)) * 100) / 100,
  y: Math.round((CENTER - r * Math.sin((deg * Math.PI) / 180)) * 100) / 100,
});

export function ReferencePreview() {
  const marker = point(45);
  const arcStart = point(0, 20);
  const arcEnd = point(45, 20);
  const values = ['0', 'π/6', 'π/4', 'π/3', 'π/2'];

  return (
    <div
      className="preview-card preview-reference"
      role="img"
      aria-label="Illustration of the reference toolkit: a unit circle with the angle pi over four marked, and the sine angle-sum identity."
    >
      <div aria-hidden="true">
        <div className="tab-row">
          <strong className="is-active">Trig</strong>
          <span>Log / Exp</span>
          <span>Hyperbolic</span>
        </div>
        <span className="app-label">Unit circle</span>
        <svg className="unit-circle" viewBox="0 0 200 200" width="200" height="200" focusable="false">
          <circle className="uc-ring" cx={CENTER} cy={CENTER} r={RADIUS} />
          <line className="uc-axis" x1="14" x2="186" y1={CENTER} y2={CENTER} />
          <line className="uc-axis" x1={CENTER} x2={CENTER} y1="14" y2="186" />
          {ANGLE_STEPS.map((deg) => {
            const p = point(deg);
            return <circle key={deg} className="uc-tick" cx={p.x} cy={p.y} r="2.4" />;
          })}
          <line className="uc-ray" x1={CENTER} y1={CENTER} x2={marker.x} y2={marker.y} />
          <path className="uc-arc" d={`M${arcStart.x} ${arcStart.y}A20 20 0 0 0 ${arcEnd.x} ${arcEnd.y}`} />
          <circle className="uc-marker" cx={marker.x} cy={marker.y} r="5" />
          <text className="uc-label" x="190" y="94" textAnchor="end">0</text>
          <text className="uc-label" x="106" y="14">π/2</text>
          <text className="uc-label" x="10" y="94">π</text>
          <text className="uc-label" x="106" y="196">3π/2</text>
        </svg>
        <div className="identity-line">
          sin(<i>a</i> ± <i>b</i>) = <span>sin(<i>a</i>) cos(<i>b</i>) ± cos(<i>a</i>) sin(<i>b</i>)</span>
        </div>
        <div className="reference-values">
          {values.map((value) => (
            <span key={value} className={value === 'π/4' ? 'is-active' : undefined}>{value}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div
      className="preview-card preview-progress"
      role="img"
      aria-label="Illustration of Learning Progress with sample data: completion rate 85.6 percent, 153 problems total, 131 correct, 16 incorrect, 6 abandoned."
    >
      <div aria-hidden="true">
        <div className="tab-row">
          <strong className="is-active">7 Days</strong>
          <span>30 Days</span>
          <span>90 Days</span>
          <span>All Time</span>
        </div>
        <span className="app-label">At a glance</span>
        <div className="metric-grid">
          <div><span>Completion rate</span><strong>85.6%</strong></div>
          <div><span>Solved on first attempt</span><strong>10.5%</strong></div>
          <div><span>Practice days</span><strong>8</strong></div>
          <div><span>Total</span><strong>153</strong></div>
        </div>
        <div className="outcome-bar">
          <span className="good" style={{ flexGrow: 131 }} />
          <span className="bad" style={{ flexGrow: 16 }} />
          <span className="neutral" style={{ flexGrow: 6 }} />
        </div>
        <div className="outcome-row">
          <span><i className="dot good">✓</i> Correct <strong>131</strong></span>
          <span><i className="dot bad">×</i> Incorrect <strong>16</strong></span>
          <span><i className="dot neutral">−</i> Abandoned <strong>6</strong></span>
        </div>
        <span className="sample-note">Sample data for illustration.</span>
      </div>
    </div>
  );
}
