import React from 'react';
// import img from '../../app/images/logo.jpg';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[600px]">

    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img 
        src="../../app/images/logo.jpg" // Image source
        alt="Loading..." // Adding alt text for better accessibility
        className="rounded-full h-28 w-28 text-primary"
      />
    </div>
    </div>
  );
};

export default Loading;
