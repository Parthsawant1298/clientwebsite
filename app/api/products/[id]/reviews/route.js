// app/api/products/[id]/reviews/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import Review from '@/models/review';
import User from '@/models/user';

// GET reviews for a specific product
export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await connectDB();
    
    const reviews = await Review.find({ product: id })
      .populate({
        path: 'user',
        select: 'name profilePicture'
      })
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST a new review
export async function POST(request, context) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const params = await context.params;
    const { id: productId } = params;
    
    const { rating, comment } = await request.json();
    
    if (!rating || !comment) {
      return NextResponse.json(
        { error: 'Please provide rating and comment' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: userId,
      product: productId
    });
    
    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }
    
    // Create new review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment
    });
    
    // Get the populated review
    const populatedReview = await Review.findById(review._id)
      .populate({
        path: 'user',
        select: 'name profilePicture'
      });
    
    return NextResponse.json({
      success: true,
      message: 'Review added successfully',
      review: populatedReview
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create review error:', error);
    
    // Handle duplicate review error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create review', details: error.message },
      { status: 500 }
    );
  }
}