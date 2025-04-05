// app/api/products/[id]/available/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import Cart from '@/models/cart';

export async function GET(request, context) {
  try {
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
    
    // Get all cart items to calculate reserved quantities
    const allCarts = await Cart.find({
      'items.product': id
    });
    
    // Calculate how many of this product are in carts
    let reservedQuantity = 0;
    allCarts.forEach(cart => {
      const item = cart.items.find(item => item.product.toString() === id);
      if (item) {
        reservedQuantity += item.quantity;
      }
    });
    
    // Create a new object with the product data and available quantity
    const productData = product.toObject();
    productData.availableQuantity = Math.max(0, product.quantity - reservedQuantity);
    
    return NextResponse.json({
      success: true,
      product: productData
    });
  } catch (error) {
    console.error('Fetch available product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}