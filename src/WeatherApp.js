import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

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
        setCurrentLocationName(`${data.location.name}, ${data.location.region}`);
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
    }, []); // Fetch weather data on component mount

    return (
        <div className="app">
            <header className="app-header">MinimalWeather {currentLocationName}</header>
            <div className="location-input-container">
                <input type="text" placeholder="Enter your location" value={location} onChange={e => setLocation(e.target.value)} onKeyPress={handleKeyPress} />
            </div>
            {loading ? <p>Loading...</p> : (
                <>
                    <div className="current-weather">
                        <h2>Current Weather</h2>
                        <p>Temperature: {temperature}-°F</p>
                        <p>Condition: {condition}</p>
                        <img src={currentConditionIcon} alt="Current Weather"></img>
                    </div>
                    <div className="forecast-container">
                        {forecastData.length !== 0 ? createForecastCards(forecastData) : "No forecast data available"}
                    </div>
                </>
            )}
        </div>
    );
}

function ForecastCard({ date, day }) {
    return (
        <div className="forecast-card">
            <p>{date}</p>
            <p>{day.condition.text}</p>
            <p>Max: {day.maxtemp_f}°F</p>
            <p>Min: {day.mintemp_f}°F</p>
            <img src={day.condition.icon} alt="Forecast"></img>
        </div>
    );
}

function createForecastCards(forecast) {
    return forecast.map((day, index) => (
        <ForecastCard key={index} date={day.date} day={day.day} />
    ));
}

export default WeatherApp;