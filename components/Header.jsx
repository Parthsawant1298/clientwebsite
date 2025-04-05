"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  
  const closeMenu = () => setIsOpen(false)
  
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
          <Link href="/" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/About" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/Faq" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            Faq
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/Contact" className="text-gray-700 hover:text-teal-500 transition-colors py-2 relative group">
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        {/* Right side buttons */}
        <div className="hidden md:flex items-center">
          <Link href="/Login"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </Link>
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
              <Link href="/" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>Home</Link>
              <Link href="/About" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>About Us</Link>
              <Link href="/Faq" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>Faq</Link>
              <Link href="/Contact" className="text-gray-700 hover:text-teal-500 transition-colors" onClick={closeMenu}>Contact Us</Link>
              <Link href="/Login" 
                className="w-full max-w-xs bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-center transition-all duration-300 font-medium shadow-md"
                onClick={closeMenu}
              >
                Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}