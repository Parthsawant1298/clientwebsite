"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, User, LogOut, ChevronDown, Plus, Package, Home, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminNavbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)
  
  const closeMenu = () => setIsOpen(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/user')
        if (response.ok) {
          const data = await response.json()
          setAdmin(data.user)
        } else {
          // If not authorized, redirect to admin login
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Admin auth check failed:', error)
        // If error, redirect to admin login
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Admin logout failed:', error)
    }
  }
  
  return (
    <motion.header
      className="bg-teal-800 text-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="text-xl font-bold text-white flex items-center group">
          <Shield className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-poppins tracking-tight">Admin Panel</span>
        </Link>
        
        {/* Main navigation */}
        <nav className="hidden md:flex items-center space-x-8 mx-auto">
          <Link href="/admin/dashboard" className="text-gray-100 hover:text-white transition-colors py-2 relative group">
            <div className="flex items-center">
              <Home size={18} className="mr-2" />
              <span>Dashboard</span>
            </div>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/admin/products" className="text-gray-100 hover:text-white transition-colors py-2 relative group">
            <div className="flex items-center">
              <Package size={18} className="mr-2" />
              <span>Products</span>
            </div>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/add-product" className="text-gray-100 hover:text-white transition-colors py-2 relative group">
            <div className="flex items-center">
              <Plus size={18} className="mr-2" />
              <span>Add Product</span>
            </div>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        {/* Right side profile */}
        <div className="hidden md:flex items-center space-x-4">
          {admin && (
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-white hover:text-teal-100 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-teal-700 border-2 border-teal-400 overflow-hidden flex items-center justify-center">
                  {admin.profilePicture ? (
                    <Image
                      src={admin.profilePicture} 
                      alt={admin.name} 
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-teal-200" />
                  )}
                </div>
                <span className="font-medium">{admin.name?.split(' ')[0]}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProfileMenuOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{admin.name}</p>
                    <p className="text-xs text-gray-500 truncate">{admin.email}</p>
                    <p className="text-xs text-teal-600 font-medium mt-1">Administrator</p>
                  </div>
                  
                  <Link href="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500">
                    <User size={16} className="mr-2" />
                    <span>Admin Profile</span>
                  </Link>
                  
                  <Link href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500">
                    <Settings size={16} className="mr-2" />
                    <span>Settings</span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-teal-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link href="/admin/dashboard" className="text-white hover:text-teal-200 transition-colors flex items-center" onClick={closeMenu}>
                <Home size={18} className="mr-2" />
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/products" className="text-white hover:text-teal-200 transition-colors flex items-center" onClick={closeMenu}>
                <Package size={18} className="mr-2" />
                <span>Products</span>
              </Link>
              <Link href="/add-product" className="text-white hover:text-teal-200 transition-colors flex items-center" onClick={closeMenu}>
                <Plus size={18} className="mr-2" />
                <span>Add Product</span>
              </Link>
              
              {admin && (
                <div className="w-full flex flex-col items-center space-y-3 border-t border-teal-700 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-700 border-2 border-teal-400 overflow-hidden flex items-center justify-center">
                      {admin.profilePicture ? (
                        <Image 
                          src={admin.profilePicture} 
                          alt={admin.name} 
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-teal-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{admin.name}</p>
                      <p className="text-xs text-teal-200">{admin.email}</p>
                    </div>
                  </div>
                  
                  <Link href="/admin/profile" 
                    className="w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    <User size={16} className="mr-2" />
                    Admin Profile
                  </Link>
                  
                  <Link href="/admin/settings" 
                    className="w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  
                  <button 
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md flex items-center justify-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}