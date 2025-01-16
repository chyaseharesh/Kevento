import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

type EventData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  venue: string;
  date: string;
  status: string;
  totalTicket: number;
  location: string;
  category: { name: string };
};

type CardProps = {
  events: EventData[];
};

const Cards: React.FC<CardProps> = ({ events }) => {
  const [formattedEvents, setFormattedEvents] = useState<EventData[]>(events);

  useEffect(() => {
    const updatedEvents = events.map((event) => ({
      ...event,
      formattedDate: new Date(event.date).toLocaleString(),
    }));
    setFormattedEvents(updatedEvents);
  }, [events]);

 

  return (
    <div className="container px-4 py-12 mx-auto">
      {formattedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {formattedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Event Image */}
              <img
                src={event.imageUrl || "/placeholder-image.png"}
                alt={event.title || "Event image"}
                className="object-cover w-full h-48"
              />

              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                    {new Date(event.date).toDateString()}
                  </span>

                  <span className="text-primary-active">Rs: 456</span>
                
                </div>

                

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h2>
                <p
                  className="text-sm text-gray-600 mb-4"
                  style={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                >
                  {event.description}
                </p>
                <p className="text-sm font-semibold text-primary-active mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-primary dark:text-primary mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {event.venue}
                </p>

                {/* Book Now Button */}
              <Link href={`/events/${event.id}`}
                type="submit"
                >
                <Button 
              className=" w-full hover:text-purple-700 mt-4 text-white hover:bg-white hover:border-purple-600 border border-purple-600 "
              >
                  BOOK NOW
                  </Button>
              </Link>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-lg font-semibold text-center">
          No events available
        </div>
      )}
    </div>
  );
};

export default Cards;
