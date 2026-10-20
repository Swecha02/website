#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { categories } from '../src/data/categories.js';
import { states } from '../src/data/states.js';
import { allFaqs } from '../src/data/faqs.js';

const SITE_ORIGIN = 'https://swechaenterprises.com';

// Hand-maintained: matches the public <Route> paths in src/App.jsx. Not derived
// from App.jsx automatically — the JSX there nests <Route>/element deep enough
// (StandaloneLayout wrappers, nested onGetQuoteClick={} braces) that a regex
// can't reliably resolve path -> component without a real JSX parser, which
// is overkill for a handful of routes on a small static site. Add a line here
// whenever a new public page/route is added.
const PUBLIC_ROUTES = [
  { url: '/', priority: '1.0' },
  { url: '/about', priority: '0.8' },
  { url: '/products', priority: '0.8' },
  { url: '/contact', priority: '0.8' },
  { url: '/faq', priority: '0.8' },
  { url: '/connect', priority: '0.5' },
  { url: '/privacy-policy', priority: '0.3' },
  // Data-driven pages: read from the same files the app renders from, so new
  // states/categories land in the sitemap automatically.
  ...Object.keys(states).map((slug) => ({ url: `/${slug}`, priority: '0.9' })),
  ...categories.map((c) => ({ url: `/products/${c.slug}`, priority: '0.8' })),
];

// llms.txt: plain-language summary for AI assistants (llmstxt.org). Facts only —
// every line here may be repeated to a customer, so keep it in step with the site.
function generateLlmsTxt() {
  const link = (url, title, desc) => `- [${title}](${SITE_ORIGIN}${url}): ${desc}`;
  return `# Swecha Enterprises

> Exclusive distributor of physiotherapy and rehabilitation equipment for Andhra Pradesh and Telangana, India — the regional distributor of the Monarc Distribution Network portfolio. Headquartered in Hyderabad, founded in 2023. Supplies hospitals, rehabilitation centres and physiotherapy clinics. One point of contact, start to finish.

## Contact
- Phone: +91 98858 39555 (Mon–Sat, 9am–7pm)
- Email: contact@swechaenterprises.com
- Registered office: 11-3-664/238/A/29, Sajeevapuram, Parsigutta, Hyderabad, Telangana 500061, India
- Quotes: ${SITE_ORIGIN}/contact

## Where we supply
${Object.entries(states).map(([slug, s]) => link(`/${slug}`, s.name, `${s.cities.join(', ')}. Customers include ${s.customers}.`)).join('\n')}

## Equipment categories
${categories.map((c) => link(`/products/${c.slug}`, c.name, `${c.items.map((i) => i.name).join(', ')}.`)).join('\n')}

## Frequently asked questions
${allFaqs.map((f) => `- ${f.q} ${f.a}`).join('\n')}

## Pages
${link('/', 'Home', 'Overview of Swecha Enterprises and its product categories.')}
${link('/about', 'About', 'Company background, founded 2023 in Hyderabad.')}
${link('/products', 'Products', 'Full equipment range by category.')}
${link('/contact', 'Contact', 'Phone, email, office address and quote request form.')}
${link('/faq', 'FAQ', 'Buying, costs, demos, delivery times, warranty and service response.')}
`;
}

function generateSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urlEntries = PUBLIC_ROUTES
    .map(({ url, priority }) =>
      `  <url>\n    <loc>${SITE_ORIGIN}${url}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

function main() {
  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), generateLlmsTxt(), 'utf8');
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), generateSitemapXml(), 'utf8');
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main();
}
