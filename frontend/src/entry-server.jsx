// Build-time only: tools/prerender-heads.js renders each public route to static
// HTML so crawlers that don't run JavaScript still see the page text.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from '@/App';

export const render = (url) => {
  const html = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  Helmet.renderStatic(); // react-helmet accumulates server-side state unless drained
  return html;
};
