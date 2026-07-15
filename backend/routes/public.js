import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { pool } from '../db.js';
import { sendNotificationEmail } from '../mailer.js';
import { redisClient } from '../redisClient.js';

const router = Router();

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix: 'rl:form:',
  }),
});

const trackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix: 'rl:track:',
  }),
});

// ---- Analytics tracking (fire-and-forget from the frontend) ----

router.post('/track/page-visit', trackLimiter, async (req, res) => {
  const { page_name } = req.body;
  try {
    await pool.query('INSERT INTO page_visits (page_name) VALUES ($1)', [page_name || 'Unknown']);
  } catch (err) {
    console.warn('page-visit tracking failed:', err.message);
  }
  res.status(204).end();
});

router.post('/track/button-click', trackLimiter, async (req, res) => {
  const { button_name } = req.body;
  try {
    await pool.query('INSERT INTO button_clicks (button_name) VALUES ($1)', [button_name || 'Unknown']);
  } catch (err) {
    console.warn('button-click tracking failed:', err.message);
  }
  res.status(204).end();
});

// ---- Contact form (ContactPage.jsx) ----

router.post('/contact', formLimiter, async (req, res) => {
  const { name, email, phone, organization, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  try {
    await pool.query(
      `INSERT INTO contact_submissions (name, email, phone, organization, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone || null, organization || null, message]
    );
    await pool.query(`INSERT INTO form_submissions (form_name) VALUES ('contact_form')`);

    sendNotificationEmail({
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nOrganization: ${organization || '-'}\n\n${message}`,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Contact submission failed:', err);
    res.status(500).json({ error: 'Could not save your message. Please try again.' });
  }
});

// ---- Quote request modal (QuoteModal.jsx) ----

router.post('/quote', formLimiter, async (req, res) => {
  const { name, email, phone, organization, message, subject } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const fullMessage = `[Quote Request: ${subject || 'General Quote'}] \n\n ${message}`;

  try {
    await pool.query(
      `INSERT INTO contact_submissions (name, email, phone, organization, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone || null, organization || null, fullMessage]
    );
    await pool.query(`INSERT INTO form_submissions (form_name) VALUES ('quote_request')`);

    sendNotificationEmail({
      subject: `New quote request from ${name} (${subject || 'General Quote'})`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nOrganization: ${organization || '-'}\n\n${fullMessage}`,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Quote submission failed:', err);
    res.status(500).json({ error: 'Could not send your request. Please try again.' });
  }
});

// ---- Catalogue download modal (CatalogueDownloadModal.jsx) ----

router.post('/catalogue-download', formLimiter, async (req, res) => {
  const { name, email, country_code, mobile_number } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    await pool.query(
      `INSERT INTO catalogue_downloads (name, email, country_code, mobile_number)
       VALUES ($1, $2, $3, $4)`,
      [name, email, country_code || null, mobile_number || null]
    );
    await pool.query(`INSERT INTO form_submissions (form_name) VALUES ('catalogue_download')`);

    sendNotificationEmail({
      subject: `New catalogue download request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${country_code || ''} ${mobile_number || '-'}`,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Catalogue download submission failed:', err);
    res.status(500).json({ error: 'Could not process your request. Please try again.' });
  }
});

export default router;
