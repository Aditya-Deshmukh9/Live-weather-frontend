import React, { useEffect, useState } from "react";

function Forcast({ data, title, unitsQuery }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/forecast?lat=${data.lat}&lon=${
            data.lon
          }&units=${unitsQuery}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        setForecastData(res);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setForecastData(null);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="my-8">
      <div className="flex items-center justify-start mt-4">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between text-white">
        {forecastData &&
          forecastData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-light text-sm">{item.dt_txt.split(" ")[0]}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=""
              />
              <p>{item.main.temp}°</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Forcast;
