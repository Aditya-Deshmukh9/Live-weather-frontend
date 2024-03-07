import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLoaction from "./components/TimeAndLoaction";
import TempAndDetails from "./components/TempAndDetails";
import Forcast from "./components/Forcast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

function App() {
  const [weatherData, setWeatherdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Amravati");
  const [unitQuery, setUnitQuery] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/weather?unit=${unitQuery}&q=${searchQuery}`
        );
        const data = response.data;

        setWeatherdata(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [searchQuery, unitQuery]);

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleButtonClick = (city) => {
    setSearchQuery(city);
  };

  function handleLocation(city) {
    setSearchQuery(city);
  }

  function handleUnitChange(unit) {
    setUnitQuery(unit);
  }

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 sm:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 text-white h-fit shadow-xl shadow-gray-400">
      <TopButtons onButtonClick={handleButtonClick} />
      <Inputs
        onQueryChange={handleQueryChange}
        onLocationChange={handleLocation}
        onUnitChange={handleUnitChange}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: Unable to fetch weather data.</div>
      ) : (
        <>
          <TimeAndLoaction data={weatherData} />
          <TempAndDetails data={weatherData} />
          <Forcast
            title="Daily Report"
            data={weatherData}
            unitsQuery={unitQuery}
          />
        </>
      )}

      <Toaster />
    </div>
  );
}

export default App;
