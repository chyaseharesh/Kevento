import React from 'react';
import Image from 'next/image';
import Playstore from '../../app/images/playstore.png';
import Applestore from '../../app/images/appstore.png';

function appstorelink() {
  return (
    <div className="bg-secondary/90 ">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
       
        {/* Mobile App Section */}
        <div className="px-6 py-6 md:px-12 lg:flex lg:items-center lg:px-16">
          <div className="lg:flex-1 xl:w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Download Our Mobile Application
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
              Get the latest updates, book tickets, and more from our mobile
              application.
            </p>
          </div>
          <div className="mt-8 flex space-x-4 flex-wrap justify-center align-middle m-0 ">
            <Image
              src={Playstore}
              alt="Download on Google Play"
              className="object-cover"
              width={150}
              height={30}
            
            />
            <Image
              src={Applestore}
              alt="Download on the App Store"
              className="object-cover"
              width={150}
              height={30}
           
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default appstorelink;
