/**
 * Publish Calcura.apk to GitHub Releases (no gh CLI).
 * Usage: node scripts/publish-android-apk.cjs <apk-path> <tag> [release-title]
 */
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const apkPath = path.resolve(process.argv[2] || '');
const tagName = process.argv[3] || 'android-v1.0.41';
const releaseName = process.argv[4] || 'Android 1.0.41';
const repo = 'Kajin-0/Calcura-Site';

if (!apkPath || !fs.existsSync(apkPath)) {
  console.error('APK not found:', apkPath || '(missing path)');
  process.exit(1);
}

function getGitHubToken() {
  const input = 'protocol=https\nhost=github.com\n\n';
  const result = spawnSync('git', ['credential', 'fill'], {
    input,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error(`git credential fill failed: ${result.stderr || result.status}`);
  }
  for (const line of result.stdout.split(/\r?\n/)) {
    if (line.startsWith('password=')) {
      return line.slice('password='.length);
    }
  }
  throw new Error('No GitHub token from git credential');
}

async function ghJson(method, urlPath, body) {
  const token = getGitHubToken();
  const res = await fetch(`https://api.github.com${urlPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${method} ${urlPath} ${res.status}: not JSON: ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    throw new Error(`${method} ${urlPath} ${res.status}: ${json.message || text}`);
  }
  return json;
}

async function main() {
  const stat = fs.statSync(apkPath);
  const body =
    `Calcura Android ${tagName.replace(/^android-v/, '')} (APK ${stat.size} bytes).\n` +
    'Site download URL: releases/latest/download/Calcura.apk';

  const release = await ghJson('POST', `/repos/${repo}/releases`, {
    tag_name: tagName,
    name: releaseName,
    body,
    make_latest: 'true',
  });

  const uploadUrl = release.upload_url.replace(/\{\?name,label\}/, '?name=Calcura.apk');
  const token = getGitHubToken();
  const apk = fs.readFileSync(apkPath);
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Length': String(apk.length),
    },
    body: apk,
  });
  const uploadText = await uploadRes.text();
  let asset;
  try {
    asset = JSON.parse(uploadText);
  } catch {
    throw new Error(`upload ${uploadRes.status}: not JSON: ${uploadText.slice(0, 200)}`);
  }
  if (!uploadRes.ok) {
    throw new Error(`upload ${uploadRes.status}: ${asset.message || uploadText}`);
  }

  const latest = await ghJson('GET', `/repos/${repo}/releases/latest`);
  console.log('published', {
    tag: release.tag_name,
    asset: asset.name,
    size: asset.size,
    latestTag: latest.tag_name,
  });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
