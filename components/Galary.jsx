"use client";
import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryComponent = () => {
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    // Row 1
    {
      id: 1,
      src: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Office Documents",
      category: "Office Supplies"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Cleaning Gloves",
      category: "Cleaning Supplies"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/3951901/pexels-photo-3951901.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hand Sanitizer",
      category: "Hygiene Products"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Multiple Laptops",
      category: "IT Accessories"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Drinks and Refreshments",
      category: "Pantry Supplies"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Bathroom Cleaners",
      category: "Cleaning Supplies"
    },
    
    // Row 2
    {
      id: 7,
      src: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Clothing Organization",
      category: "Office Organization"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Vintage Books",
      category: "Office Supplies"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/4021262/pexels-photo-4021262.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Disposable Tissues",
      category: "Paper Products"
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Pantry Supplies",
      category: "Office Kitchen"
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/5217883/pexels-photo-5217883.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Floor Cleaning Liquids",
      category: "Cleaning Supplies"
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Chef Preparing Food",
      category: "Kitchen Services"
    }
  ];

  const handleImageClick = (id) => {
    setActiveImage(galleryItems.find(item => item.id === id));
  };

  const handleClose = () => {
    setActiveImage(null);
  };

  const handleNext = () => {
    if (!activeImage) return;
    const currentIndex = galleryItems.findIndex(item => item.id === activeImage.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setActiveImage(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeImage) return;
    const currentIndex = galleryItems.findIndex(item => item.id === activeImage.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveImage(galleryItems[prevIndex]);
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Our <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">Product Gallery</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Explore our comprehensive range of high-quality cleaning and office supplies
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-square overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => handleImageClick(item.id)}
            >
              <img 
                src={item.src} 
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium truncate">{item.alt}</p>
                  <p className="text-teal-300 text-xs">{item.category}</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            <div className="max-w-4xl max-h-[80vh] relative">
              <img 
                src={activeImage.src} 
                alt={activeImage.alt}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                <h3 className="text-white text-lg font-medium">{activeImage.alt}</h3>
                <p className="text-teal-300 text-sm">{activeImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;