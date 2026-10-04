'use strict';
const assert = require('node:assert/strict');
const { anchors, element, textOf } = require('./render.cjs');
let checks = 0;
function check(condition, message) { checks++; assert.ok(condition, message); }

function assertLegalPage(html, key) {
  const main = element(html, 'main');
  const text = textOf(main);
  check(text.includes('Brooks Invest LLC'), `${key}: approved operator/controller`);
  check(/Effective date: October 4, 2026/.test(text) && /<time\b[^>]*datetime="2026-10-04"/i.test(main), `${key}: actual publication date`);
  check(anchors(main).some((a) => a.href === '/contact/'), `${key}: monitored contact route`);
  check(!/\b(?:TBD|TODO|PLACEHOLDER)\b|example\.com|\[(?:COMPANY|EMAIL|ADDRESS|STATE|DATE)\]/i.test(text), `${key}: no legal placeholders`);
  check(!/\b(?:COPPA|FERPA|GDPR|CCPA|HIPAA|SOC\s*2)\s+compliant|school-district approved|enterprise certified/i.test(text), `${key}: no unsupported certification claims`);
  const headings = [...main.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) => textOf(match[1]));
  const required = key === 'privacy'
    ? ['Who operates Calcura', 'Account and authentication information', 'Learning and progress information', 'Classroom information', 'Billing information', 'Contact and support submissions', 'How information is used', 'Local browser and app storage', 'Service providers and data sharing', 'Retention', 'Security', 'Account deletion and data export', 'Children and educational institutions', 'International access', 'Policy changes', 'Contact Calcura']
    : ['Agreement to these Terms', 'Eligibility', 'Accounts', 'Educational use', 'Subscriptions and billing', 'Renewal', 'Cancellation', 'Refunds', 'Acceptable use', 'Intellectual property', 'User-provided content and data', 'Service availability', 'Termination', 'Disclaimers', 'Limitation of liability', 'Changes', 'Contact'];
  for (const heading of required) check(headings.includes(heading), `${key}: ${heading}`);
  if (key === 'terms') {
    check(text.includes('Fees are non-refundable except where required by law or where Calcura expressly states otherwise at purchase.'), 'terms: exact approved refund wording');
    check(/monthly or annual/.test(text) && /period end/.test(text), 'terms: existing renewal/cancellation contract');
  } else {
    for (const provider of ['Supabase', 'Stripe', 'Formspree', 'GitHub Pages']) check(text.includes(provider), `privacy: actual provider ${provider}`);
    check(text.includes('no universal automatic deletion period') && text.includes('does not necessarily erase every billing or security record immediately'), 'privacy: truthful retention limits');
    check(text.includes('children under 13') && text.includes('not approved by default'), 'privacy: existing education boundary');
  }
}
function assertLegalNavigation(html, label) {
  const links = anchors(element(html, 'footer'));
  for (const [text, href] of [['Privacy', '/privacy/'], ['Terms', '/terms/'], ['Contact', '/contact/']]) check(links.some((link) => link.text === text && link.href === href), `${label}: persistent ${text} link`);
}
process.on('exit', (code) => { if (code === 0) console.log(`Legal publication: ${checks} assertions PASS`); });
module.exports = { assertLegalPage, assertLegalNavigation };
