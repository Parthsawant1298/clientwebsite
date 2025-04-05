// app/cart/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [productAvailability, setProductAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cart');
      }

      setCart(data.cart);
      
      // Fetch real-time availability for products in cart
      if (data.cart && data.cart.items.length > 0) {
        await fetchProductAvailability(data.cart.items);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      setError('Failed to load your cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchProductAvailability = async (cartItems) => {
    try {
      // Create an object to store product availabilities
      const availabilities = {};
      
      // Fetch availability for each product in cart
      const availabilityPromises = cartItems.map(async (item) => {
        const response = await fetch(`/api/products/${item.product._id}/available`);
        if (response.ok) {
          const data = await response.json();
          availabilities[item.product._id] = data.product.availableQuantity + item.quantity;
        }
      });
      
      await Promise.all(availabilityPromises);
      setProductAvailability(availabilities);
    } catch (error) {
      console.error('Fetch product availability error:', error);
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const response = await fetch('/api/cart/item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update cart');
      }

      setCart(data.cart);
      await fetchProductAvailability(data.cart.items);
    } catch (error) {
      console.error('Update cart error:', error);
      alert(error.message || 'Failed to update cart');
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const response = await fetch('/api/cart/item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove item');
      }

      setCart(data.cart);
    } catch (error) {
      console.error('Remove cart item error:', error);
      alert(error.message || 'Failed to remove item');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => router.push('/main')}
          className="mb-6 flex items-center text-teal-600 hover:text-teal-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
          
          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-200 pb-4 mb-4 hidden md:flex">
                <div className="w-1/2 font-semibold text-gray-700">Product</div>
                <div className="w-1/6 font-semibold text-gray-700 text-center">Price</div>
                <div className="w-1/6 font-semibold text-gray-700 text-center">Quantity</div>
                <div className="w-1/6 font-semibold text-gray-700 text-center">Total</div>
              </div>
              
              <div className="space-y-4 mb-8">
                {cart.items.map((item) => {
                  const maxAvailable = productAvailability[item.product._id] || item.quantity;
                  const hasStockIssue = maxAvailable < item.quantity;
                  
                  return (
                    <div key={item.product._id} className="py-4 border-b border-gray-100 flex flex-col md:flex-row items-center">
                      {/* Product */}
                      <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
                        <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <img 
                            src={item.product.mainImage} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                          <button
                            onClick={() => removeCartItem(item.product._id)}
                            className="text-red-500 text-sm flex items-center mt-1 hover:text-red-700"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                          
                          {hasStockIssue && (
                            <p className="text-red-500 text-xs mt-1">
                              Only {maxAvailable} item(s) available now
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center mb-2 md:mb-0">
                        <span className="md:hidden text-gray-600">Price:</span>
                        <span className="font-medium">₹{item.product.price.toLocaleString()}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center mb-2 md:mb-0">
                        <span className="md:hidden text-gray-600">Quantity:</span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartItem(item.product._id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 border border-gray-300 rounded-l"
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            max={maxAvailable}
                            value={item.quantity}
                            readOnly
                            className={`w-10 px-2 py-1 text-center border-t border-b border-gray-300 ${
                              hasStockIssue ? 'bg-red-50 text-red-500' : ''
                            }`}
                          />
                          <button 
                            onClick={() => updateCartItem(item.product._id, Math.min(maxAvailable, item.quantity + 1))}
                            className="px-2 py-1 border border-gray-300 rounded-r"
                            disabled={item.quantity >= maxAvailable}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-gray-600">Total:</span>
                        <span className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{cart.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">₹0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">Included</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold">₹{cart.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 flex flex-col">
                  <button 
                    onClick={() => router.push('/checkout')}
                    className="py-3 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 mb-2"
                  >
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={() => router.push('/products')}
                    className="py-3 px-6 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}