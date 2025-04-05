// app/api/cart/item/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/cart';
import Product from '@/models/product';

// Update cart item quantity
export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { productId, quantity } = await request.json();
    
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid request data' },
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
    
    // Calculate how many more items can be added
    const availableToAdd = product.quantity - reservedQuantity + currentQuantity;
    
    if (availableToAdd < quantity) {
      return NextResponse.json(
        { error: `Only ${availableToAdd} items available in stock` },
        { status: 400 }
      );
    }
    
    // Find user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    // Update the quantity
    cart.items[itemIndex].quantity = quantity;
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
      message: 'Cart updated successfully',
      cart: {
        _id: updatedCart._id,
        items: updatedCart.items,
        totalItems: updatedCart.items.length,
        totalPrice
      }
    });
    
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart', details: error.message },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Remove the item from the cart
    cart.items = cart.items.filter(item => 
      item.product.toString() !== productId
    );
    
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
      message: 'Item removed from cart',
      cart: {
        _id: updatedCart._id,
        items: updatedCart.items,
        totalItems: updatedCart.items.length,
        totalPrice
      }
    });
    
  } catch (error) {
    console.error('Remove cart item error:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart', details: error.message },
      { status: 500 }
    );
  }
}