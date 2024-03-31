import React, { useState, useEffect, useCallback } from "react";
import "./styles/weather-app.css";
import { createForecastCards } from "./functions/forecast-utils";
import { createCurrentWeather, fetchWeatherData } from "./functions/current-weather-utils";

function WeatherApp() {
    const [location, setLocation] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchWeather = useCallback(async () => {
        if (!location) return;

        setLoading(true);

        const fetchedData = await fetchWeatherData(location);

        setData(fetchedData || {});

        setLoading(false);
    }, [location]);

    const handleKeyPress = (e) => e.key === "Enter" && fetchWeather();

    const isLoading = loading;

    return (
        <div className="app">
            <header className="app-header">{(data.location?.name || data.location?.region) ?
                `MinimalWeather @ ${data.location?.name ?? ""}, ${data.location?.region ?? ""}` : "MinimalWeather"}
            </header>

            <div className="location-input-container">
                <input type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} onKeyPress={handleKeyPress} />
            </div>

            {isLoading ? <p>Loading...</p> : (
                <>
                    <div className="current-weather">
                        {createCurrentWeather(data?.current?.temp_f, data?.current?.condition?.text, data?.current?.condition?.icon)}
                    </div>

                    <div className="forecast-container">
                        {createForecastCards(data?.forecast?.forecastday ?? [])}
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;
