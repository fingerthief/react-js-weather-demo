import React from "react";
import CurrentWeather from "../components/current-weather";

function createCurrentWeather(temp, condition, conditionicon) {
    return <CurrentWeather temperature={temp} condition={condition} currentConditionIcon={conditionicon} />;
}

async function fetchWeatherData(location) {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5`);

        if (!response.ok) throw new Error("Failed to fetch data"); // Throw error in case of failure 

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

export { createCurrentWeather, fetchWeatherData };
