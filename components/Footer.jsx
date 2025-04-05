'use client';

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-800 relative">
      {/* Decorative Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <svg className="w-10 h-10 mr-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-white">
                  Koncept Services
                </h3>
                <span className="text-sm text-teal-100 font-medium">Complete Office Supply Solutions</span>
              </div>
            </div>
            <p className="text-teal-100">Providing professional office supplies including stationery, housekeeping, pantry, IT accessories and COVID safety items. Serving 1800+ clients with 48-hour delivery across Delhi NCR and Pan India.</p>
            <div className="flex items-center space-x-5">
              <a href="#" className="text-white hover:text-teal-200 transition-colors duration-300">
                <Facebook size={22} className="hover:scale-110 transform transition-transform" />
              </a>
              <a href="#" className="text-white hover:text-teal-200 transition-colors duration-300">
                <Twitter size={22} className="hover:scale-110 transform transition-transform" />
              </a>
              <a href="#" className="text-white hover:text-teal-200 transition-colors duration-300">
                <Linkedin size={22} className="hover:scale-110 transform transition-transform" />
              </a>
              <a href="#" className="text-white hover:text-teal-200 transition-colors duration-300">
                <Instagram size={22} className="hover:scale-110 transform transition-transform" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white border-b border-teal-600 pb-2">Our Products</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Office Stationery
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Housekeeping Supplies
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Pantry Items
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>IT Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>COVID Safety Equipment
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white border-b border-teal-600 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span>FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white border-b border-teal-600 pb-2">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-teal-100 group">
                <Phone size={18} className="group-hover:text-white" />
                <span className="group-hover:text-white transition-colors duration-300">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3 text-teal-100 group">
                <Mail size={18} className="group-hover:text-white" />
                <span className="group-hover:text-white transition-colors duration-300">contact@konceptservices.com</span>
              </div>
              <div className="flex items-start space-x-3 text-teal-100 group">
                <MapPin size={18} className="group-hover:text-white mt-1 flex-shrink-0" />
                <span className="group-hover:text-white transition-colors duration-300">
                  456 Business Hub, Corporate Park,<br />
                  Delhi NCR - 110001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-700 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-teal-200 text-sm">
              © {currentYear} Koncept Services. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href="#" className="text-teal-200 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-teal-200 hover:text-white text-sm transition-colors duration-300">Terms of Use</a>
              <a href="#" className="text-teal-200 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a>
              {/* Translation Button */}
              <div className="translate-footer-container">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;