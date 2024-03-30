import React from "react";
import CurrentWeather from "../components/current-weather";

function createCurrentWeather(temp, condition, conditionicon) {
    return <CurrentWeather temperature={temp} condition={condition} currentConditionIcon={conditionicon} />;
}

export { createCurrentWeather };
