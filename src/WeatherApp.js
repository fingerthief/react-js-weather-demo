import React, { useState } from 'react';
import './WeatherApp.css';

function ForecastCard({ day, condition, temperature }) {
  return (
    <div className='forecast-card'>
      <p>{day}</p>
      <p>{condition}</p>
      <p>{temperature}°C</p>
    </div>
  );
}

function WeatherApp() {
  const [location, setLocation] = useState('');

  return (
    <div className='app'>
      <header className='app-header'>MinimalWeather</header>
      <div className='location-input-container'>
        <input
          type='text'
          placeholder='Enter your location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='current-weather'>
        <h2>Current Weather</h2>
        <p>Temperature: 20°C</p>
        <p>Condition: Sunny</p>
      </div>
      <div className='forecast-container'>
        <ForecastCard day='Monday' condition='Rainy' temperature='18' />
        <ForecastCard day='Tuesday' condition='Cloudy' temperature='22' />
        <ForecastCard day='Wednesday' condition='Sunny' temperature='24' />
        <ForecastCard day='Thursday' condition='Partly Cloudy' temperature='21' />
        <ForecastCard day='Friday' condition='Showers' temperature='19' />
      </div>
    </div>
  );
}

export default WeatherApp;