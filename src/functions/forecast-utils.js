import React from "react";
import ForecastCard from "../components/forecast-card";

function createForecastCards(forecast) {
    return forecast.map((day, index) => (
        <ForecastCard key={index} date={day.date} day={day.day} />
    ));
}

export { createForecastCards };
