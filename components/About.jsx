'use client'

import { useEffect, useState } from 'react'
import { Truck, Users, ShoppingBag, Shield, Clock, Package, Coffee, HeartHandshake } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Testimonial from '@/components/Testimonial'

export default function AboutusPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: "2012", label: "Founded", icon: <ShoppingBag className="h-6 w-6" /> },
    { number: "1800+", label: "Satisfied Clients", icon: <Users className="h-6 w-6" /> },
    { number: "24", label: "Hour Delivery", icon: <Clock className="h-6 w-6" /> },
    { number: "90%", label: "Office Needs Covered", icon: <Package className="h-6 w-6" /> }
  ]

  const values = [
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Next Day Delivery",
      description: "Our team is always ready to supply your requirements within 24 working hours across Delhi NCR and Pan India."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Quality Assurance",
      description: "We partner with renowned brands to ensure all products meet the highest quality standards for your office needs."
    },
    {
      icon: <HeartHandshake className="h-12 w-12" />,
      title: "Dedicated Management",
      description: "Each client receives a dedicated relationship manager who continuously updates you and ensures the best service experience."
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[35rem] overflow-hidden bg-gradient-to-r from-teal-50 to-teal-100">
        {/* Removed background image */}

        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-center h-full space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center mb-2 md:mb-4">
              ABOUT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700"> US</span>
            </h1>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden h-96">
                <img 
                  src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Koncept Services Office Supplies"
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-teal-600 font-semibold tracking-wider uppercase">Who We Are</span>
              <h2 className="text-4xl font-bold text-gray-900">
                Complete Office Supply Solutions
              </h2>
              <p className="text-gray-600 text-lg">
                Founded in 2012, Koncept Services has emerged as a renowned name in the market supplying all types of office products according to your office requirements. Koncept is a goddess name whom we worship for everyone's well being and in her name we started our business.
              </p>
              <p className="text-gray-600 text-lg">
                The company is professionally managed and working in Delhi/NCR and Pan India, supplying more than 90% of office requirements under one roof. Our vision is to be a solution provider for other businesses rather than being a local vendor by just selling products.
              </p>
              <div className="flex gap-4 pt-4">
                <Coffee className="text-teal-600 h-6 w-6" />
                <div>
                  <h3 className="text-gray-900 font-semibold">Our Mission</h3>
                  <p className="text-gray-600">To provide high-quality office supplies at competitive prices with exceptional service, helping businesses operate efficiently and seamlessly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-teal-600 mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Our Product Verticals
            </h2>
            <p className="text-xl text-gray-600 mx-auto max-w-2xl">
              Discover our extensive range of high-quality office products delivered to your doorstep
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Package className="h-12 w-12 text-teal-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Housekeeping Materials</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Broom, Phenyl, Hand wash
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Floor duster and cleaners
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Tissue papers and dispensers
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Package className="h-12 w-12 text-teal-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Stationery</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Pen, Pencil, Markers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Files, Folders, Envelopes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Diaries and notebooks
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Package className="h-12 w-12 text-teal-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pantry & IT Items</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Tea, Coffee, Sugar, Dairy whitener
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Mouse, Keyboard, Hard disk
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  COVID Safety Items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 mx-auto max-w-2xl">
              The principles that guide our office supply solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-teal-600 mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold tracking-wider uppercase bg-teal-50 px-4 py-2 rounded-full">Trusted Collaborations</span>
            <h2 className="text-5xl font-bold mt-6 mb-6 text-gray-900">
              Our <span className="text-teal-600">Premium</span> Partnerships
            </h2>
            <p className="text-xl text-gray-600 mx-auto max-w-2xl">
              We collaborate with industry-leading brands to deliver exceptional quality products for all your office needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6 bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900">Our Trusted Brand Partners</h3>
              <p className="text-gray-600 text-lg mb-8">
                At Koncept Services, we carefully select premium brands to ensure you receive only the highest quality products:
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-700">Sarya Mystair Hygiene Pvt Ltd</h4>
                    <p className="text-gray-600">Premium tissue papers, rolls, M-fold and specialized hygiene products</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-700">Roots Multiichem Pvt Ltd</h4>
                    <p className="text-gray-600">High-quality cleaning machines, mops, tools and advanced cleaning solutions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-700">Divesey India Pvt Ltd</h4>
                    <p className="text-gray-600">Professional-grade cleaning chemicals for commercial and office environments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-700">Hindustan Unilever</h4>
                    <p className="text-gray-600">Trusted housekeeping and cleaning essentials including Domex, Lifebuoy, and Vim</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-700">Kent & Borosil</h4>
                    <p className="text-gray-600">Premium household items and elegant office utensils with durability guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-50 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-50 rounded-full z-0"></div>
              <div className="relative h-full rounded-xl overflow-hidden z-10 shadow-xl" style={{ minHeight: '550px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Koncept Services Partnerships"
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-700"
                  style={{ height: '100%', objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center bg-white/90 p-4 rounded-lg shadow-lg">
                  <p className="font-semibold text-teal-700">Delivering excellence through trusted partnerships since 2012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <Testimonial />
      <Footer />
    </main>
  )
}