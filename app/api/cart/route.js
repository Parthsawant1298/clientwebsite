// app/api/cart/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/cart';
import Product from '@/models/product';

// Get user's cart
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    // Get cart and populate with product details
    let cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price mainImage quantity'
      });
    
    // If no cart exists yet, create an empty one
    if (!cart) {
      cart = {
        user: userId,
        items: [],
        _id: 'new-cart'
      };
    }
    
    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    
    return NextResponse.json({
      success: true,
      cart: {
        _id: cart._id,
        items: cart.items,
        totalItems: cart.items.length,
        totalPrice
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', details: error.message },
      { status: 500 }
    );
  }
}

// Add to cart
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { productId, quantity = 1 } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Calculate real available quantity by checking items in other users' carts
    const allCarts = await Cart.find({
      user: { $ne: userId },
      'items.product': productId
    });
    
    let reservedQuantity = 0;
    allCarts.forEach(cart => {
      const item = cart.items.find(item => item.product.toString() === productId);
      if (item) {
        reservedQuantity += item.quantity;
      }
    });
    
    // Get current quantity in user's cart
    const currentCart = await Cart.findOne({ user: userId });
    const currentItem = currentCart?.items.find(item => item.product.toString() === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    
    // Calculate real available quantity
    const realAvailableQuantity = product.quantity - reservedQuantity;
    
    if (realAvailableQuantity < quantity) {
      return NextResponse.json(
        { error: `Only ${realAvailableQuantity} items available in stock` },
        { status: 400 }
      );
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    
    // Check if product already in cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product not in cart, add new item
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    await cart.save();
    
    // Get updated cart with product details
    const updatedCart = await Cart.findById(cart._id)
      .populate({
        path: 'items.product',
        select: 'name price mainImage'
      });
      
    // Calculate total
    let totalPrice = 0;
    updatedCart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    
    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      cart: {
        _id: updatedCart._id,
        items: updatedCart.items,
        totalItems: updatedCart.items.length,
        totalPrice
      }
    });
    
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart', details: error.message },
      { status: 500 }
    );
  }
}