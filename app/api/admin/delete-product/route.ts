// app/api/admin/delete-product/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Delete the product from the database
    await query('DELETE FROM products WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 });
  }
}