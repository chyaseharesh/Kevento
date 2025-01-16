"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RunningClock from "./RunningClock";

// Interface for image data
interface ImageData {
  src: string;
  title: string;
  subtitle: string;
}

// Image data array with content
const images: ImageData[] = [
  {
    src: "https://cdn.nayathegana.com/e5/media/events/banner/038db0ba-4fe9-4529-bd8a-9c88518a2a31.png",
    title: "Tuborg Open Events",
    subtitle: "Experience live performances like never before",
  },
  {
    src: 'https://cdn.nayathegana.com/e5/media/events/event/ce7056a1-d673-485b-840e-a5badf5114c0.jpeg', // Example URL
    title: "Khatra Events",
    subtitle: "Join us for unforgettable experiences",
  },
  {
    src: 'https://cdn.nayathegana.com/e5/media/events/event/ce7056a1-d673-485b-840e-a5badf5114c0.jpeg', // Example URL
    title: "Exclusive Concerts",
    subtitle: "Get your tickets now for an amazing show",
  },
];

export default function ImageSlider(): JSX.Element {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto mt-4">
      <div
        className="relative h-[550px] mx-12 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `url(${images[currentIndex].src.toString()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content Centered */}
        <div className="flex flex-col justify-center items-center h-full text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 backdrop-blur-sm">
            <p className="mx-auto -mt-4 max-w-2xl tracking-tight text-primary-active sm:mt-6 font-extrabold text-4xl shadow-slate-500">
              {images[currentIndex].title}
            </p>
            <h1 className="mx-auto max-w-4xl font-display text-white md:text-5xl lg:text-6xl font-extrabold tracking-tight sm:text-7xl">
              {images[currentIndex].subtitle}
            </h1>
            <p className="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
              <RunningClock />
            </p>
            <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
              <a
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border text-white hover:bg-primary-hover active:bg-white active:text-slate-600 focus-visible:outline-slate-900 animate-fade-in-left"
                href="#"
              >
                <span className="ml-3">VIEW DETAILS</span>
              </a>
              <div className="relative flex flex-1 flex-col items-stretch sm:flex-none">
                <button
                  className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-secondary hover:bg-secondary-hover hover:text-white hover:text-secondary-hover hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right"
                  type="button"
                >
                   <span className="h-3 w-3 flex-none fill-current text-secondary-active">
                      Get Your Tickets Now
                    </span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="flex space-x-8 absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {/* Previous Button */}
            <button
              className="transform h-[50px] w-[50px] rounded-full bg-transparent text-white p-2 group"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="text-gray-800 group-hover:text-secondary" />
            </button>

            {/* Next Button */}
            <button
              className="transform h-[50px] w-[50px] rounded-full bg-transparent text-white p-2 group"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight className="text-gray-800 group-hover:text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicator */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex ? "bg-secondary rounded-xl" : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}
