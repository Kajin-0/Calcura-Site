const assert = require('node:assert/strict');

// GitHub Pages cannot supply custom response headers. A head meta policy
// protects this document's resource loads, not framing/HSTS or /app/ navigations.
function assertSecurityPolicy(html, label) {
  const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"\s*\/?\s*>/);
  assert.ok(meta, `${label}: CSP is required`);
  assert.ok(html.indexOf(meta[0]) < html.indexOf('<script'), `${label}: CSP must precede scripts`);
  const directives = new Map(meta[1].split(';').map((part) => {
    const [name, ...values] = part.trim().split(/\s+/);
    return [name, values.join(' ')];
  }));
  for (const [name, value] of Object.entries({
    'default-src': "'self'", 'script-src': "'self'",
    'style-src': "'self' 'unsafe-inline'", 'img-src': "'self' data:",
    'font-src': "'self'", 'connect-src': "'self' https://formspree.io",
    'form-action': "'self' https://formspree.io", 'base-uri': "'self'",
    'object-src': "'none'", 'frame-src': "'none'",
  })) assert.equal(directives.get(name), value, `${label}: restrictive ${name}`);
  assert.ok(!directives.has('frame-ancestors'), `${label}: do not claim meta-only frame protection`);
  assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin"\s*\/?\s*>/, `${label}: restrict cross-origin referrers`);
}
module.exports = { assertSecurityPolicy };
