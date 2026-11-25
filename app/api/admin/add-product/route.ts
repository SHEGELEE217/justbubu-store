// app/api/admin/add-product/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { query } from '../../../../utils/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const availability = formData.get('availability') as string;
    const sizes = formData.get('sizes') as string;
    const colors = formData.get('colors') as string;
    const quantity = parseInt(formData.get('quantity') as string);

    // Extract images
    const images = formData.getAll('images') as File[];
    if (images.length < 2) {
      return NextResponse.json({ error: "Please upload at least 2 images." }, { status: 400 });
    }

    // 1. Upload Images to Vercel Blob
    const imageUrls: string[] = [];
    for (const file of images) {
      if (file.size > 0) {
        const blob = await put(file.name, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        imageUrls.push(blob.url);
      }
    }

    // 2. Save Product Data to Neon Database
    const insertQuery = `
      INSERT INTO products 
      (name, category, price, description, availability, sizes, colors, quantity, images) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id;
    `;
    
    const values = [name, category, price, description, availability, sizes, colors, quantity, imageUrls];
    
    await query(insertQuery, values);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}