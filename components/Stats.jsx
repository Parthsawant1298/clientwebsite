"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StatsComponent = () => {
  // State for counting animation
  const [counts, setCounts] = useState({
    users: 0,
    deliveries: 0,
    successRate: 0,
    satisfaction: 0
  });

  // Animate the counter on component mount
  useEffect(() => {
    const duration = 2000; // animation duration in ms
    const steps = 60; // number of steps for the animation
    const interval = duration / steps;
    
    const targetValues = {
      users: 1800,
      deliveries: 25000,
      successRate: 99,
      satisfaction: 4.5
    };
    
    let step = 0;
    
    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      
      setCounts({
        users: Math.floor(progress * targetValues.users),
        deliveries: Math.floor(progress * targetValues.deliveries),
        successRate: Math.floor(progress * targetValues.successRate),
        satisfaction: +(progress * targetValues.satisfaction).toFixed(1)
      });
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  // Stats data
  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      value: counts.users.toLocaleString(),
      label: "Active Clients",
      suffix: "+"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      value: counts.deliveries.toLocaleString(),
      label: "Orders Delivered",
      suffix: "+"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: counts.successRate,
      label: "Success Rate",
      suffix: "%"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      value: counts.satisfaction,
      label: "Client Satisfaction",
      suffix: "/5"
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.6
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Trusted by Businesses <span className="text-teal-500">All Over Delhi NCR</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="p-6 flex flex-col items-center text-center relative">
                <div className="absolute -top-10 left-0 w-full h-32 bg-gradient-to-br from-teal-400/10 to-teal-200/5 rounded-full transform -translate-x-1/2 scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="mb-4 bg-teal-50 p-3 rounded-full"
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.7 }}
                >
                  <span className="text-4xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-2xl font-medium text-teal-500">{stat.suffix}</span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.7 }}
                  className="text-gray-600 font-medium mt-2"
                >
                  {stat.label}
                </motion.p>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-4"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsComponent;