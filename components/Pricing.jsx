"use client";

import { Check, X, ChevronRight, Award, ShieldCheck, Clock } from 'lucide-react';
import { useState } from 'react';

const PricingPage = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small offices and startups",
      monthly: 2999,
      annually: 29990,
      savings: "2 months free",
      features: [
        "Basic office stationery",
        "48-hour delivery in Delhi NCR",
        "Email support",
        "Online ordering portal",
        "Monthly delivery schedule",
      ],
      notIncluded: [
        "Dedicated account manager",
        "Custom product selection",
        "Premium pantry items",
        "Weekend delivery",
        "Bulk order discounts"
      ],
      icon: Clock,
      popular: false,
      color: "from-teal-400 to-teal-600",
      buttonClass: "bg-teal-600 hover:bg-teal-700"
    },
    {
      name: "Business",
      description: "Ideal for growing businesses and mid-sized teams",
      monthly: 4999,
      annually: 49990,
      savings: "2 months free + free setup",
      features: [
        "Complete office stationery range",
        "48-hour delivery Pan India",
        "Email & phone support",
        "Online ordering portal",
        "Weekly delivery schedule",
        "Dedicated account manager",
        "Custom product selection",
        "Basic pantry items included"
      ],
      notIncluded: [
        "Weekend delivery",
        "Premium pantry items"
      ],
      icon: Award,
      popular: true,
      color: "from-teal-500 to-teal-700",
      buttonClass: "bg-teal-600 hover:bg-teal-700 ring-4 ring-teal-100"
    },
    {
      name: "Enterprise",
      description: "Full-service solution for large organizations",
      monthly: 9999,
      annually: 99990,
      savings: "2 months free + free setup + priority service",
      features: [
        "Premium office stationery & supplies",
        "24-hour delivery nationwide",
        "24/7 priority support",
        "Advanced ordering system",
        "Customized delivery schedule",
        "Senior account manager",
        "Fully customized product selection",
        "Premium pantry items included",
        "Weekend delivery available",
        "Bulk order discounts",
        "Quarterly business review"
      ],
      notIncluded: [],
      icon: ShieldCheck,
      popular: false,
      color: "from-teal-600 to-teal-800",
      buttonClass: "bg-teal-600 hover:bg-teal-700"
    }
  ];

  const formatPrice = (price) => {
    return `₹${Math.floor(price / 100)},${String(price % 100).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Simple, Transparent <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your office supply needs
          </p>
          
          {/* Toggle */}
          <div className="mt-10 flex justify-center">
            <div className="relative flex rounded-full bg-gray-100 p-1 shadow-sm">
              <button
                onClick={() => setAnnual(false)}
                className={`relative flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  !annual ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`relative flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  annual ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual <span className="ml-1.5 rounded-full bg-teal-600/10 px-1.5 py-0.5 text-xs font-medium text-teal-600">Save up to 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative flex flex-col rounded-3xl ${
                plan.popular 
                  ? 'ring-2 ring-teal-600 shadow-xl scale-105' 
                  : 'ring-1 ring-gray-200 shadow-lg'
              } bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-5 right-5">
                  <div className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Header */}
              <div 
                className={`h-24 bg-gradient-to-r ${plan.color} p-6 flex items-center`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow">
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                
                {/* Price */}
                <div className="mt-4 mb-6">
                  <p className="text-4xl font-bold text-gray-900">
                    {formatPrice(annual ? plan.annually : plan.monthly)}
                    <span className="text-sm font-normal text-gray-500">
                      {annual ? '/year' : '/month'}
                    </span>
                  </p>
                  {annual && (
                    <p className="mt-1 text-xs text-teal-600 font-medium">
                      {plan.savings}
                    </p>
                  )}
                </div>
                
                {/* Features */}
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-teal-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex gap-3 items-start text-gray-400">
                      <X className="h-5 w-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  className={`flex w-full items-center justify-center rounded-xl ${plan.buttonClass} py-3 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5`}
                >
                  Get Started <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        
        {/* CTA Section */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-teal-500 to-teal-700 p-10 md:p-16 shadow-xl">
          <div className="md:flex justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-3xl font-bold text-white">Ready to streamline your office supplies?</h3>
              <p className="mt-3 text-lg text-teal-100">Get started today and enjoy 14 days risk-free trial on any plan</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <button className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-sm hover:bg-teal-50 transition-colors">
                Contact Sales
              </button>
              <button className="rounded-xl bg-teal-800 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-teal-900 transition-colors">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;