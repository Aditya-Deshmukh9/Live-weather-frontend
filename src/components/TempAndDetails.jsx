import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaLightbulb,
  FaSun,
  FaWind,
} from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa6";

function TempAndDetails({ data }) {
  const sunriseTime = new Date(data.sunrise * 1000);
  const sunsetTime = new Date(data.sunset * 1000);

  const formattedSunrise = `${sunriseTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${sunriseTime.getMinutes().toString().padStart(2, "0")}`;
  const formattedSunset = `${sunsetTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${sunsetTime.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{data.weather[0].description}</p>
      </div>

      <div className="flex items-center justify-between text-white py-3">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt=""
          className="w-20"
        />
        <p className="text-5xl">{data.temp}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHigh size={18} className="mr-1" />
            Temp:
            <span className="font-medium ml-1">{data.temp}°</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <WiHumidity size={22} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{data.humidity}%</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaWind size={18} className="mr-1" />
            Wind Speed:
            <span className="font-medium ml-1">{data.speed} km/h</span>
          </div>
        </div>
      </div>

      <div className="flex items-center my-4 space-x-2">
        <FaSun />
        <p className="font-light">
          Rise: <span className="font-medium">{formattedSunrise}</span>
        </p>
        <span>|</span>
        <FaLightbulb />
        <p className="font-light">
          Set: <span className="font-medium">{formattedSunset}</span>
        </p>
        <span>|</span>
        <FaArrowUp />
        <p className="font-light">
          High: <span className="font-medium">{data.temp_max}°</span>
        </p>
        <span>|</span>
        <FaArrowDown />
        <p className="font-light">
          Low: <span className="font-medium">{data.temp_min}°</span>
        </p>
      </div>
    </div>
  );
}

export default TempAndDetails;
