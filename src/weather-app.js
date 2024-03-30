import React, { useState, useEffect } from "react";
import "./weather-app.css";
import { createForecastCards } from "./functions/forecast-utils";
import { createCurrentWeather } from "./functions/current-weather-utils";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const fetchWeatherData = async (location) => {
    try {
        if (!location) {
            return null;
        }

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

function WeatherApp() {
    const [location, setLocation] = useState("");
    const [temperature, setTemperature] = useState("");
    const [condition, setCondition] = useState("");
    const [currentConditionIcon, setCurrentConditionIcon] = useState("");
    const [forecastData, setForecastData] = useState([]);
    const [currentLocationName, setCurrentLocationName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setLoading(true);

        const data = await fetchWeatherData(location);

        if (!data) {
            setLoading(false);
            return;
        }

        setTemperature(data.current.temp_f);
        setCondition(data.current.condition.text);
        setCurrentConditionIcon(data.current.condition.icon);
        setCurrentLocationName(` @ ${data.location.name}, ${data.location.region}`);
        setForecastData(data.forecast.forecastday);
        
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeather();
        }
    };

    useEffect(() => {
        fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app">
            <header className="app-header">MinimalWeather {currentLocationName}</header>
            <div className="location-input-container">
                <input type="text" placeholder="Enter your location" value={location} onChange={e => setLocation(e.target.value)} onKeyPress={handleKeyPress} />
            </div>
            {loading ? <p>Loading...</p> : (
                <>
                    <div className="current-weather">
                        {createCurrentWeather(temperature, condition, currentConditionIcon)}
                    </div>
                    <div className="forecast-container">
                        {createForecastCards(forecastData)}
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;