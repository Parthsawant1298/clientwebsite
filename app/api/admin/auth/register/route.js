// app/api/admin/auth/register/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(request) {
  try {
    const { name, email, password, phone, companyName, adminCode } = await request.json();
    
    // Basic validation
    if (!name || !email || !password || !phone || !adminCode) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Check admin registration code
    // In a real application, this should be stored securely, not hardcoded
    const validAdminCode = process.env.ADMIN_REGISTRATION_CODE || 'ADMIN123';
    
    if (adminCode !== validAdminCode) {
      return NextResponse.json(
        { error: 'Invalid admin registration code' },
        { status: 403 }
      );
    }
    
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Create new admin user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      companyName,
      role: 'admin' // Set role as admin
    });
    
    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      companyName: user.companyName,
      createdAt: user.createdAt
    };
    
    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      user: userWithoutPassword
    }, { status: 201 });
    
  } catch (error) {
    console.error('Admin register error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration', details: error.message },
      { status: 500 }
    );
  }
}