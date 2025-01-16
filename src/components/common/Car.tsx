'use client'
import React from 'react'
import { useState } from "react";

const slides = [
    "https://cdn.nayathegana.com/e5/media/events/banner/038db0ba-4fe9-4529-bd8a-9c88518a2a31.png",
    "https://cdn.nayathegana.com/e5/media/events/banner/eb194f40-b878-42b1-bff1-2daf88ff3051.jpeg",
    "https://cdn.nayathegana.com/e5/media/events/event/ce7056a1-d673-485b-840e-a5badf5114c0.jpeg",
  ];



function Car() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <>
    <div className="max-w-2xl m-auto">
      <div className="relative mb-4 mt-4 ml-4">
        {/* Carousel Wrapper */}
        <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                className="block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute top-0 left-0 z-30 flex items-center justify-center px-4 h-full group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute top-0 right-0 z-30 flex items-center justify-center px-4 h-full group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
    </>
  )
}

export default Car;