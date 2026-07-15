import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { pool } from '../db.js';
import { requireAdmin } from '../authMiddleware.js';
import { redisClient } from '../redisClient.js';

const router = Router();

const TOKEN_MAX_AGE_MS = 12 * 60 * 60 * 1000; // keep in sync with jwt expiresIn below

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix: 'rl:login:',
  }),
});

router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (password.length > 128) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.cookie('admin_token', token, { ...cookieOptions, maxAge: TOKEN_MAX_AGE_MS });
    res.json({ ok: true });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin_token', cookieOptions);
  res.status(204).end();
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ ok: true, email: req.admin.email });
});

export default router;
