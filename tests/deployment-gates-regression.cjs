const assert = require('node:assert/strict');
const fs = require('node:fs');
const workflow = fs.readFileSync('.github/workflows/deploy-pages.yml', 'utf8');
const check = fs.readFileSync('.github/workflows/check.yml', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let assertions = 0;
const ok = (condition, message) => { assertions++; assert.ok(condition, message); };
const match = (value, pattern, message) => { assertions++; assert.match(value, pattern, message); };
const noMatch = (value, pattern, message) => { assertions++; assert.doesNotMatch(value, pattern, message); };

const upload = workflow.indexOf('actions/upload-pages-artifact');
const build = workflow.indexOf('npm run build');
const SOURCE_GATES = ['test:classroom-entry', 'test:download-chooser-a11y', 'test:site-quality', 'test:deployment-gates'];
const ARTIFACT_GATES = ['test:built-site'];

match(workflow, /run: npm ci/);
noMatch(workflow, /npm install/);
ok(upload > 0 && build > 0, 'deploy workflow must build and upload a Pages artifact');

// Source gates run before anything is built or uploaded.
for (const gate of SOURCE_GATES) {
  const at = workflow.indexOf(`npm run ${gate}`);
  ok(at > 0, `deploy workflow must run ${gate}`);
  ok(at < build, `${gate} must run before the build`);
  ok(at < upload, `${gate} must run before the artifact upload`);
}
// Artifact gates inspect dist/, so they must run after the build and still before upload.
for (const gate of ARTIFACT_GATES) {
  const at = workflow.indexOf(`npm run ${gate}`);
  ok(at > 0, `deploy workflow must run ${gate}`);
  ok(at > build, `${gate} must run after the build it inspects`);
  ok(at < upload, `${gate} must run before the artifact upload`);
}
ok(build < upload, 'build must precede the artifact upload');
match(workflow, /needs: build/);
match(workflow, /cancel-in-progress: true/);
noMatch(workflow, /git (?:pull|checkout)|ref: main/);

// Pull requests get the same gates, so a green check means a green deploy.
for (const gate of [...SOURCE_GATES, ...ARTIFACT_GATES]) ok(check.includes(`npm run ${gate}`), `check workflow must run ${gate}`);
ok(check.indexOf('npm run test:built-site') > check.indexOf('npm run build'), 'check workflow must test dist/ after building it');

// Every gate named by a workflow is a real script, and the build prerenders.
for (const gate of [...SOURCE_GATES, ...ARTIFACT_GATES]) ok(pkg.scripts[gate], `package.json must define ${gate}`);
match(pkg.scripts.build, /prerender\.mjs/, 'build must prerender pages');
match(pkg.scripts.build, /--ssr/, 'build must produce the SSR bundle used for prerendering');

console.log(`Site deployment gates: ${assertions} assertions PASS (same workflow SHA, source gates before build, artifact gate before upload)`);
