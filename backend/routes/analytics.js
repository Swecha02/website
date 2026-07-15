import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../authMiddleware.js';

const router = Router();
router.use(requireAdmin);

// Shared helper: parse & default the date range query params
function dateRange(req) {
  const end = req.query.end ? new Date(req.query.end) : new Date();
  const start = req.query.start
    ? new Date(req.query.start)
    : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { start, end };
}

// GET /api/analytics/page-visits/count?start&end&page_name=
router.get('/page-visits/count', async (req, res) => {
  const { start, end } = dateRange(req);
  const { page_name } = req.query;
  try {
    const params = [start, end];
    let sql = `SELECT COUNT(*) FROM page_visits WHERE visited_at BETWEEN $1 AND $2`;
    if (page_name) {
      params.push(page_name);
      sql += ` AND page_name = $3`;
    }
    const { rows } = await pool.query(sql, params);
    res.json({ count: Number(rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/analytics/page-visits?start&end  -> [{ page_name, visited_at }]
router.get('/page-visits', async (req, res) => {
  const { start, end } = dateRange(req);
  try {
    const { rows } = await pool.query(
      `SELECT page_name, visited_at FROM page_visits WHERE visited_at BETWEEN $1 AND $2`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/analytics/button-clicks?start&end -> [{ button_name }]
router.get('/button-clicks', async (req, res) => {
  const { start, end } = dateRange(req);
  try {
    const { rows } = await pool.query(
      `SELECT button_name FROM button_clicks WHERE clicked_at BETWEEN $1 AND $2`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/analytics/form-submissions?start&end -> [{ form_name, submitted_at }]
router.get('/form-submissions', async (req, res) => {
  const { start, end } = dateRange(req);
  try {
    const { rows } = await pool.query(
      `SELECT form_name, submitted_at FROM form_submissions WHERE submitted_at BETWEEN $1 AND $2`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/analytics/form-submissions/count?start&end -> { count }
router.get('/form-submissions/count', async (req, res) => {
  const { start, end } = dateRange(req);
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM form_submissions WHERE submitted_at BETWEEN $1 AND $2`,
      [start, end]
    );
    res.json({ count: Number(rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/analytics/catalogue-downloads/count?start&end -> { count }
router.get('/catalogue-downloads/count', async (req, res) => {
  const { start, end } = dateRange(req);
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM catalogue_downloads WHERE created_at BETWEEN $1 AND $2`,
      [start, end]
    );
    res.json({ count: Number(rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

export default router;
