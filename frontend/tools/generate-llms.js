#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const CLEAN_CONTENT_REGEX = {
  comments: /\/\*[\s\S]*?\*\/|(?<!:)\/\/.*$/gm,
  templateLiterals: /`[\s\S]*?`/g,
  strings: /'[^']*'|"[^"]*"/g,
  jsxExpressions: /\{.*?\}/g,
  htmlEntities: {
    quot: /&quot;/g,
    amp: /&amp;/g,
    lt: /&lt;/g,
    gt: /&gt;/g,
    apos: /&apos;/g
  }
};

const EXTRACTION_REGEX = {
  route: /<Route\s+[^>]*>/g,
  path: /path=["']([^"']+)["']/,
  element: /element=\{<(\w+)[^}]*\/?\s*>\}/,
  helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
  helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
  title: /<title[^>]*?>\s*(.*?)\s*<\/title>/i,
  description: /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i
};

function cleanContent(content) {
  return content
    .replace(CLEAN_CONTENT_REGEX.comments, '')
    .replace(CLEAN_CONTENT_REGEX.templateLiterals, '""')
    .replace(CLEAN_CONTENT_REGEX.strings, '""');
}

function cleanText(text) {
  if (!text) return text;
  
  return text
    .replace(CLEAN_CONTENT_REGEX.jsxExpressions, '')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, '&')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, '<')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, '>')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
    .trim();
}

function extractRoutes(appJsxPath) {
  if (!fs.existsSync(appJsxPath)) return new Map();

  try {
    const content = fs.readFileSync(appJsxPath, 'utf8');
    const routes = new Map();
    const routeMatches = [...content.matchAll(EXTRACTION_REGEX.route)];
    
    for (const match of routeMatches) {
      const routeTag = match[0];
      const pathMatch = routeTag.match(EXTRACTION_REGEX.path);
      const elementMatch = routeTag.match(EXTRACTION_REGEX.element);
      const isIndex = routeTag.includes('index');
      
      if (elementMatch) {
        const componentName = elementMatch[1];
        let routePath;
        
        if (isIndex) {
          routePath = '/';
        } else if (pathMatch) {
          routePath = pathMatch[1].startsWith('/') ? pathMatch[1] : `/${pathMatch[1]}`;
        }
        
        routes.set(componentName, routePath);
      }
    }

    return routes;
  } catch (error) {
    return new Map();
  }
}

function findReactFiles(dir) {
  return fs.readdirSync(dir).map(item => path.join(dir, item));
}

function extractHelmetData(content, filePath, routes) {
  const cleanedContent = cleanContent(content);
  
  if (!EXTRACTION_REGEX.helmetTest.test(cleanedContent)) {
    return null;
  }
  
  const helmetMatch = content.match(EXTRACTION_REGEX.helmet);
  if (!helmetMatch) return null;
  
  const helmetContent = helmetMatch[1];
  const titleMatch = helmetContent.match(EXTRACTION_REGEX.title);
  const descMatch = helmetContent.match(EXTRACTION_REGEX.description);
  
  const title = cleanText(titleMatch?.[1]);
  const description = cleanText(descMatch?.[1]);
  
  const fileName = path.basename(filePath, path.extname(filePath));
  const hasRoutes = (routes.size ?? routes.length) > 0;
  const url = hasRoutes && routes.has(fileName)
    ? routes.get(fileName)
    : generateFallbackUrl(fileName);
  
  return {
    url,
    title: title || 'Untitled Page',
    description: description || 'No description available'
  };
}

function generateFallbackUrl(fileName) {
  const cleanName = fileName.replace(/Page$/, '').toLowerCase();
  return cleanName === 'app' ? '/' : `/${cleanName}`;
}

function generateLlmsTxt(pages) {
  const sortedPages = pages.sort((a, b) => a.title.localeCompare(b.title));
  const pageEntries = sortedPages.map(page =>
    `- [${page.title}](${page.url}): ${page.description}`
  ).join('\n');

  return `## Pages\n${pageEntries}`;
}

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
  { url: '/connect', priority: '0.5' },
  { url: '/privacy-policy', priority: '0.3' },
];

function generateSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urlEntries = PUBLIC_ROUTES
    .map(({ url, priority }) =>
      `  <url>\n    <loc>${SITE_ORIGIN}${url}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function processPageFile(filePath, routes) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractHelmetData(content, filePath, routes);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');

  let pages = [];
  
  if (!fs.existsSync(pagesDir)) {
    pages.push(processPageFile(appJsxPath, []))
    pages = pages.filter(Boolean);
  } else {
    const routes = extractRoutes(appJsxPath);
    const reactFiles = findReactFiles(pagesDir);

    pages = reactFiles
      .map(filePath => processPageFile(filePath, routes))
      .filter(Boolean);
  }

  if (pages.length === 0) {
    console.error('❌ No pages with Helmet components found!');
    process.exit(1);
  }


  const llmsTxtContent = generateLlmsTxt(pages);
  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');

  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');

  const sitemapContent = generateSitemapXml();
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main();
}
