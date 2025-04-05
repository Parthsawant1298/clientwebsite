// app/api/products/available/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import Cart from '@/models/cart';

export async function GET() {
  try {
    await connectDB();
    
    // First get all products
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');
    
    // Get all cart items to calculate reserved quantities
    const allCarts = await Cart.find();
    
    // Calculate available quantities for each product
    const productsWithAvailability = products.map(product => {
      const productObj = product.toObject();
      
      // Calculate how many of this product are in carts
      let reservedQuantity = 0;
      allCarts.forEach(cart => {
        const item = cart.items.find(item => item.product.toString() === product._id.toString());
        if (item) {
          reservedQuantity += item.quantity;
        }
      });
      
      // Calculate real available quantity
      productObj.availableQuantity = Math.max(0, product.quantity - reservedQuantity);
      
      return productObj;
    });
    
    return NextResponse.json({
      success: true,
      count: productsWithAvailability.length,
      products: productsWithAvailability
    });
  } catch (error) {
    console.error('Fetch available products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}