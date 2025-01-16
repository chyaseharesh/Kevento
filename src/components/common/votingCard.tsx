import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function VotingCard() {
  return (
    <>
  
<div className="flex justify-center items-center min-h-screen pt-14 mb-10">
  <div className="max-w-[720px] mx-auto">
    <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
      <a target="_blank" href="https://www.material-tailwind.com/docs/html/card" className="block w-full px-4 py-2 text-center text-slate-700 transition-all">
        On Going <b className='text-primary font-extrabold'>Events</b>.
      </a>
    </div>

    <div className='flex flex-row justify-around align-middle py-8 gap-20'>
    {/* Centering wrapper */}
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
        <Image 
        src={`../../app/images/e-1.jpg`}
         alt="card-image" className="object-cover w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          Kusom Freshers
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            <samp className='text-primary'>15</samp> Candidates
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          Location
        </p>
      </div>
      <div className="p-6 pt-0">
      <Link href="candidates" passHref>
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-primary shadow-gray-900/10 hover:text-white focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
        >
          Vote Now
        </button>
      </Link>
    </div>
    </div>

    

    </div>
  </div>
</div>

    </>
  );
}

export default VotingCard;
