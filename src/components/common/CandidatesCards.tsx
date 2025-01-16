import React from 'react';

function CandidCards() {
  return (
    <>
  <div className="max-w-screen-xl w-full mx-auto p-5 sm:p-10 md:p-16">
    <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5 w-full">
       
       {/* card content  */}
       <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
      style={{
        height: 450,
        backgroundImage:
          'url(https://cdn.ticketsanjal.com/images/2024/09/24/023631-Roshima%20Bhatta.jpeg)',
      }}
    >
      <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
      <main className="p-5 z-10 flex flex-col">
        <a
         href="./votingprofile"
          className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
        >
          Dr. Angela Bhusal
        </a>
        <div className="mt-3 flex justify-between items-center flex-1 flex-wrap gap-5">
          <a
            href="./votingprofile"
            className="text-xs bg-primary text-white px-5 py-2 uppercase hover:bg-white hover:text-primary-hover transition ease-in-out duration-500"
          >
            Vote Now
          </a>
          <div className="text-white font-regular flex flex-col justify-start text-center">
            <span className="text-3xl leading-none font-semibold">25</span>
            <span className="-mt-1">May</span>
          </div>
        </div>
      </main>
       </div>

       {/* card content  */}
       <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
      style={{
        height: 450,
        backgroundImage:
        'url(https://cdn.ticketsanjal.com/images/2024/09/24/022837-Nidhi%20Chapagain.jpeg)',
      }}
    >
      <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
      <main className="p-5 z-10 flex flex-col">
        <a
          href="./votingprofile"
          className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
        >
          Dr. Angela Bhusal
        </a>
        <div className="mt-3 flex justify-between items-center flex-1 flex-wrap gap-5">
          <a
            href="./votingprofile"
            className="text-xs bg-primary text-white px-5 py-2 uppercase hover:bg-white hover:text-primary-hover transition ease-in-out duration-500"
          >
            Vote Now
          </a>
          <div className="text-white font-regular flex flex-col justify-start text-center">
            <span className="text-3xl leading-none font-semibold">25</span>
            <span className="-mt-1">May</span>
          </div>
        </div>
      </main>
       </div>

       {/* card content  */}
       <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
      style={{
        height: 450,
        backgroundImage:
          'url(https://cdn.ticketsanjal.com/images/2024/09/24/021922-Sameera%20Thapa.jpeg)',
      }}
    >
      <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
      <main className="p-5 z-10 flex flex-col">
        <a
           href="./votingprofile"
          className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
        >
          Dr. Angela Bhusal
        </a>
        <div className="mt-3 flex justify-between items-center flex-1 flex-wrap gap-5">
          <a
            href="./votingprofile"
            className="text-xs bg-primary text-white px-5 py-2 uppercase hover:bg-white hover:text-primary-hover transition ease-in-out duration-500"
          >
            Vote Now
          </a>
          <div className="text-white font-regular flex flex-col justify-start text-center">
            <span className="text-3xl leading-none font-semibold">25</span>
            <span className="-mt-1">May</span>
          </div>
        </div>
      </main>
       </div>
        {/* card content  */}
        <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
      style={{
        height: 450,
        backgroundImage:
          'url(https://cdn.ticketsanjal.com/images/2024/09/24/061055-Pratistha%20Shakya.jpeg)',
      }}
    >
      <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
      <main className="p-5 z-10 flex flex-col">
        <a
          href="./votingprofile"
          className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
        >
          Dr. Angela Bhusal
        </a>
        <div className="mt-3 flex justify-between items-center flex-1 flex-wrap gap-5">
          <a
            href="./votingprofile"
            className="text-xs bg-primary text-white px-5 py-2 uppercase hover:bg-white hover:text-primary-hover transition ease-in-out duration-500"
          >
            Vote Now
          </a>
          <div className="text-white font-regular flex flex-col justify-start text-center">
            <span className="text-3xl leading-none font-semibold">25</span>
            <span className="-mt-1">May</span>
          </div>
        </div>
      </main>
       </div>

    </div>
  </div>
    </>
  );
}

export default CandidCards;
