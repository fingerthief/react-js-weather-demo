import React from "react";

function CurrentWeather({ temperature, condition, currentConditionIcon }) {
    return (
        <div>
            <h2>Current Weather</h2>
            <p>Temperature: {temperature}-°F</p>
            <p>Condition: {condition}</p>
            <img src={currentConditionIcon} alt="Current Weather"></img>
        </div>
    );
}

export default CurrentWeather;