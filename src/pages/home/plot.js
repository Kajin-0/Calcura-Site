// Deterministic plotting helpers for the marketing previews.
// The curve on the site is the real function from the example problem, f(x) = ¼ x sin(x),
// sampled at build time and on the client with identical output.

export const exampleIntegrand = (x) => (x * Math.sin(x)) / 4;

const round = (value) => Math.round(value * 100) / 100;

/**
 * Build SVG geometry for a function over [xMin, xMax] at a 1:1 unit scale.
 * The y-range is derived from the box aspect ratio so the curve is never stretched.
 */
export function buildPlot({ width, height, xMin = -10, xMax = 10, steps = 360, tick = 2, fn = exampleIntegrand }) {
  const unit = width / (xMax - xMin);
  const yHalf = height / 2 / unit;
  const sx = (x) => (x - xMin) * unit;
  const sy = (y) => height / 2 - y * unit;

  let d = '';
  for (let i = 0; i <= steps; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    d += `${i === 0 ? 'M' : 'L'}${round(sx(x))} ${round(sy(fn(x)))}`;
  }

  const gridX = [];
  for (let x = Math.ceil(xMin / tick) * tick; x <= xMax; x += tick) {
    if (x !== 0) gridX.push(round(sx(x)));
  }
  const gridY = [];
  for (let y = Math.ceil(-yHalf / tick) * tick; y <= yHalf; y += tick) {
    if (y !== 0) gridY.push(round(sy(y)));
  }

  return { d, width, height, originX: round(sx(0)), originY: round(sy(0)), gridX, gridY };
}
