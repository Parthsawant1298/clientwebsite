import { Truck, Users, Package, Shield, ThumbsUp, Coffee } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';

export default function AboutKonceptServices() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-teal-100 px-4 py-12">
      <Head>
        <title>About Koncept Services - Complete Office Supply Solutions in Delhi NCR</title>
        <meta name="description" content="Koncept Services provides office supplies including stationery, housekeeping, pantry, and COVID safety items with delivery within 48 hours across Delhi NCR and Pan India." />
        <meta name="keywords" content="office supplies, stationery, housekeeping materials, pantry items, COVID safety items, Delhi NCR, office products, corporate supplies, fast delivery, office solutions" />
        <meta property="og:title" content="About Koncept Services - Office Supply Solutions" />
        <meta property="og:description" content="Professional office supplies with 48-hour delivery across Delhi NCR and Pan India. Serving 1800+ satisfied clients." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://konceptservices.com/about-us" />
      </Head>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-teal-700">About Koncept Services</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          A renowned name in the market supplying all types of office products according to your office requirements.
          Delivering quality office supplies at your doorstep within 48 working hours across Delhi NCR and Pan India.
        </p>
      </div>

      {/* About Us Grid Layout */}
      <div className="grid md:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* First Card - Full width image */}
        <div className="md:col-span-7 bg-white rounded-3xl overflow-hidden border border-teal-100 shadow-lg">
          <div className="w-full h-64 relative">
            <img 
              src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Koncept Services Office Supplies" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700">Our Story</h2>
            <p className="text-gray-600">
              Koncept is a goddess name whom we worship for everyone's well being and in her name we started our business in 2012. 
              The company is professionally managed and working in Delhi/NCR and Pan India, supplying more than 90% of office requirements under one roof.
              Our vision is to be a solution provider for other businesses rather than being a local vendor by just selling products.
            </p>
            <p className="text-gray-600 mt-4">
              We are servicing more than 1800 corporate clients based out of NCR region as of now and keep increasing the list regularly.
              The company is continuously adding new products and expanding in new verticals to fulfill all office requirements.
            </p>
          </div>
        </div>

        {/* Second Card - Properly spaced image */}
        <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-teal-100 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <Package className="w-14 h-14 text-teal-600" />
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all">
                View Products
              </button>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-teal-700">Our Product Verticals</h3>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Housekeeping materials
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Office stationeries
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Pantry/Grocery Materials
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              IT Accessories
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Packaging materials
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              COVID Safety Items
            </li>
          </ul>
          <div className="mt-4">
            <img 
              src="https://images.unsplash.com/photo-1544931170-3ca1337cce88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Koncept Services Product Range" 
              className="rounded-lg object-cover w-full h-48"
            />
          </div>
        </div>

        {/* Second Row - Partnerships */}
        <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-teal-100 shadow-lg">
          <div className="flex mb-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center"
                >
                  <ThumbsUp className="w-5 h-5 text-teal-600" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white text-sm">
                1800+
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-teal-700">Trusted Partnerships</h3>
          <p className="text-gray-600">
            We are proud distributors of many renowned brands including Sarya Mystair Hygiene Pvt Ltd., 
            Roots Multiichem Pvt Ltd., Divesey India Pvt Ltd., Hindustan Unilever, Kent, and Borosil.
          </p>
          <div className="mt-6">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Koncept Services Partners" 
              className="rounded-lg object-cover w-full h-44"
            />
          </div>
        </div>

        {/* Our Services Card */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-teal-100 p-8 shadow-lg">
          <div className="mb-6">
            <div className="bg-teal-50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-6 h-6 text-teal-600" />
                  <span className="text-sm text-gray-600">Next Day Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-teal-600" />
                  <span className="text-sm text-gray-600">Dedicated Manager</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-teal-600" />
                  <span className="text-sm text-gray-600">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-teal-700">Our Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-teal-600 mb-2">Competitive Pricing</h4>
              <p className="text-gray-600 text-sm">
                Since we procure products directly from manufacturers, we offer industry-best rates tailored to your requirements.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-teal-600 mb-2">Next Day Delivery</h4>
              <p className="text-gray-600 text-sm">
                Our team is always ready to supply your requirements within 24 working hours across Delhi NCR and Pan India.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-teal-600 mb-2">Easy Ordering</h4>
              <p className="text-gray-600 text-sm">
                Place orders easily through our e-commerce website konceptservices.in, designed specifically for corporate clients.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-teal-600 mb-2">Relationship Manager</h4>
              <p className="text-gray-600 text-sm">
                We assign a dedicated relationship manager to continuously update you and ensure the best service experience.
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {/* SEO metadata */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Koncept Services",
            "url": "https://konceptservices.com",
            "logo": "/images/koncept/logo.png",
            "description": "Professional office supplies including stationery, housekeeping, pantry, IT accessories and COVID safety items with 48-hour delivery across Delhi NCR and Pan India.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Delhi NCR",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/konceptservices",
              "https://www.linkedin.com/company/koncept-services"
            ],
            "foundingDate": "2012"
          }
        `}
      </script>
    </div>
  );
}

// SEO metadata for Next.js config
export const metadata = {
  title: 'About Koncept Services - Complete Office Supply Solutions in Delhi NCR',
  description: 'Koncept Services provides office supplies including stationery, housekeeping, pantry, and COVID safety items with delivery within 48 hours across Delhi NCR and Pan India.',
  keywords: 'office supplies, stationery, housekeeping materials, pantry items, COVID safety items, Delhi NCR, office products, corporate supplies, fast delivery, office solutions',
  openGraph: {
    title: 'About Koncept Services - Office Supply Solutions',
    description: 'Professional office supplies with 48-hour delivery across Delhi NCR and Pan India. Serving 1800+ satisfied clients.',
    images: [
      {
        url: '/images/koncept/social/about-koncept-og.jpg',
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
    title: 'About Koncept Services - Office Supply Solutions',
    description: 'Professional office supplies with 48-hour delivery across Delhi NCR and Pan India.',
    images: ['/images/koncept/social/about-koncept-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://konceptservices.com/about-us',
  },
  robots: {
    index: true,
    follow: true,
  },
};