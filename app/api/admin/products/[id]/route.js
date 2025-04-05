// app/api/admin/products/[id]/route.js
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

// Upload function for images
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

// Update an existing product
export async function PUT(request, context) {
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
    
    // Verify user is admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to edit products' },
        { status: 403 }
      );
    }

    // Get product ID from URL params
    const params = await context.params;
    const { id } = params;
    
    // Verify product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get form data from request
    const formData = await request.formData();
    
    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const originalPrice = formData.get('originalPrice') ? parseFloat(formData.get('originalPrice')) : price;
    const quantity = parseInt(formData.get('quantity'));
    const category = formData.get('category');
    
    // Parse JSON strings for arrays
    let features = [];
    try {
      const featuresJson = formData.get('features');
      if (featuresJson) {
        features = JSON.parse(featuresJson);
      }
    } catch (e) {
      console.error('Error parsing features:', e);
      // If parsing fails, try to split by comma
      const featuresString = formData.get('features');
      if (featuresString) {
        features = featuresString.split(',').map(item => item.trim()).filter(Boolean);
      }
    }
    
    let tags = [];
    try {
      const tagsJson = formData.get('tags');
      if (tagsJson) {
        tags = JSON.parse(tagsJson);
      }
    } catch (e) {
      console.error('Error parsing tags:', e);
      // If parsing fails, try to split by comma
      const tagsString = formData.get('tags');
      if (tagsString) {
        tags = tagsString.split(',').map(item => item.trim()).filter(Boolean);
      }
    }
    
    const brand = formData.get('brand') || '';
    
    // Process removed images
    let removedImages = [];
    try {
      const removedImagesJson = formData.get('removedImages');
      if (removedImagesJson) {
        removedImages = JSON.parse(removedImagesJson);
      }
    } catch (e) {
      console.error('Error parsing removed images:', e);
    }
    
    // Update images array by removing the deleted ones
    let updatedImages = [...existingProduct.images];
    if (removedImages.length > 0) {
      updatedImages = updatedImages.filter(img => !removedImages.includes(img._id?.toString()));
    }
    
    // Upload new images to Cloudinary
    const newImagePromises = [];
    for (let i = 0; i < 20; i++) { // Limit to 20 new images max
      const image = formData.get(`newImage${i}`);
      if (image && image instanceof File) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        newImagePromises.push(uploadToCloudinary(buffer));
      }
    }
    
    let newImages = [];
    if (newImagePromises.length > 0) {
      const uploadResults = await Promise.all(newImagePromises);
      newImages = uploadResults.map(result => ({
        url: result.secure_url,
        alt: name
      }));
    }
    
    // Combine existing (not removed) images with new ones
    const images = [...updatedImages, ...newImages];
    
    // Ensure at least one image
    if (images.length === 0) {
      return NextResponse.json(
        { error: 'At least one product image is required' },
        { status: 400 }
      );
    }

    // Calculate discount percentage
    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    
    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        originalPrice,
        discount,
        images,
        mainImage: images[0].url, // First image is the main image
        quantity,
        category,
        features,
        tags,
        brand,
        updatedAt: new Date()
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product', details: error.message },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(request, context) {
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
    
    // Verify user is admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete products' },
        { status: 403 }
      );
    }

    // Get product ID from URL params
    const params = await context.params;
    const { id } = params;
    
    // Delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', details: error.message },
      { status: 500 }
    );
  }
}