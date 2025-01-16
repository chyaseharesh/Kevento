import React from 'react'
import CandidCards from '@/components/common/CandidatesCards';

const Candidates = () => {
  return (
    <>
<div className="flex items-center justify-center mt-12">  
   <div className=" rounded-xl bg-gray-100 shadow max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
  <div className="flex flex-col md:flex-row">
    <div className="md:w-1/3 text-center mb-8 md:mb-0">
      <img src="https://cdn.ticketsanjal.com/images/2024/09/24/054300-c74e3db9-c422-4d2d-a91c-830799990fb7.jpeg" alt="Profile Picture" className=" w-48 h-48 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-primary  mb-2">Kusom Freshers</h1>
    </div>
    <div className="md:w-2/3 md:pl-8">
    <p className="text-primary dark:text-primary font-extrabold">About Kusom Freshers</p>
    <p className="text-gray-600 dark:text-gray-600 mb-6 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero dicta voluptas, tenetur est nisi provident porro pariatur itaque ipsum, nesciunt explicabo dignissimos maiores debitis officia soluta illo! Corporis, labore vitae.
      </p>
     
      <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
      <ul className="space-y-2 text-gray-600 dark:text-gray-600">
        <li className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary dark:text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          tripathisarwagya123@gmail.com
        </li>
        <li className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary dark:text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          9803566380
        </li>
        <li className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary dark:text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Kathmandu
        </li>
      </ul>
    </div>
  </div>
</div>

</div>
   <CandidCards/>
    </>
   
  )
}

export default Candidates;
