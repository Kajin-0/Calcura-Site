// Deterministic plotting helper for the Integrand graph preview.
//
// The curve is the real function from the example problem, f(x) = (1/4) x sin(x), sampled the same
// way at build time and on the client. The frame mirrors the app's graph dialog: a 304 x 340 SVG
// with a 244 x 300 plot area, both axes spanning -10..10 and a grid line every 2 units.

export const exampleIntegrand = (x) => (x * Math.sin(x)) / 4;

const round = (value) => Math.round(value * 100) / 100;

export function buildAppGraph({
  width = 304,
  height = 340,
  margin = { left: 40, top: 20, right: 20, bottom: 20 },
  domain = 10,
  tick = 2,
  steps = 400,
  fn = exampleIntegrand,
} = {}) {
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const sx = (x) => ((x + domain) / (2 * domain)) * plotWidth;
  const sy = (y) => plotHeight - ((y + domain) / (2 * domain)) * plotHeight;

  let d = '';
  for (let i = 0; i <= steps; i += 1) {
    const x = -domain + ((2 * domain) * i) / steps;
    d += `${i === 0 ? 'M' : 'L'}${round(sx(x))} ${round(sy(fn(x)))}`;
  }

  const label = (value) => (value < 0 ? `\u2212${Math.abs(value)}` : String(value));
  const ticksX = [];
  const ticksY = [];
  for (let value = -domain; value <= domain; value += tick) {
    ticksX.push({ value, at: round(sx(value)), label: label(value) });
    if (value !== 0) ticksY.push({ value, at: round(sy(value)), label: label(value) });
  }
  // The grid still gets a line through the origin for the y axis; only its text label is dropped.
  ticksY.push({ value: 0, at: round(sy(0)), label: '' });

  return {
    d,
    width,
    height,
    margin,
    plotWidth,
    plotHeight,
    originX: round(sx(0)),
    originY: round(sy(0)),
    ticksX,
    ticksY,
  };
}
