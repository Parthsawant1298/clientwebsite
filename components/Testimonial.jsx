"use client";
import { Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const AnimatedTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Vikram Sharma",
      role: "Office Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Koncept Services transformed our office supplies management completely. Their 48-hour delivery service has been a game-changer for our fast-paced environment!",
      rating: 5,
      company: "TechSphere Solutions"
    },
    {
      name: "Priya Mehta",
      role: "Administrative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "The quality of their stationery and housekeeping supplies is exceptional. We've been consistently impressed with both the products and the service level.",
      rating: 5,
      company: "Axis Financial Group"
    },
    {
      name: "Rohit Kapoor",
      role: "Facilities Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Their comprehensive range of COVID safety items helped us implement proper protocols quickly. The convenience of getting all our office needs from one vendor is invaluable.",
      rating: 5,
      company: "Global Services Ltd"
    },
    {
      name: "Neha Patel",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "As a growing startup, we needed reliable supplies without the hassle. Koncept Services' easy ordering process and consistent delivery makes a real difference to our operations.",
      rating: 5,
      company: "Innovate Hub"
    },
    {
      name: "Raj Singh",
      role: "Procurement Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Their pantry and IT accessories selection is excellent. The team is responsive and always ready to help with special requirements or bulk orders.",
      rating: 5,
      company: "Horizon Enterprises"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <style jsx global>{`
        @keyframes slideIn {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .testimonial-container {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>

      <div className="testimonial-container py-8 md:py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Client <span className="text-teal-600">Testimonials</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from satisfied clients who rely on our office supply solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start md:items-center">
            {/* Main Testimonial */}
            <div className="md:col-span-7 w-full">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`relative transition-all duration-1000 ease-out w-full
                    ${activeTestimonial === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{
                    animation: activeTestimonial === idx ? 'slideIn 0.8s ease-out' : 'none',
                    display: activeTestimonial === idx ? 'block' : 'none'
                  }}
                >
                  <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-teal-100">
                    <div className="mb-6 md:mb-8">
                      <Quote className="w-12 h-12 md:w-16 md:h-16 text-teal-200" style={{ animation: 'pulse 3s infinite' }} />
                    </div>
                    
                    <p className="text-xl md:text-3xl font-light text-gray-800 mb-6 md:mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="relative group flex-shrink-0">
                        <div className="absolute inset-0 bg-teal-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-white"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm md:text-base text-gray-600 mb-1">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                        <div className="flex gap-1 mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-4 h-4 md:w-5 md:h-5 text-teal-600 fill-teal-600"
                              style={{ animation: `fadeUp 0.5s ease-out ${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Stack */}
            <div className="hidden md:block md:col-span-5 relative h-[600px]">
              {testimonials.map((testimonial, idx) => {
                const position = (idx - activeTestimonial + testimonials.length) % testimonials.length;
                return (
                  <div
                    key={idx}
                    className="absolute w-full transition-all duration-700 ease-out cursor-pointer hover:scale-105"
                    style={{
                      top: `${position * 100}px`,
                      opacity: position < 3 ? 1 - (position * 0.3) : 0,
                      transform: `scale(${1 - (position * 0.1)}) translateY(${position * 10}px)`,
                      zIndex: testimonials.length - position
                    }}
                    onClick={() => setActiveTestimonial(idx)}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-teal-100 hover:border-teal-300 transition-all">
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-teal-600 fill-teal-600" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 md:gap-2 mt-4 md:mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`transition-all duration-300 ${
                  activeTestimonial === idx 
                    ? 'w-8 md:w-12 h-1 bg-teal-600' 
                    : 'w-1 h-1 bg-gray-300 hover:bg-teal-400'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;