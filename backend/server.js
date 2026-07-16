import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import analyticsRoutes from './routes/analytics.js';
import submissionsRoutes from './routes/submissions.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : false, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin/submissions', submissionsRoutes);
app.use('/api', publicRoutes);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`Swecha website API running on ${HOST}:${PORT}`);
});
