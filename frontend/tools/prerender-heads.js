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

// Page-level schema.org data; links to the Organization block in index.html by @id.
const ORG = { '@id': `${SITE}/#organization` };
const AREAS = Object.values(states).map((s) => ({ '@type': 'State', name: s.name }));
const service = (name, url, areaServed) => ({ '@context': 'https://schema.org', '@type': 'Service', name, url, provider: ORG, areaServed });
const crumbs = (...items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

const routes = [
  ...Object.entries(staticPages).map(([route, file]) => ({ route, ...fromHelmet(file) })),
  ...Object.entries(states).map(([slug, s]) => ({
    route: `/${slug}`, title: s.title, description: s.description,
    jsonld: [service(`Physiotherapy & rehabilitation equipment supply in ${s.name}`, `${SITE}/${slug}`, { '@type': 'State', name: s.name })],
  })),
  ...categories.map((c) => ({
    route: `/products/${c.slug}`,
    title: `${c.title} | Swecha Enterprises`,
    description: c.description,
    // Link previews need JPG (LinkedIn/WhatsApp are unreliable with webp).
    image: c.hero && `${SITE}${c.hero.replace('/images/', '/images/og/').replace('.webp', '.jpg')}`,
    jsonld: [
      service(c.name, `${SITE}/products/${c.slug}`, AREAS),
      crumbs(['Home', `${SITE}/`], ['Products', `${SITE}/products`], [c.name, `${SITE}/products/${c.slug}`]),
    ],
  })),
];

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function renderPage({ route, title, description, image, jsonld = [] }) {
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`],
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(description)}"`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(title)}"`],
    [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(description)}"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`],
    [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${image || DEFAULT_IMAGE}"`],
    [/<\/head>/, `\t<link rel="canonical" href="${url}" />\n${jsonld.map((d) => `\t<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>\n`).join('')}\t</head>`],
    // Page text for crawlers that don't run JavaScript; createRoot replaces it on load.
    // /connect reads window.location while rendering, so it keeps the empty shell.
    [/<div id="root"><\/div>/, `<div id="root">${route === '/connect' ? '' : renderBody(route)}</div>`],
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
