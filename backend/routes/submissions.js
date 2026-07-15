import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../authMiddleware.js';

const router = Router();
router.use(requireAdmin);

// GET /api/admin/submissions/contact -> all contact + quote messages
router.get('/contact', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, phone, organization, message, created_at
       FROM contact_submissions ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch contact submissions failed:', err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// GET /api/admin/submissions/catalogue -> all catalogue download requests
router.get('/catalogue', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, country_code, mobile_number, created_at
       FROM catalogue_downloads ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch catalogue downloads failed:', err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// DELETE /api/admin/submissions/contact/:id
router.delete('/contact/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const { rowCount } = await pool.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error('Delete contact submission failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// DELETE /api/admin/submissions/catalogue/:id
router.delete('/catalogue/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const { rowCount } = await pool.query('DELETE FROM catalogue_downloads WHERE id = $1', [id]);
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error('Delete catalogue download failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
