#!/usr/bin/env node
// Post-build: write dist/<route>.html copies of index.html with that route's
// title, description, canonical and Open Graph tags baked in, so crawlers and
// link previews (WhatsApp, LinkedIn, Bing) that don't run JavaScript see the
// right page. nginx serves them via `try_files $uri $uri.html /index.html`.
// The React app still boots normally from each copy.
import fs from 'fs';
import path from 'path';
import { categories } from '../src/data/categories.js';
import { states } from '../src/data/states.js';
// Built by `vite build --ssr` (see package.json) just before this script runs.
import { render as renderBody } from '../node_modules/.cache/ssr/entry-server.js';

const SITE = 'https://swechaenterprises.com';
const DIST = 'dist';
const DEFAULT_IMAGE = `${SITE}/images/swecha-logo.jpg`;

// Static pages: read the <Helmet> title/description straight from the page
// source so there's one place to edit them.
const staticPages = {
  '/': 'HomePage',
  '/about': 'AboutPage',
  '/products': 'ProductsPage',
  '/contact': 'ContactPage',
  '/faq': 'FAQPage',
  '/privacy-policy': 'PrivacyPolicyPage',
  '/connect': 'QRLandingPage',
};

const decode = (s) => s.replace(/&amp;/g, '&');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function fromHelmet(file) {
  const src = fs.readFileSync(`src/pages/${file}.jsx`, 'utf8');
  const helmet = src.match(/<Helmet>([\s\S]*?)<\/Helmet>/)?.[1] ?? '';
  const title = helmet.match(/<title>([^<{]+)<\/title>/)?.[1];
  const description = helmet.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!title || !description) throw new Error(`prerender-heads: no static title/description in ${file}.jsx`);
  return { title: decode(title.trim()), description: decode(description) };
}

const routes = [
  ...Object.entries(staticPages).map(([route, file]) => ({ route, ...fromHelmet(file) })),
  ...Object.entries(states).map(([slug, s]) => ({ route: `/${slug}`, title: s.title, description: s.description })),
  ...categories.map((c) => ({
    route: `/products/${c.slug}`,
    title: `${c.title} | Swecha Enterprises`,
    description: c.description,
    // Link previews need JPG (LinkedIn/WhatsApp are unreliable with webp).
    image: c.hero && `${SITE}${c.hero.replace('/images/', '/images/og/').replace('.webp', '.jpg')}`,
  })),
];

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function renderPage({ route, title, description, image }) {
  // /connect reads window.location while rendering, so it keeps the empty shell.
  const body = route === '/connect' ? { html: '', scripts: '' } : renderBody(route);
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`],
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(description)}"`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(title)}"`],
    [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(description)}"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`],
    [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${image || DEFAULT_IMAGE}"`],
    [/<\/head>/, `\t<link rel="canonical" href="${url}" />\n${body.scripts ? `\t${body.scripts}\n` : ''}\t</head>`],
    // Page text (and the page's Helmet JSON-LD above) for crawlers that don't run
    // JavaScript; createRoot replaces the text on load and Helmet takes over its tags.
    [/<div id="root"><\/div>/, `<div id="root">${body.html}</div>`],
  ];
  return swaps.reduce((html, [re, rep]) => {
    if (!re.test(html)) throw new Error(`prerender-heads: pattern ${re} not found in dist/index.html`);
    return html.replace(re, () => rep); // function form: page text may contain "$"
  }, template);
}

for (const r of routes) {
  const out = r.route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${r.route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderPage(r));
}
console.log(`prerender-heads: wrote ${routes.length} route heads`);
