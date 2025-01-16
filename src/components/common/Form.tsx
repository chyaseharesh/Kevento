import React from 'react';

function Form() {
  return (
    <>
      <form action="#" method="post">
        <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
          <h2 className="text-primary font-manrope text-4xl font-semibold leading-10 mb-11">Contact Us</h2>
          
          <input 
            type="text" 
            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
            placeholder="Name" 
          />
          <input 
            type="text" 
            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
            placeholder="Email" 
          />
          <input 
            type="text" 
            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
            placeholder="Phone" 
          />
          
          {/* Message field with rows and columns for textarea */}
          <textarea 
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10"
            placeholder="Message" 
            rows={5} // Adjust the number of rows here
            cols={5} // Adjust the width (optional)
          ></textarea>

          <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-primary bg-primary-hover shadow-sm">
            Send
          </button>

          <p className="text-sm text-gray-600 mt-4">
            This site is protected by reCAPTCHA and the Google <span>
              <a href="https://policies.google.com/privacy" className='text-secondary' target='_blank'>Privacy Policy </a>
              and 
              <a href="https://policies.google.com/terms" className='text-secondary' target='_blank'> Terms of Service apply.</a>
            </span>
          </p>
        </div>
      </form>
    </>
  );
}

export default Form;
