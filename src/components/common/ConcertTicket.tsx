/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '../../app/css/card.css';

type EventProp = {
  title: string;
  venue: string;
  date: string;
  organizer: string;
  img: string;
};

function ConcertTicket({ keyss, qrcode, ticketNumber, ticketType, eventdetails }: {keyss:number; qrcode: string; ticketNumber: string; ticketType: string; eventdetails: EventProp }) {
  return (
    <>
      <main className="w-full">
        <section className="w-full flex-grow flex items-center justify-center">
          <div className="flex w-full text-white h-[80mm]">
            {/* QR Code Section */}
            <div className="h-full overflow-hidden p-2 w-64 border-dashed border-r-4 border-white bg-zinc-900 flex flex-col items-center justify-center px-3 rounded-3xl">
              <div className="h-auto">
                <img src={qrcode} alt="QR Code" />
              </div>
              <div className="flex flex-col items-center m-1 mt-3">
                <span className="text-xs text-white">Ticket {keyss+1}</span>
              </div>
            </div>

            {/* Event Information Section */}
            <div className="h-full py-8 px-6 flex-grow rounded-r-3xl flex flex-col bg-cover bg-center backdrop-blur-sm bg-black/70 rounded-3xl" 
              style={{ backgroundImage: `url(${eventdetails?.img})` }}>
              {/* Overlay for better content visibility */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-sm rounded-3xl"></div>

              <div className="relative z-10 flex flex-col w-full justify-between row-span-10 text-start gap-32">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-gray-200 font-mono text-sm">{ticketNumber}</span>
                    <span className="text-3xl font-bold text-white">{eventdetails?.title}</span>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-zinc-500 text-sm">Type</span>
                    <span className="text-2xl font-bold text-white">{ticketType}</span>
                  </div>
                </div>

                <div className="flex w-full mt-auto justify-between float-end">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Date</span>
                    <span className="font-mono text-white">{new Date(eventdetails?.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Time</span>
                    <span className="font-mono text-white">{new Date(eventdetails?.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Location</span>
                    <span className="font-mono text-white">{eventdetails?.venue}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Event Organizer</span>
                    <span className="font-mono text-white">{eventdetails?.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ConcertTicket;
