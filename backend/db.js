import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 20,                    // up from 5
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,  // fail fast instead of hanging queued requests forever
});

pool.on('error', (err) => {
  console.error('Unexpected Postgres pool error:', err);
});
