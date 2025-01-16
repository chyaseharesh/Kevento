// 'use client';
// import React, { useEffect, useState } from 'react';
// import Loading from '../ui/loding';
// import "../../app/css/upcommingCard.css";


// type Event = {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   date: string;
//   location: string;
//   category: { name: string };
//   title: string;
//   imageUrl: string;
//   venue: string;
//   totalTicket: number;
// };

// function UpcommingEvent() {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [events, setEvents] = useState<Event[] | null>(null);
//   const [filter, setFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState<string>('');
//   const [priceFilter, setPriceFilter] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
//   const [filteredData, setFilteredData] = useState<Event[]>([]);

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('/api/events');
//         const data = await response.json();
//         setEvents(data);
//         setFilteredData(data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//         setEvents([]); // Fallback to empty array on error
//       }
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (events && Array.isArray(events)) {
//       const filtered = events.filter((event) => {
//         const matchesSearch =
//           (event.name?.toLowerCase().includes(filter.toLowerCase()) || false) ||
//           (event.description?.toLowerCase().includes(filter.toLowerCase()) || false);

//         const matchesCategory =
//           !categoryFilter || event.category?.name === categoryFilter;

//         const matchesPrice =
//           (priceFilter.min ? event.totalTicket >= priceFilter.min : true) &&
//           (priceFilter.max ? event.totalTicket <= priceFilter.max : true);

//         const matchesStatus = event.status === 'UPCOMING';

//         return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
//       });

//       const sortedAndLimited = filtered
//         .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//         .slice(0, 5);

//       setFilteredData(sortedAndLimited);
//     }
//   }, [filter, categoryFilter, priceFilter, events]);

//   const handleClearFilters = () => {
//     setFilter('');
//     setCategoryFilter('');
//     setPriceFilter({ min: null, max: null });
//   };

//   if (events === null) {
//     return <Loading />;
//   }

//   return (
//     <main className="bg-primary/75 pt-12">
//       <div className="flex mb-4 px-4 lg:px-0 items-center justify-evenly">
//         <h2 className="font-extrabold text-4xl text-white">Upcoming Events</h2>
//       </div>

//       <section className="overflow-hidden">
//         <div className="max-w-screen-xl px-8 mx-auto py-12 lg:py-24 space-y-24 flex flex-col justify-center">
//           <div className="flex flex-col sm:flex-row mx-auto z-40 gap-4">
//             {filteredData.map((card, index) => (
//               <div key={card.id} className="relative group">
//                 <a href={`/events/${card.id}`}>
//                   <img
//                     src={card.imageUrl}
//                     className="hover:w-96 hover:translate-x-1 rounded-xl rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-64 w-56 object-cover hover:scale-150 transform origin-bottom"
//                     alt={card.title}
//                   />
//                 </a>
//               </div>
              
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default UpcommingEvent;
