// app/api/products/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import User from '@/models/user';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function for multiple images
const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const streamifier = require('streamifier');
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export async function POST(request) {
  try {
    // Get user ID from cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get form data from request
    const formData = await request.formData();
    
    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const originalPrice = parseFloat(formData.get('originalPrice') || price);
    const quantity = parseInt(formData.get('quantity'));
    const category = formData.get('category');
    const features = formData.get('features')?.split(',') || [];
    const tags = formData.get('tags')?.split(',') || [];
    
    // Get all image files
    const imageFiles = [];
    for (let i = 0; i < 10; i++) { // Limit to 10 images max
      const image = formData.get(`image${i}`);
      if (image && image instanceof File) {
        imageFiles.push(image);
      }
    }
    
    if (imageFiles.length === 0) {
      return NextResponse.json(
        { error: 'At least one product image is required' },
        { status: 400 }
      );
    }

    // Upload all images to Cloudinary
    const imagePromises = imageFiles.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return uploadToCloudinary(buffer);
    });
    
    const uploadResults = await Promise.all(imagePromises);
    
    // Format the image data
    const images = uploadResults.map(result => ({
      url: result.secure_url,
      alt: name
    }));
    
    // Create new product
    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      images,
      mainImage: images[0].url, // First image is the main image
      quantity,
      category,
      features,
      tags,
      createdBy: userId
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    }, { status: 201 });

  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}

// GET method to fetch all products
export async function GET() {
  try {
    await connectDB();
    
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('createdBy', 'name'); // Include seller's name
    
    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}