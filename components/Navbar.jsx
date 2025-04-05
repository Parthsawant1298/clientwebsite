"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, User, LogOut, ChevronDown, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)
  
  const closeMenu = () => setIsOpen(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          // Fetch cart once user is authenticated
          fetchCartItemCount()
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])
  
  // Function to fetch cart item count
  const fetchCartItemCount = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        
        // Calculate total number of items (considering quantities)
        let totalItems = 0
        if (data.cart && data.cart.items) {
          data.cart.items.forEach(item => {
            totalItems += item.quantity
          })
        }
        
        setCartItemCount(totalItems)
      }
    } catch (error) {
      console.error('Fetch cart count failed:', error)
    }
  }
  
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
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  return (
    <motion.header
      className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-teal-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-teal-500 flex items-center group">
          <svg className="w-6 h-6 mr-1 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-poppins tracking-tight">KonceptServices</span>
        </Link>
        
        {/* Main navigation */}
        <nav className="hidden md:flex items-center space-x-10 mx-auto">
          <Link href="/main" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        {/* Right side profile and cart */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <Link href="/cart" className="text-gray-700 hover:text-teal-500 relative transition-colors">
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
              
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-teal-400 overflow-hidden flex items-center justify-center">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium">{user.name?.split(' ')[0]}</span>
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
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500">
                      <User size={16} className="mr-2" />
                      <span>My Profile</span>
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
            </>
          )}
        </div>
        
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="text-teal-500" /> : <Menu className="text-teal-500" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link href="/main" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>Products</Link>
              
              {user && (
                <div className="w-full flex flex-col items-center space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-teal-400 overflow-hidden flex items-center justify-center">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <Link href="/cart" 
                    className="w-full max-w-xs bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    My Cart
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-white text-teal-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                  
                  <Link href="/profile" 
                    className="w-full max-w-xs bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    <User size={16} className="mr-2" />
                    My Profile
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