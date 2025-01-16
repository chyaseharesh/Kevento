"use client";

import PopularPost from "@/components/common/popularPost";
// import { EventCard } from "@/components/common/BlogCards";
import React, { useState } from "react";

const VotingProfile = () => {
  const [isActive, setIsActive] = useState(false);

  const handleVoteClick = () => {
    setIsActive((prevState) => !prevState); // Toggle between true and false
  };
  return (
    <>
<div className="max-w-4xl flex flex-col lg:flex-row items-center mx-auto my-8 lg:my-16">
  {/* Profile Card */}
  <div className="w-full lg:w-3/5 bg-white rounded-lg shadow-xl lg:rounded-l-lg p-6 md:p-12 mx-4 lg:mx-0">
    {/* Profile Image for Mobile */}
    <div className="block lg:hidden rounded-full shadow-xl mx-auto h-36 w-36 bg-cover bg-center -mt-12" 
         style={{ backgroundImage: 'url("https://cdn.ticketsanjal.com/images/2024/09/24/023631-Roshima%20Bhatta.jpeg")'}} 
    />
    
    <h1 className="text-2xl font-bold text-center lg:text-left mt-6">Roshima Bhatta</h1>
    <div className="w-16 border-b-2 border-primary opacity-50 mx-auto lg:mx-0 mt-4"></div>

    {/* Information Section */}
    <div className="mt-4 space-y-3">
      <p className="flex items-center justify-center lg:justify-start text-base font-bold">
        <svg className="w-5 h-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
        </svg>
        17 Dec
      </p>
      <p className="flex items-center justify-center lg:justify-start text-sm text-gray-600">
        <svg className="w-5 h-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        12:30 PM
      </p>
      <p className="flex items-center justify-center lg:justify-start text-sm text-gray-600">
        <svg className="w-5 h-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
        </svg>
        Kathmandu
      </p>
    </div>

    {/* Introduction */}
    <p className="mt-8 text-sm text-gray-700 text-justify">
      Hi, I’m Roshima! I describe myself as diligent, pookie, and a yapper. I’m excited to join KUSOM Freshers 2024 as a chance to confront my stage fear and build my confidence. I look forward to meeting new friends and enjoying this vibrant experience together!
    </p>

   {/* voting btn Call to Action btn */}
   <div className="mt-8 flex flex-wrap justify-between items-center bg-white rounded-3xl shadow-md p-4">
      {/* Price */}
      <div className="text-black font-medium">
        Rs.<br />
        <span className="text-xl">50</span>
      </div>

      {/* Vote Button */}
      <button
  onClick={handleVoteClick}
  className={`${
    isActive ? "bg-secondary hover:bg-secondary-hover" : "bg-secondary hover:bg-secondary-active"
  } text-white font-bold py-2 px-6 rounded-full transition-all focus:outline-none`}
>
  {isActive ? "Voted" : "Vote"}
</button>


      {/* Heart Icon */}
      <button className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isActive ? "red" : "none"}  // Toggle fill color based on state
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke={isActive ? "red" : "black"} // Toggle stroke color based on state
          className="w-6 h-6 transition-all duration-300 ease-in-out"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21l-1.45-1.318C5.4 15.36 2 12.278 2 8.5 2 5.42 4.42 3 7.5 3A5.5 5.5 0 0112 6.344 5.5 5.5 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.778-3.4 6.86-8.55 11.182L12 21z"
          />
        </svg>
      </button>
    </div>


  </div>
    {/*Img Col*/}
    <div className="w-full lg:w-2/5">
    {/* Big profile image for side bar (desktop) */}
    <img src="https://cdn.ticketsanjal.com/images/2024/09/24/023631-Roshima%20Bhatta.jpeg" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
    {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
  </div>
</div>


{/* component */}
<div className="max-w-screen-lg mx-auto">
  
  {/* header ends here */}
  <main className="mt-12">
    {/* simler events */}
  {/* <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
      <h2 className="font-bold text-3xl">Popular news</h2>
      <a href="./blog" className="bg-gray-200 hover:bg-red-300 text-gray-800 px-3 py-1 rounded cursor-pointer">
        View all
      </a>
    </div>
    <Cards/> */}

 {/* popular posts */}
 <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
      <h2 className="font-bold text-3xl">Popular news</h2>
      <a href="./blog" className="bg-gray-200 hover:bg-secondary-hover hover:text-white text-gray-800 px-3 py-1 rounded cursor-pointer">
        View all
      </a>
    </div>

   {/* popular car */}
          <PopularPost/>
   {/* popular end */}
  </main> 
  </div>
    </>
  )
}

export default VotingProfile;