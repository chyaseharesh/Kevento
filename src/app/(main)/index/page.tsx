import CategoryCard from '@/components/common/CategoryCard';
import React from 'react'

function Index() {
  return (
    <>
      <div className="w-full">
        {/* Hero Banner */}
        <div className="w-full relative bg-center bg-cover draggable m-0 p-0 h-[70vh] bg-fixed text-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww")' }} draggable="true">
          <div className="w-full h-full left-0 top-0 absolute inset-0 bg-black opacity-70" />
          <div className="container flex flex-col items-center gap-16 mx-auto relative py-40">
            <div className="flex flex-col gap-7 w-7/12">
              <div className="flex flex-col gap-2 px-6 text-center mx-auto">
                <h2 className="font-extrabold leading-tight text-white font-display text-5xl">Book Your Next Adventure</h2>
                <p className="text-base font-light leading-7 text-white">
                  Find and book the best events, experiences, and activities around the world with just a few clicks. From concerts to workshops, we&apos;ve got you covered.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <button className="flex items-center justify-center py-4 text-white px-7 rounded-2xl focus:ring-4 focus:ring-purple-blue-100 transition duration-300 hover:bg-primary-hover bg-primary">
                  Explore Events
                </button>
              </div>

            </div>
          </div>
        </div>





        {/* Category card  */}
        <CategoryCard />

      <div className="container mx-auto p-6 px-12">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center mt-16 lg:mt-8">
              <h2 className="mb-4 text-3xl font-extrabold leading-tight text-center lg:text-4xl text-primary-active">Discover Your Event</h2>
              <p className="w-9/12 text-lg text-center text-grey-700">Explore a range of exciting events! Book tickets for concerts, dance performances, and celebrity stage shows. Your next adventure is just a click away!</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-10 mt-20 mb-8">
              <div className="col-span-3 overflow-hidden lg:col-span-1 rounded-3xl">
                <div className="h-full w-full bg-cover bg-top scale-150 " style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D")', }}>
                </div>
              </div>
              <div className="grid grid-cols-1 col-span-3 lg:grid-cols-2 lg:col-span-2">

                <div className="flex flex-col items-center col-span-1 gap-6 px-10 py-5">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary">
                      {/* <!-- Singing Event Icon --> */}
                      <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z" />
                      </svg>

                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 text-center">
                    <h4 className="text-2xl font-extrabold text-primary-active">Singing Concerts</h4>
                    <p className="px-3 font-medium text-grey-700">Experience live performances from your favorite singers. Book your tickets for the upcoming concerts now!</p>
                  </div>
                </div>

                <div className="flex flex-col items-center col-span-1 gap-6 px-10 py-5">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary">
                      {/* <!-- Festival  --> */}
                      <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2" />
                      </svg>


                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 text-center">
                    <h4 className="text-2xl font-extrabold text-primary-active">Festivals Concerts</h4>
                    <p className="px-3 font-medium text-grey-700">
                      Celebrate music with extraordinary performances by top artists. Join the Singing Festivals and make unforgettable memories!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center col-span-1 gap-6 px-10 py-5">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary">
                      {/* <!-- Dance Performance Icon --> */}
                      <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z" />
                      </svg>

                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 text-center">
                    <h4 className="text-2xl font-extrabold text-primary-active">Dance Performances</h4>
                    <p className="px-3 font-medium text-grey-700">Join the most energetic dance performances. From hip-hop to classical, immerse yourself in a variety of dance forms.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center col-span-1 gap-6 px-10 py-5">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary">
                      {/* <!-- Celebrity Stage Shows Icon --> */}
                      <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 text-center">
                    <h4 className="text-2xl font-extrabold text-primary-active">Celebrity Stage Shows</h4>
                    <p className="px-3 font-medium text-grey-700">Get a chance to watch your favorite celebrities perform live. Book your tickets for an unforgettable experience!</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index;