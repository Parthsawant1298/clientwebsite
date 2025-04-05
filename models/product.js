// models/product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price']
  },
  originalPrice: {
    type: Number
  },
  discount: {
    type: Number,
    default: 0
  },
  images: [
    {
      url: String,
      alt: String
    }
  ],
  mainImage: {
    type: String,
    required: [true, 'Please provide main product image']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide product quantity'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide product category']
  },
  tags: [String],
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  features: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;