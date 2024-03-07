import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function Inputs({ onQueryChange, onLocationChange, onUnitChange }) {
  const [query, setQuery] = useState("");
  const [locationQuery, setlocationQuery] = useState("");
  const [unitQuery, setUnitQuery] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onQueryChange(query);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const city = response.data.locality;

          setlocationQuery(city);
        },
        (error) => {
          setlocationQuery("error");
          throw error.message;
        }
      );
    } else {
      setlocationQuery("error");
      console.error("Geolocation is not supported by this browser.");
    }
  }, [locationQuery]);

  function handelLocationclick() {
    if (locationQuery === "error") {
      toast.error("Your Geolocation is Disabled");
    } else {
      toast.error("Weather of your location");
      onLocationChange(locationQuery);
    }
  }
  const handleUnitChange = (unit) => {
    setUnitQuery(unit);
    onUnitChange(unit);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row w-3/4 items-center justify-center space-x-4"
      >
        <input
          type="text"
          value={query}
          placeholder="search city name..."
          onChange={handleChange}
          className="text-xl rounded-md font-semibold p-2 w-full shadow-lg outline-none capitalize  placeholder:px-2 placeholder:lowercase text-black"
        />
        <IoSearchSharp
          size={25}
          className="text-white hover:text-blue-500 cursor-pointer transition ease-out scale-125"
        />
        <IoLocationOutline
          onClick={handelLocationclick}
          size={25}
          className="text-white hover:text-blue-500 cursor-pointer transition ease-out scale-125"
        />
      </form>
      <div className="flex w-1/4 items-center justify-center">
        <button
          name="metric"
          className={`text-xl text-white hover:text-blue-500 font-light ${
            unitQuery === "" ? "bg-blue-500 text-black" : ""
          }`}
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className={`text-xl text-white hover:text-blue-500 font-light ${
            unitQuery === "imperial" ? "bg-blue-500 text-black" : ""
          }`}
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
