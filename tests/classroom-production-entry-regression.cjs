#!/usr/bin/env node
// Classroom production-entry invariants.
//
// Copy, navigation, and tier structure are asserted against the RENDERED pages (the markup visitors
// receive), so refactors of component layout cannot silently drop an entry point. Constants and
// source-level call counts are still pinned where the source is the contract.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { renderPage, anchors, element, textOf } = require('./helpers/render.cjs');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readCss = () =>
  fs
    .readdirSync(path.join(root, 'src', 'styles'))
    .filter((name) => name.endsWith('.css'))
    .map((name) => read(`src/styles/${name}`))
    .join('\n');

const links = read('src/site/links.js');
const page = read('src/pages/ClassroomPage.jsx');
const homeSource = read('src/pages/HomePage.jsx');
const metadata = read('classroom/index.html');

const SIGN_IN = 'https://classroom.calcura.study/signin';
const SIGN_UP = 'https://classroom.calcura.study/signup';

const home = renderPage('home');
const classroom = renderPage('classroom');
const contact = renderPage('contact');
const classroomMain = element(classroom, 'main');
const classroomText = textOf(classroomMain);

let checks = 0;
function check(condition, message) {
  checks++;
  assert.ok(condition, message);
}

// --- Destinations -----------------------------------------------------------------------------
check(links.includes(`TEACHER_SIGN_IN_URL = '${SIGN_IN}'`), 'Teacher entry must use the real OTP sign-in endpoint');
check(links.includes(`TEACHER_SIGN_UP_URL = '${SIGN_UP}'`), 'Classroom page signup must use the real production signup endpoint');
check(links.includes("WEB_APP_URL = '/app/'"), 'Free student app must retain its correct mount path');
check(
  /import \{[^}]*TEACHER_SIGN_IN_URL[^}]*WEB_APP_URL[^}]*\} from '\.\.\/site\/links\.js'/.test(page) ||
    /import \{[^}]*WEB_APP_URL[^}]*TEACHER_SIGN_IN_URL[^}]*\} from '\.\.\/site\/links\.js'/.test(page),
  'Classroom page must use the shared teacher/student destinations'
);

// Source-level call counts for the page body itself (chrome is asserted separately below).
check((page.match(/href=\{TEACHER_SIGN_UP_URL\}/g) || []).length >= 3, 'Hero, Teacher tier, and final CTA must expose teacher signup');
check((page.match(/href=\{TEACHER_SIGN_IN_URL\}/g) || []).length >= 3, 'Hero, Pro, and final CTA must retain teacher sign-in');
check((page.match(/href=\{WEB_APP_URL\}/g) || []).length === 2, 'Students must have direct routes to the free app');

// Rendered body: the same guarantees must hold in what visitors actually get.
const mainAnchors = anchors(classroomMain);
check(mainAnchors.filter((a) => a.href === SIGN_UP).length >= 3, 'Rendered Classroom must expose teacher signup at least three times');
check(mainAnchors.filter((a) => a.href === SIGN_IN).length >= 3, 'Rendered Classroom must retain teacher sign-in at least three times');
check(mainAnchors.filter((a) => a.href === '/app/').length === 2, 'Rendered Classroom must route students to the free app exactly twice');

check(classroomText.includes('Live now'), 'The page must identify the current live product');
check(/six-digit code/.test(classroomText) && /created when you verify the code/.test(classroomText), 'New teachers must understand the existing email-code account creation flow');

// --- Site chrome: header, Classroom promotion, footer -----------------------------------------
const homeHeader = element(home, 'header');
const homePromo = element(home, 'section', 'classroom-promo');
const homeFooter = element(home, 'footer');
check(homeHeader && homePromo && homeFooter, 'Home must render a header, a Classroom promotion, and a footer');

const headerTeacher = anchors(homeHeader).filter((a) => a.href === SIGN_IN);
check(headerTeacher.length === 1, 'Root navigation must expose exactly one teacher auth entry');
check(
  headerTeacher[0].text === 'Teacher access' && headerTeacher[0].className === 'button button-secondary button-small',
  'Root teacher entry must be one secondary Teacher access button'
);
check(!/Create free teacher account|Teacher sign in/.test(textOf(homeHeader)), 'Root navigation must not offer competing teacher signup and sign-in actions');

const promoAnchors = anchors(homePromo);
check(
  promoAnchors.some((a) => a.href === SIGN_IN && a.className === 'button button-white' && a.text === 'Teacher access'),
  'Root Classroom promotion primary CTA must be Teacher access'
);
check(
  promoAnchors.some((a) => a.href === '/classroom/' && a.className === 'button button-ghost-light' && a.text === 'Explore Classroom'),
  'Root Classroom promotion secondary CTA must explore Classroom'
);
check(!/Create free teacher account|Teacher sign in/.test(textOf(homePromo)), 'Root Classroom promotion must not offer competing auth actions');
check(
  anchors(element(home, 'main')).some((a) => a.href === '/classroom/' && a.text.startsWith('Explore Calcura Classroom')),
  'Root homepage must preserve Classroom product discovery'
);

const footerAnchors = anchors(homeFooter);
check(
  footerAnchors.some((a) => a.href === SIGN_IN && a.text === 'Teacher access') &&
    footerAnchors.some((a) => a.href === '/classroom/' && a.text === 'Classroom'),
  'Root footer must keep Teacher access and Classroom discoverable'
);
check(!/Create free teacher account|Teacher sign in/.test(textOf(homeFooter)), 'Root footer must not split teacher signup and sign-in');

// Every page shares the same chrome, so teacher access is reachable from Classroom and Contact too.
for (const [name, html] of [['classroom', classroom], ['contact', contact]]) {
  const header = element(html, 'header');
  check(
    anchors(header).filter((a) => a.href === SIGN_IN && a.text === 'Teacher access').length === 1,
    `The ${name} page header must keep exactly one teacher sign-in entry`
  );
  check(
    anchors(header).some((a) => a.href === '/classroom/' && a.text === 'Classroom'),
    `The ${name} page header must keep Classroom navigation`
  );
}
check(!/Create free teacher account|Teacher sign in/.test(textOf(homeHeader) + textOf(homePromo) + textOf(homeFooter)), 'Root homepage must not present signup and sign-in as separate teacher actions');
check(homeSource.includes('/classroom/'), 'Home source must still link to Classroom');

// --- Claims that must never return ------------------------------------------------------------
const corpus = [
  page,
  metadata,
  homeSource,
  readCss(),
  read('contact/index.html'),
  textOf(home),
  classroomText,
  textOf(contact),
].join('\n');
for (const obsolete of [/request (?:a )?pilot/i, /founding[- ]pilot/i, /pilot pricing/i, /Small Team/, /\$(?:39|79|199)\b/, /production authentication.*remain/i, /seat controls/i, /CSV export/i]) {
  check(!obsolete.test(corpus), `Obsolete or unsupported claim must not return: ${obsolete}`);
}
check(!/DashboardPreview|PORTAL PREVIEW|M\. Chen|486|71%/.test(page + classroomText), 'Do not represent fabricated dashboard users or metrics as the product');

// --- Tiers --------------------------------------------------------------------------------------
for (const tier of ['Teacher', 'Pro', 'Team', 'School', 'University']) {
  check(page.includes(`data-tier="${tier}"`), `The ${tier} tier must remain represented in source`);
  check(classroom.includes(`data-tier="${tier}"`), `The ${tier} tier must remain represented in the rendered page`);
}
for (const tier of ['Team', 'School', 'University']) {
  const article = element(classroom, 'article', `data-tier="${tier}"`);
  check(Boolean(article), `${tier} must render as its own tier article`);
  check(/planned/i.test(article), `${tier} must be clearly marked as not currently launched`);
  check(!/\$|<a\b|<button\b|\b\d+\s*seats/.test(article), `${tier} must not invent pricing, seat allocations, or checkout actions`);
}
check(/Quote-only/.test(classroomText), 'University must remain quote-only');
check(
  classroomText.includes('$19') && classroomText.includes('/ month') && classroomText.includes('$149 / year') && classroomText.includes('USD'),
  'Current Pro pricing must be $19 monthly / $149 annually in USD'
);
check(/data-tier="Teacher"[\s\S]*?classroom-tier-price">Free</.test(classroom), 'Teacher must be the current free entry tier');
check(
  classroomText.includes('Calcura stays free for students.') && classroomText.includes('without buying Pro'),
  'Student practice and class participation must remain described as free'
);
check(!/founding/i.test(page + classroomText), 'Do not advertise an unimplemented Founding Pro promotion');
check(!/checkout\.stripe\.com|price_[a-z0-9]+|buy\.stripe\.com/i.test(page + classroom), 'Public copy must not invent billing checkout authority');
check(metadata.includes('href="https://calcura.study/classroom/"') && metadata.includes('Calcura Classroom is live.'), 'Canonical and metadata must reflect the real Classroom page');

console.log(`classroom-production-entry-regression passed (${checks} assertions)`);
