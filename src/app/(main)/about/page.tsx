import React from 'react'

const About = () => {
  return (
    <>
        <section className="py-24 relative">
  <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
    <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
      <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
        <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
          <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
          About Ticket Sanjal
                    </h2>
          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
          Welcome to Ticket Sanjal, your one-stop for all your event ticketing needs. We are an event ticketing platform specializing in promoting and selling tickets for various events, from music concerts and sports matches to theater shows and festivals events.          
          </p>

          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
          Our mission at Ticket Sanjal is to provide event organizers with the tools they need to create successful events that reach their target audience. We offer a comprehensive platform that enables event organizers to create and manage events, sell tickets, and promote their events to our vast network of event-goers.

          </p>

          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
          At Ticket Sanjal, we understand that organizing an event can be a daunting task, which is why we are committed to providing a hassle-free experience to our clients. Our user-friendly platform is designed to simplify the ticketing process.
          </p>

          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
          We pride ourselves on offering personalized service to each of our clients, no matter the size or scale of their event. Our team is dedicated to ensuring that every event listed on our platform receives the attention it deserves, with tailor-made marketing strategies that maximize ticket sales and ensure the event is a success.

          </p>

          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
          Whether you are an event organizer looking to sell tickets for your upcoming event, or an event-goer looking for an exciting experience, Ticket Sanjal is the ultimate destination for all your event needs. Join our community today and let us help you create an unforgettable event experience.
          </p>

        </div>
        <button 
          className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
          aria-label="Get started with Ticket Sanjal"
        >
          <span className="px-1.5 text-white text-sm font-medium leading-6">Get Started</span>
        </button>
      </div>
      <img 
        className="lg:mx-0 mx-auto h-full rounded-3xl object-cover" 
        src="https://pagedone.io/asset/uploads/1717751272.png" 
        alt="Ticket Sanjal event banner" 
      />
    </div>
  </div>
</section>      
    </>
  )
}

export default About
