const assert = require('node:assert/strict');
const fs = require('node:fs');
const workflow = fs.readFileSync('.github/workflows/deploy-pages.yml', 'utf8');
assert.match(workflow, /run: npm ci/);
assert.doesNotMatch(workflow, /npm install/);
for (const gate of ['test:classroom-entry', 'test:download-chooser-a11y', 'test:deployment-gates']) {
  assert.ok(workflow.indexOf(`npm run ${gate}`) > 0);
  assert.ok(workflow.indexOf(`npm run ${gate}`) < workflow.indexOf('actions/upload-pages-artifact'));
}
assert.ok(workflow.indexOf('npm run build') < workflow.indexOf('actions/upload-pages-artifact'));
assert.match(workflow, /needs: build/);
assert.match(workflow, /cancel-in-progress: true/);
assert.doesNotMatch(workflow, /git (?:pull|checkout)|ref: main/);
console.log('Site deployment gates: 12 assertions PASS (same workflow SHA, tests before upload)');
