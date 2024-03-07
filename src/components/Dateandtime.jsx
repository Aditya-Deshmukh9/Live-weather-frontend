import React, { useState, useEffect } from "react";

function DateandTime({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date(data * 1000));

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the current time every second
      setCurrentTime(new Date(currentTime.getTime() + 1000));
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTime]);

  // Format the date
  const dayOfWeekNumber = currentTime.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[dayOfWeekNumber];
  const date = currentTime.toLocaleDateString();

  // Format the time (only hours and minutes)
  const time = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-normal">
        {dayOfWeek}, {date} | Local Time: {time}
      </p>
    </div>
  );
}

export default DateandTime;
