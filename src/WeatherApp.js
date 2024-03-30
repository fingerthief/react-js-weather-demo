import React, { useState } from "react";
import "./WeatherApp.css";

function ForecastCard({ date, day }) {
      return (
            <div className="forecast-card">
                  <p>{date}</p>
                  <p>{day.condition.text}</p>
                  <p>Max: {day.maxtemp_f}°F</p>
                  <p>Min: {day.mintemp_f}°F</p>
            </div>
      );
}

function createForecastCards(forecast) {
      return forecast.map((day, index) => (
            <ForecastCard key={index} date={day.date} day={day.day} />
      ));
}

function WeatherApp() {
      const weatherApiKey = "API_KEY_HERE";

      const [location, setLocation] = useState("");
      const [temperature, setTemperature] = useState("");
      const [condition, setCondition] = useState("");
      const [forecastData, setForecastData] = useState([]);
      const [currentLocationName, setCurrentLocationName] = useState("");

      const fetchWeather = async () => {
            if (!location) { 
                  return;
            }

            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5`);

            const data = await response.json();
            console.log(data);

            setTemperature(data.current.temp_f);
            setCondition(data.current.condition.text);
            setCurrentLocationName(`${data.location.name}, ${data.location.region}`);
            setForecastData(data.forecast.forecastday);
      };

      const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                  fetchWeather();
            }
      };

      return (
            <div className="app">
                  <header className="app-header">MinimalWeather {currentLocationName}</header>
                  <div className="location-input-container">
                        <input
                              type="text"
                              placeholder="Enter your location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              onKeyPress={handleKeyPress}
                        />
                  </div>
                  <div className="current-weather">
                        <h2>Current Weather</h2>
                        <p>Temperature: {temperature}-°F</p>
                        <p>Condition: {condition}</p>
                  </div>
                  <div className="forecast-container">
                        {forecastData.length !== 0 ? createForecastCards(forecastData) : "loading"}
                  </div>
            </div>
      );
}
export default WeatherApp;
