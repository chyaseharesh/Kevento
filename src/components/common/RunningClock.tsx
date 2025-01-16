import React, { useState, useEffect } from "react";
import "../../app/css/Clock.css";


const RunningClock = () => {
  const [time, setTime] = useState({
    day: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        day: now.toLocaleDateString("en-US", { weekday: "short" }),
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
        seconds: now.getSeconds().toString().padStart(2, "0"),
      });

      // Calculate event start date (e.g., event starts 5 days from now)
      const eventStart = new Date(now);
      eventStart.setDate(now.getDate() + 5); // Adding 5 days to the current date
    };

    // Initial clock update and set interval to update every second
    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Initialize immediately

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only once


  return (
    <div className="clock-containe flex flex-wrap gap-3">
      <div className="clock-col bg-secondary/60 flex-1">
        <p className="clock-day clock-timer text-white">{time.day}</p>
        <p className="clock-label text-white">Day</p>
      </div>
      <div className="clock-col bg-secondary/60 flex-1">
        <p className="clock-hours clock-timer text-white">{time.hours}</p>
        <p className="clock-label text-white">Hours</p>
      </div>
      <div className="clock-col bg-secondary/60 flex-1">
        <p className="clock-minutes clock-timer text-white">{time.minutes}</p>
        <p className="clock-label text-white">Minutes</p>
      </div>
      <div className="clock-col bg-secondary/60 flex-1">
        <p className="clock-seconds clock-timer text-white">{time.seconds}</p>
        <p className="clock-label text-white">Seconds</p>
      </div>

      
    </div>
  );
}

export default RunningClock;
