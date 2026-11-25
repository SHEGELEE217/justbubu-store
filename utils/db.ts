// utils/db.ts
import { Pool } from 'pg';

// Create a connection pool to your Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Neon
});

export const query = (text: string, params?: any[]) => pool.query(text, params);