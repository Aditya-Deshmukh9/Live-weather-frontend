import React from "react";
import DateandTime from "./Dateandtime";

function TimeAndLoaction({ data }) {
  return (
    <div>
      <DateandTime data={data.dt} />

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {data.name}, {data.country}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLoaction;
