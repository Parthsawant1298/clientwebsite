// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Validate MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Connection options
const options = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000, // Increased timeout for better reliability
  socketTimeoutMS: 45000,
  family: 4, // Force IPv4 only
  maxPoolSize: 50
};

// Cached connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * @returns {Promise<mongoose.Connection>}
 */
async function connectDB() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection attempt is in progress, wait for it
  if (!cached.promise) {
    const opts = options;

    // Create connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }

  return cached.conn;
}

export default connectDB;