"use client";
import { markdownify } from "@lib/utils/textConverter";
import React, { useState, useEffect } from 'react';

const Testimonial = ({ testimonial }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!testimonial?.list) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonial.list.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, testimonial?.list]);

  const nextSlide = () => {
    if (isAnimating || !testimonial?.list) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonial.list.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating || !testimonial?.list) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonial.list.length) % testimonial.list.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex || !testimonial?.list) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!testimonial?.list || testimonial.list.length === 0) {
    return null;
  }

  const currentTestimonial = testimonial.list[activeIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
           <div className="animate text-center">
          <p>{testimonial.subtitle}</p>
          {markdownify(testimonial.title, "h2", "mt-4 section-title")}
          {markdownify(testimonial.description, "p", "mt-10")}
        </div>

        

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">"</span>
              </div>
            </div>

            {/* Content */}
            <div 
              className={`transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {/* Testimonial Text */}
              <blockquote className="text-md md:text-md text-gray-800 text-center mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gray-50 rounded-xl">
                <img
                  className="w-16 h-16 rounded-full object-cover border-3 border-orange-200"
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.author)}&background=f97316&color=fff&size=64`;
                  }}
                />
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-orange-600 font-medium">
                    {currentTestimonial.profession}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonial.list.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-orange-50 disabled:opacity-50"
                disabled={isAnimating}
              >
                <span className="text-orange-600 text-lg font-bold">‹</span>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-orange-50 disabled:opacity-50"
                disabled={isAnimating}
              >
                <span className="text-orange-600 text-lg font-bold">›</span>
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {testimonial.list.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonial.list.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-orange-500 rounded-full'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;