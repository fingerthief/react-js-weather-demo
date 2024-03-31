import React from "react";

function ForecastCard({ date, day }) {
    return (
        <div className="forecast-card">
            <p>{date}</p>
            <p>{day.condition.text}</p>
            <p>Max: {day.maxtemp_f}°F</p>
            <p>Min: {day.mintemp_f}°F</p>
            <div class="forecast-icon">
                <img src={day.condition.icon} alt="Forecast"></img>
            </div>
        </div>
    );
}

export default ForecastCard;
