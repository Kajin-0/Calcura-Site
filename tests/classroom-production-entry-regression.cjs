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
check((page.match(/href={TEACHER_SIGN_UP_URL}/g) || []).length >= 3, 'Hero, Teacher tier, and final CTA must expose teacher signup');
check((page.match(/href={TEACHER_SIGN_IN_URL}/g) || []).length >= 3, 'Hero, Pro, and final CTA must retain teacher sign-in');
check((page.match(/href={WEB_APP_URL}/g) || []).length === 2, 'Students must have direct routes to the free app');
check(shared.includes("WEB_APP_URL = '/app/'"), 'Free student app must retain its correct mount path');
check(page.includes('Live now'), 'The page must identify the current live product');
check(/six-digit code/.test(page) && /created when you verify the code/.test(page), 'New teachers must understand the existing email-code account creation flow');
check(page.includes("TEACHER_SIGN_UP_URL = 'https://classroom.calcura.study/signup'"), 'Classroom page signup must use the real production signup endpoint');
const homeHeader = home.match(/<header\b[\s\S]*?<\/header>/)?.[0] || '';
const homePromo = home.match(/<section className="section pilot-section">[\s\S]*?<\/section>/)?.[0] || '';
const homeFooter = home.match(/<footer>[\s\S]*?<\/footer>/)?.[0] || '';
const homeTeacherAuth = homeHeader.match(/href={TEACHER_SIGN_IN_URL}>Teacher access/g) || [];
check(homeTeacherAuth.length === 1, 'Root navigation must expose exactly one teacher auth entry');
check(homeHeader.includes('className="button button-secondary button-small" href={TEACHER_SIGN_IN_URL}>Teacher access'), 'Root teacher entry must be one secondary Teacher access button');
check(!homeHeader.includes('Create free teacher account') && !homeHeader.includes('Teacher sign in'), 'Root navigation must not offer competing teacher signup and sign-in actions');
check(homePromo.includes('className="button button-white" href={TEACHER_SIGN_IN_URL}>Teacher access'), 'Root Classroom promotion primary CTA must be Teacher access');
check(homePromo.includes('className="button button-ghost-light" href="/classroom/">Explore Classroom'), 'Root Classroom promotion secondary CTA must explore Classroom');
check(!homePromo.includes('Create free teacher account') && !homePromo.includes('Teacher sign in'), 'Root Classroom promotion must not offer competing auth actions');
check(home.includes('href="/classroom/">Explore Calcura Classroom'), 'Root homepage must preserve Classroom product discovery');
check(homeFooter.includes('href={TEACHER_SIGN_IN_URL}>Teacher access') && homeFooter.includes('href="/classroom/">Classroom'), 'Root footer must keep Teacher access and Classroom discoverable');
check(!homeFooter.includes('Create free teacher account') && !homeFooter.includes('Teacher sign in'), 'Root footer must not split teacher signup and sign-in');
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
check(shared.includes('href={TEACHER_SIGN_IN_URL}>Teacher sign in'), 'Classroom navigation must keep teacher sign-in');
check(!/Create free teacher account|Teacher sign in/.test(homeHeader + homePromo + homeFooter), 'Root homepage must not present signup and sign-in as separate teacher actions');
check(metadata.includes('href="https://calcura.study/classroom/"') && metadata.includes('Calcura Classroom is live.'), 'Canonical and metadata must reflect the real Classroom page');
console.log(`classroom-production-entry-regression passed (${checks} assertions)`);
