"use client";

import { PackageCheck, Truck, Coffee, Monitor, Shield, Recycle } from 'lucide-react';
import Image from "next/image";
import Head from 'next/head';

function ServiceCard({ title, icon: Icon, image, iconColor, description }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0" />
      </div>
      <div className="absolute left-6 top-6">
        <div className={`rounded-2xl ${
          iconColor === "green" 
            ? "bg-teal-50/90 hover:bg-teal-100" 
            : "bg-teal-50/90 hover:bg-teal-100"
        } p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}>
          <Icon className={`h-7 w-7 ${
            iconColor === "green" ? "text-teal-600" : "text-teal-600"
          }`} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: "Office Stationery",
      icon: PackageCheck,
      image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1035&auto=format&fit=crop",
      iconColor: "teal",
      description: "Premium quality stationery including notebooks, pens, files, and organization tools for your everyday office needs."
    },
    {
      title: "48-Hour Delivery",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=1074&auto=format&fit=crop",
      iconColor: "green",
      description: "Fast and reliable delivery service across Delhi NCR and Pan India, ensuring your supplies arrive when you need them."
    },
    {
      title: "Pantry Supplies",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=987&auto=format&fit=crop",
      iconColor: "teal",
      description: "Complete range of pantry items including coffee, tea, snacks, and kitchen supplies to keep your team energized."
    },
    {
      title: "IT Accessories",
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1042&auto=format&fit=crop",
      iconColor: "green",
      description: "Essential IT accessories including cables, chargers, mice, keyboards, webcams, and more for modern workspaces."
    },
    {
      title: "COVID Safety Items",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=1106&auto=format&fit=crop",
      iconColor: "teal",
      description: "Complete range of COVID safety products including masks, sanitizers, thermometers, and protective equipment."
    },
    {
      title: "Eco-Friendly Products",
      icon: Recycle,
      image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1025&auto=format&fit=crop",
      iconColor: "green",
      description: "Sustainable office solutions including recycled paper products, eco-friendly cleaning supplies, and biodegradable items."
    }
  ];

  return (
    <>
      <Head>
        <title>Office Supply Solutions | Koncept Services</title>
        <meta name="description" content="Discover our comprehensive range of office supplies including stationery, housekeeping, pantry items, IT accessories and COVID safety equipment for businesses across Delhi NCR." />
        <meta name="keywords" content="office supplies, stationery, housekeeping materials, pantry supplies, COVID safety items, Delhi NCR, eco-friendly products, IT accessories" />
        <meta property="og:title" content="Office Supply Solutions | Koncept Services" />
        <meta property="og:description" content="Professional office supplies with 48-hour delivery across Delhi NCR and Pan India." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1035&auto=format&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Office Supply Solutions | Koncept Services" />
        <meta name="twitter:description" content="Professional office supplies with 48-hour delivery across Delhi NCR and Pan India." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1035&auto=format&fit=crop" />
        <link rel="canonical" href="https://konceptservices.com/office-supplies" />
      </Head>
    
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                Office Solutions
              </span>
            </h2>
            <div className="max-w-2xl">
              <p className="text-base text-gray-600">
                We provide office supply solutions to help businesses maintain productive and safe work environments with 48-hour delivery.
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                icon={service.icon}
                image={service.image}
                iconColor={service.iconColor}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesSection;