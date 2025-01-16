'use client'
import React, { useEffect, useState } from 'react';
import "../../app/css/cardstyle.css";
import Link from 'next/link';

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

function CategoryCard() {
  const [filteredData, setFilteredData] = useState<Event[]>([]); 

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container flex flex-col items-center gap-16 mx-auto bg-gray-200">
      <h2 className="text-3xl font-extrabold leading-tight text-center lg:text-4xl text-primary-active mt-12">
        EVENTS
      </h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 mb-16">
        {filteredData.map((card) => (
          <div
            key={card.id} // Use the unique id for keys
            className="card flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
          >
            <Link href="/">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gray-800 opacity-70" />
              <div className="p-6 relative flex flex-col justify-start content">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-extrabold leading-snug text-white">
                  {card.title}
                </h4>
                <p className="block antialiased font-sans text-base leading-relaxed text-white my-2 font-normal"
                style={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
                >
                  {card.description}
                </p>
              </div>
              <div className="border"></div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
