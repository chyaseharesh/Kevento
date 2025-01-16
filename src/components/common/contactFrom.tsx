import React from 'react';
import Form from './Form';

function ContactForm() {
  return (
    <>
      <section className="pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <Form />
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                 
                  {/* <div className="absolute top-0 left-0 w-full h-full lg:rounded-l-2xl rounded-2xl"></div> */}

                  <div className=" top-0 w-full lg:p-11 p-5">
                    <div>
                      <h1 className="text-primary text-3xl font-extrabold">Let&apos;s Talk</h1>
                      <p className="text-sm text-gray-600 mt-4">
                        Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project and provide help.
                      </p>

                      <div className="mt-12">
                        <h2 className="text-primary text-base font-bold">Contact Details</h2>
                        <ul className="mt-4 space-y-4">
                          <li className="flex items-center text-gray-600">
                            <i className="w3-icon w3-xxlarge w3-text-primary mr-3 w3-location"></i>
                            <span>Tinkune, Kathmandu, Bagmati Province - Nepal</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="w3-icon w3-xxlarge w3-text-primary mr-3 w3-phone">
                            <svg className="w-6 h-6 text-gray-800 dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
                            </svg>
                            </i>
                            <span>+977 9820560086 / 9847421352</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="w3-icon w3-xxlarge w3-text-primary mr-3 w3-mail">
                            <svg className="w-6 h-6 text-gray-800 dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"/>
                            </svg>

                            </i>
                            <a href="mailto:contact@ticketsanjal.com" className="text-primary">contact@ticketsanjal.com</a>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="w3-icon w3-xxlarge w3-text-primary mr-3 w3-globe">
                            <svg className="w-6 h-6 text-gray-800 dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                            </svg>

                            </i>
                            <a href="http://www.ticketsanjal.com" className="text-primary">www.ticketsanjal.com</a>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-12">
                        <h2 className="text-primary text-base font-bold">Follow Us</h2>
                        <ul className="flex mt-4 space-x-4">
                          <li className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                              <svg className="w-6 h-6 text-primary dark:text-primary hover:text-primary-hover hover:border-b-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                            </svg>
                          </li>
                          <li className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                             <svg className="w-6 h-6 text-primary dark:text-primary hover:text-primary-hover hover:border-b-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                            </svg>
                          </li>
                        
                          <li className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-primary dark:text-primary hover:text-primary-hover hover:border-b-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                            </svg>

                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
<div className="relative w-full aspect-w-16 aspect-h-9 lg:p-11 rounded-b-3xl">
  <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d28263.89249083693!2d85.30231680152598!3d27.686810228487754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20Tinkune%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1734252343190!5m2!1sen!2snp" 
  
  height={400} style={{ width: '100%', border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
</div>


    </>
  );
}

export default ContactForm;
