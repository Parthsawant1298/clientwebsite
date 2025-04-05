// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';

export async function GET(request, context) {
  try {
    // Await the params before destructuring
    const params = await context.params;
    const { id } = params;
    
    await connectDB();
    
    const product = await Product.findById(id)
      .populate('createdBy', 'name email');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Fetch product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}