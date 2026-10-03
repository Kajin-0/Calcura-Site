import { Fragment } from 'react';
import { buildAppGraph } from './plot.js';

/* Faithful miniatures of four real Calcura screens: the Guided workspace with its math keyboard,
   the Integrand graph dialog, the Reference dialog and the Learning Progress report. Geometry,
   spacing, type sizes, colours, icons and copy are taken from the running app so the page never
   shows a product that looks different from the one a visitor will open.

   They are illustrations, so each is described to assistive technology once (role="img" + label)
   and its inner markup is hidden from it. Class names are prefixed `app-` (see app-previews.css). */

/* ------------------------------------------------------------------ icons (the app's own paths) */

function Svg({ size = 16, strokeWidth = 2, children }) {
  return (
    <svg
      className="app-svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const ReferenceIcon = () => (
  <Svg>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </Svg>
);
const RerollIcon = () => (
  <Svg>
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
  </Svg>
);
const CloseIcon = ({ size = 16 }) => (
  <Svg size={size}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Svg>
);
const CalculatorIcon = () => (
  <svg className="app-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" focusable="false">
    <rect x="4" y="2" width="16" height="20" rx="2.5" />
    <rect x="7" y="5" width="10" height="4" rx="1" fill="currentColor" fillOpacity="0.85" stroke="none" />
    {[8.5, 12, 15.5].flatMap((cx) => [13, 17.25].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.15" fill="currentColor" stroke="none" />))}
  </svg>
);
const UndoIcon = ({ flip }) => (
  <Svg size={18}>
    <g transform={flip ? 'translate(24 0) scale(-1 1)' : undefined}>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </g>
  </Svg>
);
const ArrowIcon = ({ flip }) => (
  <Svg size={18}>
    <g transform={flip ? 'translate(24 0) scale(-1 1)' : undefined}>
      <path d="M19 12H5M11 5l-7 7 7 7" />
    </g>
  </Svg>
);
const OutcomeGlyph = ({ tone }) => (
  <svg className="app-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {tone === 'correct' && <path d="M5 12.5l4.5 4.5L19 7.5" />}
    {tone === 'incorrect' && <path d="M18 6L6 18M6 6l12 12" />}
    {tone === 'abandoned' && <path d="M6 12h12" />}
  </svg>
);
const BackspaceIcon = () => (
  <Svg size={20}>
    <path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
    <path d="M17 9.5l-5 5M12 9.5l5 5" />
  </Svg>
);
const CheckIcon = () => (
  <Svg size={20}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

/* ------------------------------------------------------------------ typeset maths (KaTeX faces) */

const I = ({ children }) => <i className="app-i">{children}</i>;
const R = ({ children }) => <span className="app-r">{children}</span>;
const Op = ({ children }) => <span className="app-op">{children}</span>;
const Fn = ({ children }) => <span className="app-r app-fn">{children}</span>;
const Frac = ({ n, d }) => (
  <span className="app-frac">
    <span>{n}</span>
    <span>{d}</span>
  </span>
);
const Box = () => <span className="app-box" />;

/* ------------------------------------------------------------------ shared dialog chrome */

function IconButton({ children, active = false }) {
  return <span className={`app-iconbtn${active ? ' is-active' : ''}`}>{children}</span>;
}

function DialogHeader({ title, subtitle }) {
  return (
    <div className="app-dialog-head">
      <div className="app-dialog-title">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
      <IconButton>
        <CloseIcon size={20} />
      </IconButton>
    </div>
  );
}

/* ------------------------------------------------------------------ 1. Guided workspace */

const VARIABLE_ROW = [
  { key: 'x', node: <I>x</I> },
  { key: 'fx', node: (<><I>f</I><R>(</R><I>x</I><R>)</R></>), menu: true, small: true },
  { key: 'u', node: <I>u</I>, menu: true },
  { key: 'dx', node: (<><I>d</I><I>x</I></>) },
  { key: 'du', node: (<><I>d</I><I>u</I></>), menu: true },
];

const KEY_ROWS = [
  [{ k: '7' }, { k: '8' }, { k: '9' }, { k: 'paren', node: (<>(<Box />)</>), tone: 'op', menu: true }, { k: 'C', node: <I>C</I>, tone: 'op' }],
  [{ k: '4' }, { k: '5' }, { k: '6' }, { k: 'times', node: '×', tone: 'op' }, { k: 'frac', node: (<><Box /> / <Box /></>), tone: 'op' }],
  [{ k: '1' }, { k: '2' }, { k: '3' }, { k: 'plus', node: '+', tone: 'op', menu: true }, { k: 'minus', node: '-', tone: 'op', menu: true }],
  [{ k: '0' }, { k: 'caret', node: '^', tone: 'op', menu: true }, { k: 'eq', node: '=', tone: 'op', menu: true }, { k: 'del', node: <BackspaceIcon />, tone: 'delete' }, { k: 'ok', node: <CheckIcon />, tone: 'submit' }],
];

function Key({ children, tone = 'digit', menu = false, small = false }) {
  return <span className={`app-key is-${tone}${menu ? ' has-menu' : ''}${small ? ' is-small' : ''}`}>{children}</span>;
}

function Segmented({ labels, active, className = '' }) {
  return (
    <span className={`app-segmented ${className}`}>
      {labels.map((label, index) => (
        <span key={label} className={index === active ? 'is-active' : undefined}>
          {label}
        </span>
      ))}
    </span>
  );
}

function Keyboard() {
  return (
    <div className="app-keyboard">
      <div className="app-keyboard-handle">
        <span className="app-keyboard-calc"><CalculatorIcon /></span>
        <span className="app-grabber" />
      </div>
      <div className="app-toolbar">
        <div className="app-toolbar-group">
          <span className="app-toolbtn is-disabled"><UndoIcon /></span>
          <span className="app-toolbtn is-disabled"><UndoIcon flip /></span>
          <span className="app-toolbtn app-ac">AC</span>
        </div>
        <Segmented labels={['123', 'f(x)', 'αβγ']} active={0} className="app-tabs" />
        <div className="app-toolbar-group">
          <span className="app-toolbtn"><ArrowIcon /></span>
          <span className="app-toolbtn"><ArrowIcon flip /></span>
        </div>
      </div>
      <div className="app-keypad">
        {VARIABLE_ROW.map(({ key, node, menu, small }) => (
          <Key key={key} tone="var" menu={menu} small={small}>
            {node}
          </Key>
        ))}
        {KEY_ROWS.flat().map(({ k, node, tone, menu }) => (
          <Key key={k} tone={tone} menu={menu}>
            {node ?? k}
          </Key>
        ))}
      </div>
    </div>
  );
}

export function GuidedPreview() {
  return (
    <div
      className="app-screen app-guided"
      role="img"
      aria-label="Illustration of a Guided problem in the Calcura app: step 1 of 5, find the inner function u for the integral of e to the 4x minus 1, with the math keyboard below."
    >
      <div className="app-screen-inner" aria-hidden="true">
        <div className="app-header">
          <div className="app-header-row">
            <div className="app-title">
              <span className="app-eyebrow">Integration</span>
              <span className="app-step">
                Step 1 <span>/ 5</span>
              </span>
            </div>
            <div className="app-icons">
              <IconButton><ReferenceIcon /></IconButton>
              <IconButton><RerollIcon /></IconButton>
              <IconButton><CloseIcon /></IconButton>
            </div>
          </div>
          <div className="app-progress"><span /></div>
        </div>

        <div className="app-guided-main">
          <div className="app-equation">
            <span className="app-strut" />
            <span className="app-int">∫</span>
            <I>e</I>
            <sup className="app-sup">
              <span>
                <R>4</R><I>x</I><R>−1</R>
              </span>
            </sup>
            <span className="app-thin" />
            <I>d</I><I>x</I>
          </div>
          <div className="app-instruction">
            Find the inner function <I>u</I>.
          </div>
          <div className="app-answer">Enter your answer...</div>
        </div>

        <Keyboard />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Integrand graph dialog */

const GRAPH = buildAppGraph();

function GraphPlot() {
  const { width, height, margin, plotWidth, plotHeight, ticksX, ticksY, originX, originY, d } = GRAPH;
  return (
    <svg className="app-plot" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <g transform={`translate(${margin.left},${margin.top})`}>
        <rect className="app-plot-frame" x="0" y="0" width={plotWidth} height={plotHeight} />
        {ticksX.map((t) => (
          <line key={`gx${t.value}`} className="app-plot-grid" x1={t.at} x2={t.at} y1="0" y2={plotHeight} />
        ))}
        {ticksY.map((t) => (
          <line key={`gy${t.value}`} className="app-plot-grid" x1="0" x2={plotWidth} y1={t.at} y2={t.at} />
        ))}
        <line className="app-plot-axis" x1="0" x2={plotWidth} y1={originY} y2={originY} />
        <line className="app-plot-axis" x1={originX} x2={originX} y1="0" y2={plotHeight} />
        {ticksX.map((t) => (
          <text key={`tx${t.value}`} className="app-plot-tick" x={t.at} y={plotHeight + 11} textAnchor="middle">
            {t.label}
          </text>
        ))}
        {ticksY.map((t) => (
          <text key={`ty${t.value}`} className="app-plot-tick" x="-6" y={t.at} dy="0.32em" textAnchor="end">
            {t.label}
          </text>
        ))}
        <text className="app-plot-title" x={plotWidth} y={plotHeight + 25} textAnchor="end">x</text>
        <text className="app-plot-title" transform={`translate(-30 ${plotHeight / 2}) rotate(-90)`} textAnchor="middle">f(x)</text>
        <path className="app-plot-curve" d={d} />
      </g>
    </svg>
  );
}

export function GraphPreview() {
  return (
    <div
      className="app-screen app-graph"
      role="img"
      aria-label="Illustration of the Calcura integrand graph dialog: the original problem integrand, one quarter x times sine x, plotted on a grid that can be panned and zoomed."
    >
      <div className="app-screen-inner" aria-hidden="true">
        <div className="app-modal">
          <DialogHeader title="Integrand graph" subtitle="Original problem integrand" />
          <div className="app-modal-body">
            <div className="app-formula">
              <Frac n="1" d="4" />
              <I>x</I>
              <Fn>sin</Fn>
              <R>(</R><I>x</I><R>)</R>
            </div>
            <div className="app-plot-box">
              <GraphPlot />
            </div>
            <p className="app-caption">Drag to pan. Pinch or scroll to zoom.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Reference dialog */

const FILTERS = ['All', 'Trig', 'Log / Exp', 'Hyperbolic', 'Complex', 'Inverse', 'Algebra', 'Calculus'];

/* The unit circle is drawn exactly as the app draws it: 16 standard angles on a 400 x 400 grid. */
const UNIT_POINTS = [
  [318, 200], [302.2, 141], [283.4, 116.6], [259, 97.8], [200, 82], [141, 97.8], [116.6, 116.6], [97.8, 141],
  [82, 200], [97.8, 259], [116.6, 283.4], [141, 302.2], [200, 318], [259, 302.2], [283.4, 283.4], [302.2, 259],
];
const UNIT_LABELS = [
  ['0', 338, 204, 'start'], ['π/6', 322, 132, 'start'], ['π/4', 304, 96, 'start'], ['π/3', 272, 74, 'middle'],
  ['π/2', 200, 54, 'middle'], ['2π/3', 128, 74, 'middle'], ['3π/4', 96, 96, 'end'], ['5π/6', 78, 132, 'end'],
  ['π', 62, 204, 'end'], ['7π/6', 78, 278, 'end'], ['5π/4', 96, 314, 'end'], ['4π/3', 128, 338, 'middle'],
  ['3π/2', 200, 358, 'middle'], ['5π/3', 272, 338, 'middle'], ['7π/4', 304, 314, 'start'], ['11π/6', 322, 278, 'start'],
];

function UnitCircle() {
  return (
    <svg className="app-unit-circle" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {UNIT_POINTS.map(([x, y]) => (
        <line key={`r${x}-${y}`} x1="200" y1="200" x2={x} y2={y} stroke="#e2e8f0" strokeWidth="0.9" />
      ))}
      <line x1="64" y1="200" x2="336" y2="200" stroke="#94a3b8" strokeWidth="1.15" />
      <line x1="200" y1="64" x2="200" y2="336" stroke="#94a3b8" strokeWidth="1.15" />
      <circle cx="200" cy="200" r="118" fill="none" stroke="#0f172a" strokeWidth="1.75" />
      {UNIT_POINTS.map(([x, y]) => (
        <circle key={`d${x}-${y}`} cx={x} cy={y} r="3.4" fill="#0f172a" />
      ))}
      {UNIT_LABELS.map(([text, x, y, anchor]) => (
        <text key={text} x={x} y={y} textAnchor={anchor} fontSize="19" fontWeight="500" fill="#475569">
          {text}
        </text>
      ))}
    </svg>
  );
}

const SPECIAL_VALUES = [
  ['θ', '0', 'π/6', 'π/4', 'π/3', 'π/2'],
  ['cos θ', '1', '√3/2', '√2/2', '1/2', '0'],
  ['sin θ', '0', '1/2', '√2/2', '√3/2', '1'],
];

function IdentityCard({ index, children }) {
  return (
    <div className="app-identity">
      <div className="app-identity-meta">
        <span>{index}</span>
        <span className="app-chip">Trig</span>
      </div>
      <div className="app-identity-formula">{children}</div>
    </div>
  );
}

export function ReferencePreview() {
  return (
    <div
      className="app-screen app-reference"
      role="img"
      aria-label="Illustration of the Calcura Reference: topic filters, the unit circle with exact values for the standard angles, and numbered trigonometric identities."
    >
      <div className="app-screen-inner" aria-hidden="true">
        <DialogHeader title="Reference" subtitle="Identities and definitions for quick lookup." />
        <div className="app-filters">
          {FILTERS.map((label) => (
            <span key={label} className={label === 'Trig' ? 'is-active' : undefined}>
              {label}
            </span>
          ))}
        </div>
        <div className="app-reference-body">
          <p className="app-description">Angle-sum, Pythagorean, and double-angle identities.</p>

          <div className="app-card app-circle-card">
            <div className="app-label">Unit circle</div>
            <UnitCircle />
            <div className="app-circle-notes">
              <span>Point = (cos <I>θ</I>, sin <I>θ</I>)</span>
              <span>Signs follow the quadrant.</span>
            </div>
            <div className="app-values">
              {SPECIAL_VALUES.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <span key={`${rowIndex}-${cellIndex}`} className={rowIndex === 0 || cellIndex === 0 ? 'is-head' : undefined}>
                    {cell}
                  </span>
                )),
              )}
            </div>
          </div>

          <div className="app-label app-count">7 identities</div>
          <div className="app-identities">
            <IdentityCard index="1">
              <Fn>sin</Fn><R>(</R><I>a</I><Op>±</Op><I>b</I><R>)</R><Op>=</Op>
              <Fn>sin</Fn><R>(</R><I>a</I><R>)</R><Fn>cos</Fn><R>(</R><I>b</I><R>)</R><Op>±</Op>
              <Fn>cos</Fn><R>(</R><I>a</I><R>)</R><Fn>sin</Fn><R>(</R><I>b</I><R>)</R>
            </IdentityCard>
            <IdentityCard index="2">
              <Fn>cos</Fn><R>(</R><I>a</I><Op>±</Op><I>b</I><R>)</R><Op>=</Op>
              <Fn>cos</Fn><R>(</R><I>a</I><R>)</R><Fn>cos</Fn><R>(</R><I>b</I><R>)</R><Op>∓</Op>
              <Fn>sin</Fn><R>(</R><I>a</I><R>)</R><Fn>sin</Fn><R>(</R><I>b</I><R>)</R>
            </IdentityCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Learning Progress report */

const RANGES = ['7 Days', '30 Days', '90 Days', 'All Time'];
const GLANCE = [
  ['Completion rate', '85.6%'],
  ['Solved on first attempt', '10.5%'],
  ['Practice days', '8'],
  ['Total', '153'],
];
const OUTCOMES = [
  ['correct', 'Correct', '131'],
  ['incorrect', 'Incorrect', '16'],
  ['abandoned', 'Abandoned', '6'],
];
const DETAILS = [
  ['Avg. attempts', '5.6'],
  ['Average time', '10m 28s'],
  ['Solved without answer reveal', '85.6%'],
];
const COMPARISON = [
  ['Completion rate', '+17.9 points', 'Improved'],
  ['Solved on first attempt', '−6.5 points', 'Lower'],
  ['Practice days', '+2 practice days', 'More practice'],
  ['Total', '+88 total', 'More practice'],
];

export function ProgressPreview() {
  return (
    <>
      <div
        className="app-screen app-progress-screen"
        role="img"
        aria-label="Illustration of the Calcura Learning Progress report with sample practice data: completion rate, first-attempt success, practice days, outcomes, and a comparison with the previous period."
      >
        <div className="app-screen-inner" aria-hidden="true">
          <DialogHeader title="Learning Progress" subtitle="Private progress tracking stored on this device." />
          <div className="app-progress-body">
            <Segmented labels={RANGES} active={0} className="app-ranges" />

            <section>
              <div className="app-label app-wide">At a glance</div>
              <div className="app-metrics">
                {GLANCE.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="app-outcomes">
                {OUTCOMES.map(([tone, label, count], index) => (
                  <Fragment key={label}>
                    {index > 0 && <span className="app-outcome-gap" />}
                    <div>
                      <span className={`app-outcome-dot is-${tone}`}><OutcomeGlyph tone={tone} /></span>
                      <span>{label}</span>
                      <strong>{count}</strong>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className="app-details">
                {DETAILS.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="app-label app-wide">Compared with the previous period</div>
              <div className="app-compare">
                {COMPARISON.map(([label, change, reading]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <span>
                      <strong>{change}</strong>
                      <span>{reading}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <p className="app-sample-note">Sample data for illustration.</p>
    </>
  );
}
