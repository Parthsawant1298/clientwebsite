"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const KonceptServicesBanner = () => {
  // Add scroll reveal animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>Koncept Services - Complete Office Supply Solutions in Delhi NCR</title>
        <meta name="description" content="Professional office supplies including stationery, housekeeping, pantry, IT accessories and COVID safety items. Serving 1800+ clients with 48-hour delivery across Delhi NCR and Pan India." />
        <meta name="keywords" content="office supplies, stationery, housekeeping materials, pantry items, COVID safety items, Delhi NCR, office products, corporate supplies, fast delivery, office solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Koncept Services - Office Supply Solutions" />
        <meta property="og:description" content="Professional office supplies with 48-hour delivery across Delhi NCR and Pan India." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://konceptservices.com/office-supplies" />
      </Head>
      
      {/* Hero Component - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-teal-50 to-teal-100"
      
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            {/* Left Content Section */}
            <div className="w-full md:w-1/2 max-w-xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium inline-block shadow-sm hover:shadow-md transition-all duration-300"
              >
                Office Supply Solutions
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-6 mb-6 animate-on-scroll"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 block leading-tight">Complete Your</span>
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-500 block leading-tight bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Office Needs</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-gray-600 mb-8 text-lg animate-on-scroll"
              >
                Discover our extensive range of office products including stationery, 
                housekeeping supplies, pantry items and COVID safety equipment. 
                High-quality solutions delivered to your doorstep within 48 hours.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-8 animate-on-scroll"
              >
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-full flex items-center font-medium transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button className="border-2 border-gray-300 hover:border-teal-400 text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300 text-lg hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  Learn More
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 animate-on-scroll"
              >
                <div className="flex -space-x-2">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                  <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                  <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                  <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                </div>
                <div className="ml-0 sm:ml-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + (i * 0.1), duration: 0.3 }}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm font-medium">From 1,800+ satisfied clients</p>
                </div>
              </motion.div>
            </div>
            
            {/* Right Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full md:w-1/2 max-w-lg animate-on-scroll"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white p-4 sm:p-6 rounded-xl relative shadow-xl overflow-hidden group" 
              style={{ border: '8px solid white' }} 
              >
                <motion.span 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10"
                >
                  New
                </motion.span>
                <div className="h-64 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden relative">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      yoyo: Infinity, 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Office Supplies" 
                    className="object-contain h-full w-full transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            transition: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// SEO metadata
export const metadata = {
  title: 'Koncept Services - Complete Office Supply Solutions in Delhi NCR',
  description: 'Professional office supplies including stationery, housekeeping, pantry, IT accessories and COVID safety items. Serving 1800+ clients with 48-hour delivery across Delhi NCR and Pan India.',
  keywords: 'office supplies, stationery, housekeeping materials, pantry items, COVID safety items, Delhi NCR, office products, corporate supplies, fast delivery, office solutions',
  openGraph: {
    title: 'Koncept Services - Office Supply Solutions',
    description: 'Professional office supplies with 48-hour delivery across Delhi NCR and Pan India.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Koncept Services Office Supplies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koncept Services - Office Supply Solutions',
    description: 'Professional office supplies with 48-hour delivery across Delhi NCR and Pan India.',
    images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80'],
  },
  alternates: {
    canonical: 'https://konceptservices.com/office-supplies',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default KonceptServicesBanner;