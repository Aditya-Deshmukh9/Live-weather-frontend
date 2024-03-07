import React from "react";

function Loader() {
  return (
    <div className="relative flex mt-2 justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500 shadow-md shadow-purple-300"></div>
      <img
        src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-2.png"
        className="rounded-full h-28 w-28"
      />
    </div>
  );
}

export default Loader;
