'use client'
import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import Loading from '../ui/loding';

type Event = {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  location: string;
  category: { name: string };
  title: string;
  imageUrl: string;
  venue: string;
  totalTicket: number;
};

type Props = object;

function FilterSideNavbar({ }: Props) {

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [events, setEvents] = useState<Event[] | null>(null); // Null for loading state
  const [filteredData, setFilteredData] = useState<Event[]>([]); 

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data); // Set the full event data
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Fallback to empty array on error
      }
    };

    fetchEvents();
  }, []);



  if (events === null) {
    return <Loading />;
  }
  return (
    <>
    <section className="pt-12 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
                <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                    
                    <li className="flex items-center cursor-pointer outline-none group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                                d="M9.69081 22H13.537M11.6139 2V3.53846M18.4123 4.8163L17.3244 5.90416M4.8155 4.81701L5.90336 5.90486M2 11.6154H3.53846M19.6893 11.6154H21.2278M7.53442 15.6948C5.2814 13.4418 5.2814 9.78895 7.53442 7.53592C9.78744 5.2829 13.4403 5.2829 15.6933 7.53592C17.9464 9.78895 17.9464 13.4418 15.6933 15.6948C15.1999 16.1883 14.6393 16.5737 14.041 16.851C13.745 16.9881 13.537 17.2743 13.537 17.6005L13.537 18.9231C13.537 19.3479 13.1926 19.6923 12.7677 19.6923H10.46C10.0352 19.6923 9.69081 19.3479 9.69081 18.9231V17.6005C9.6908 17.2743 9.48274 16.9881 9.18677 16.851C8.58845 16.5737 8.02786 16.1883 7.53442 15.6948Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <span className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">Found <span className='text-red-700'>91</span> events
                            </span>
                    </li>

                </ul>

                <div className="relative w-full max-w-sm">
                   
                <div id="date-range-picker" date-rangepicker className="flex items-center">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input id="datepicker-range-start" name="start" type="text" className="block w-full ps-10 p-2.5  bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="Select date start"/>
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input id="datepicker-range-start" name="start" type="text" className="block w-full ps-10 p-2.5   bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="Select date start"/>
                </div>
                </div>

                </div>


            </div>
            <svg className="my-7 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                fill="none">
                <path d="M0 1H1216" stroke="#E5E7EB" />
            </svg>
            
            
            <div className="grid grid-cols-12">
      {/* Toggle Button for Mobile */}
      <div className="col-span-12 md:hidden p-5">
        <button
          onClick={toggleFilterVisibility}
          className="py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 w-full"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Section */}
      <div
        className={`col-span-12 md:col-span-3 p-5 flex-wrap w-full max-md:max-w-md max-md:mx-auto transition-all duration-500 ${
          isFilterVisible ? "block" : "hidden"
        } md:block`}
      >
        <form action="#">
        <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                        
                        <div className='flex  justify-evenly items-center mb-5 gap-5'>
                            <button type='button' className='py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>Cleare</button>
                            <button type='button' className='py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>Filter</button>
                        </div>

                        <input type="search" name="q" className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="Search..." autoComplete="off"/>
                    
                       
                    </div>

                    <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                            <p className="font-medium text-base leading-7 text-black ">Price</p>
                            <p className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600">
                                RESET</p>
                        </div>

                        
                        <label htmlFor="Price" className="font-medium text-sm leading-6 text-gray-600 mb-1">Price</label>
                        <div className="relative w-full mb-7">
                            <select id="Price"
                                className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                                <option selected>Max Price</option>
                                <option value="option 1">1000</option>
                                <option value="option 2">2500</option>
                                <option value="option 3">5000</option>
                                <option value="option 4">5000 above</option>
                            </select>
                            <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16"
                                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="relative w-full mb-7">
                            <select id="Price"
                                className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                                <option selected>Min Price</option>
                                <option value="option 1">1000</option>
                                <option value="option 2">2500</option>
                                <option value="option 3">5000</option>
                                <option value="option 4">5000 above</option>
                            </select>
                            <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16"
                                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <p className="font-medium text-sm leading-6 text-black mb-3">Event Categories</p>
                        <div className="box flex flex-col gap-2">
                            <div className="flex items-center">
                                <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Voting</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-2" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-2" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Exhibiton</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-3" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                            <label htmlFor="checkbox-default-3" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Music & Concerts</label>
                            </div>


                            <div className="flex items-center">
                                <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Art & Theater</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-2" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-2" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Workshop & Courses</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-3" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                            <label htmlFor="checkbox-default-3" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Sports</label>
                            </div>
                            
                            <div className="flex items-center">
                                <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">
                                Comedy</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-2" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                <label htmlFor="checkbox-default-2" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Online Events</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox-default-3" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                            <label htmlFor="checkbox-default-3" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Others</label>
                            </div>

                        </div>
                    </div>
        </form>
      </div>

      {/* Cards Section */}
      <div className="col-span-12 md:col-span-9 flex space-x-4">
        <Cards events={filteredData}/>

      </div>
    </div>

        </div>
    </section>
                         
                                                                                
    </>
  )
}

export default FilterSideNavbar