import React from "react";

function TopButtons({ onButtonClick }) {
  const topCitys = ["Pune", "Amravati", "Mumbai", "Delhi", "Nagpur", "Gao"];

  function handleClick(city) {
    onButtonClick(city);
  }

  return (
    <div className="flex items-center h-10 justify-around my-2">
      {topCitys.map((city, index) => (
        <button
          key={index}
          onClick={() => handleClick(city)}
          className="text-white text-lg hover:border-b delay-150 font-medium"
        >
          {city}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
