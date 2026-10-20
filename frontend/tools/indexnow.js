#!/usr/bin/env node
// Tells Bing (and other IndexNow engines) every sitemap URL changed, so ChatGPT
// search / Copilot pick up edits quickly. Run after a content deploy:
//   npm run indexnow
// The key file public/<key>.txt proves we own the host.
import fs from 'fs';

const HOST = 'swechaenterprises.com';
const keyFile = fs.readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('indexnow: no public/<32-hex>.txt key file');
const key = keyFile.slice(0, -4);
const urlList = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`indexnow: ${urlList.length} URLs -> HTTP ${res.status}`);
if (!res.ok) process.exit(1);
