#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const page = read('src/ClassroomPage.jsx');
const shared = read('src/siteShared.jsx');
const home = read('src/main.jsx');
const metadata = read('classroom/index.html');
const refinements = read('src/refinements.css');
let checks = 0;
function check(condition, message) { checks++; assert.ok(condition, message); }

check(shared.includes("TEACHER_SIGN_IN_URL = 'https://classroom.calcura.study/signin'"), 'Teacher entry must use the real OTP sign-in endpoint');
check(page.includes('TEACHER_SIGN_IN_URL, WEB_APP_URL'), 'Classroom page must use the shared teacher/student destinations');
check((page.match(/href={TEACHER_SIGN_IN_URL}/g) || []).length === 6, 'Hero, current tiers, and final teacher CTAs must use the actual sign-in flow');
check((page.match(/href={WEB_APP_URL}/g) || []).length === 2, 'Students must have direct routes to the free app');
check(shared.includes("WEB_APP_URL = '/app/'"), 'Free student app must retain its correct mount path');
check(page.includes('Live now'), 'The page must identify the current live product');
check(/six-digit code/.test(page) && /account on first sign-in/.test(page), 'New teachers must understand the existing email-code account flow');
check(!/\/signup\b/.test(page + shared + home), 'Do not invent a signup route');
for (const obsolete of [/request (?:a )?pilot/i, /founding[- ]pilot/i, /pilot pricing/i, /Small Team/, /\$(?:39|79|199)\b/, /production authentication.*remain/i, /seat controls/i, /CSV export/i]) {
  check(!obsolete.test(page + metadata + home + refinements + read('contact/index.html')), `Obsolete or unsupported claim must not return: ${obsolete}`);
}
check(!/DashboardPreview|PORTAL PREVIEW|M\. Chen|486|71%/.test(page), 'Do not represent fabricated dashboard users or metrics as the product');
for (const tier of ['Teacher', 'Pro', 'Team', 'School', 'University']) {
  check(page.includes(`data-tier="${tier}"`), `The ${tier} tier must remain represented`);
}
for (const tier of ['Team', 'School', 'University']) {
  const article = page.match(new RegExp(`<article data-tier="${tier}">([\\s\\S]*?)</article>`))?.[1] || '';
  check(/planned/i.test(article), `${tier} must be clearly marked as not currently launched`);
  check(!/\$|<a\b|<button\b|\b\d+\s*seats/.test(article), `${tier} must not invent pricing, seat allocations, or checkout actions`);
}
check(/Quote-only/.test(page), 'University must remain quote-only');
check(page.includes('$19') && page.includes('/ month') && page.includes('$149 / year') && page.includes('USD'), 'Current Pro pricing must be $19 monthly / $149 annually in USD');
check(/data-tier="Teacher"[\s\S]*?classroom-tier-price">Free/.test(page), 'Teacher must be the current free entry tier');
check(page.includes('Calcura stays free for students.') && page.includes('without buying Pro'), 'Student practice and class participation must remain described as free');
check(!/founding/i.test(page), 'Do not advertise an unimplemented Founding Pro promotion');
check(!/checkout\.stripe\.com|price_[a-z0-9]+|buy\.stripe\.com/i.test(page), 'Public copy must not invent billing checkout authority');
check(shared.includes('href={TEACHER_SIGN_IN_URL}>Teacher sign in') && home.includes('href={TEACHER_SIGN_IN_URL}>Teacher sign in'), 'Teacher sign-in must be discoverable in site navigation');
check(metadata.includes('href="https://calcura.study/classroom/"') && metadata.includes('Calcura Classroom is live.'), 'Canonical and metadata must reflect the real Classroom page');
console.log(`classroom-production-entry-regression passed (${checks} assertions)`);
