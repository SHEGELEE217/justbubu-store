// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../utils/db';

export async function GET() {
  try {
    // Fetch all products, newest first
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}