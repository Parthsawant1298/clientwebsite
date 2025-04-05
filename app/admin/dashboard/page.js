"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Plus, ShoppingCart, User, DollarSign, TrendingUp, Calendar, BarChart2 } from 'lucide-react';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/user');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        // Verify user has admin role
        if (data.user.role !== 'admin') {
          throw new Error('Not authorized');
        }

        setAdmin(data.user);
        
        // Fetch dashboard stats
        fetchDashboardStats();
        
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Redirect to login page if not authenticated
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);
  
  const fetchDashboardStats = async () => {
    // In a real application, this would fetch from an API
    // For now, we'll use dummy data
    
    try {
      // const response = await fetch('/api/admin/dashboard-stats');
      // const data = await response.json();
      // setStats(data.stats);
      
      // Using dummy data for now
      setStats({
        totalProducts: 156,
        totalUsers: 48,
        totalOrders: 27,
        totalRevenue: 158250
      });
      
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl shadow-lg p-6 md:p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {admin?.name.split(' ')[0]}!</h1>
                <p className="text-teal-100">
                  This is your admin dashboard for KonceptServices. Manage products, view statistics, and more.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/add-product"
                  className="bg-white text-teal-700 hover:bg-teal-50 px-5 py-3 rounded-lg shadow-md flex items-center font-medium"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Product
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Products</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts}</h3>
                </div>
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                  <Package size={24} />
                </div>
              </div>
              <Link href="/admin/products" className="text-teal-600 text-sm font-medium hover:text-teal-700 mt-4 inline-block">
                View all products →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User size={24} />
                </div>
              </div>
              <Link href="#" className="text-teal-600 text-sm font-medium hover:text-teal-700 mt-4 inline-block">
                Manage users →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders}</h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <ShoppingCart size={24} />
                </div>
              </div>
              <Link href="#" className="text-teal-600 text-sm font-medium hover:text-teal-700 mt-4 inline-block">
                View orders →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <DollarSign size={24} />
                </div>
              </div>
              <Link href="#" className="text-teal-600 text-sm font-medium hover:text-teal-700 mt-4 inline-block">
                View financials →
              </Link>
            </div>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent products */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Package size={20} className="mr-2 text-teal-600" />
                  Recent Products
                </h2>
                <Link href="/admin/products" className="text-sm text-teal-600 hover:text-teal-700">
                  View all
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-3 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample data - in a real app, this would be fetched from the API */}
                    <tr>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image src="/placeholder.svg" alt="Product" className="w-full h-full object-cover" width={40} height={40} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">Premium Ballpoint Pen - Blue Ink</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Office Stationeries</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹120</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600">In Stock (45)</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href="#" className="text-teal-600 hover:text-teal-700 mr-3">
                          Edit
                        </Link>
                        <Link href="#" className="text-red-600 hover:text-red-700">
                          Delete
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image src="/placeholder.svg" alt="Product" className="w-full h-full object-cover" width={40} height={40} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">Eco-Friendly Notebook - A5</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Office Stationeries</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹250</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600">In Stock (25)</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href="#" className="text-teal-600 hover:text-teal-700 mr-3">
                          Edit
                        </Link>
                        <Link href="#" className="text-red-600 hover:text-red-700">
                          Delete
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image src="/placeholder.svg" alt="Product" className="w-full h-full object-cover" width={40} height={40} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">Wireless Mouse - Ergonomic</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">IT Accessories</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹1,299</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-amber-600">Low Stock (3)</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href="#" className="text-teal-600 hover:text-teal-700 mr-3">
                          Edit
                        </Link>
                        <Link href="#" className="text-red-600 hover:text-red-700">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick info */}
            <div className="space-y-6">
              {/* Activity */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                  <Calendar size={20} className="mr-2 text-teal-600" />
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">New user registered</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                      <ShoppingCart size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">New order received</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                      <Package size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">New product added</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sales report available</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Popular categories */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                  <BarChart2 size={20} className="mr-2 text-teal-600" />
                  Popular Categories
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Office Stationeries</span>
                      <span className="text-sm font-medium text-gray-700">65%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">IT Accessories</span>
                      <span className="text-sm font-medium text-gray-700">45%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Pantry/Grocery</span>
                      <span className="text-sm font-medium text-gray-700">30%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Housekeeping</span>
                      <span className="text-sm font-medium text-gray-700">25%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick actions */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                
                <div className="space-y-3">
                  <Link 
                    href="/add-product" 
                    className="w-full block text-left px-4 py-3 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    Add New Product
                  </Link>
                  <Link 
                    href="/admin/products" 
                    className="w-full block text-left px-4 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Manage Inventory
                  </Link>
                  <Link 
                    href="/admin/profile" 
                    className="w-full block text-left px-4 py-3 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg transition-colors"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} KonceptServices Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}