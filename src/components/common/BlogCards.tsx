import React from 'react'

function BlogCards() {
  return (
    <>
<div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
  <div className="border-b mb-5 flex justify-between text-sm">
    <div className="text-primary flex items-center pb-2 pr-2 border-b-2 border-primary uppercase">
     
      <svg className="h-6 mr-3 w-6 h-6 text-primary dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"/>
</svg>

      <a href="#" className="font-semibold inline-block">Khatra BLog</a>
    </div>
    <a href="#">See All</a>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    
    {/* CARD 1 */}
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <a href="./blogSecDec" />
      <div className="relative"><a href="./blogSecDec">
          <img className="w-full" src="https://cdn.ticketsanjal.com/images/2023/08/11/115556-shilpa.jpg" alt="Sunset in the mountains" />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
          </div>
        </a>
        <a href="./blogSecDec">
          <div className="text-xs absolute top-0 right-0 bg-primary px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-primary transition duration-500 ease-in-out">
            Lear More
          </div>
        </a>
      </div>
      <div className="px-6 py-4 mb-auto">
        <a href="#" className="font-medium text-lg inline-block hover:text-primary-hover transition duration-500 ease-in-out mb-2">
        Freshers Party</a>
        <p className="text-gray-500 text-sm">
        Wind of Festival 2024: The Ultimate Musical Celebration in Kathmandu
        </p>
      </div>
      <div className="px-6 py-3 flex flex-row flex-wrap items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <svg className="w-6 h-6  text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.5 11.5 2.071 1.994M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L10 17Zm-5 3h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
          </svg>
          <span className="ml-1">nov 16, 2024</span>
        </span>
        <span className="py-1 font-regular text-gray-900 mr-1 flex flex-row items-center text-xs">
        <svg className="w-6 h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
        <span className="ml-1">Ticket Sanjal</span>
        </span>
      </div>
    </div>
   

  </div>
</div>


    </>
  )
}

export default BlogCards;