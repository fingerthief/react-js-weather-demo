import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherApp from '../pages/weather-app';
import { fetchWeatherData } from '../functions/current-weather-utils';

jest.mock('../functions/current-weather-utils', () => ({
  fetchWeatherData: jest.fn(() => Promise.resolve({
    temperature: '75',
    condition: 'Partly Cloudy',
    currentConditionIcon: 'http://example.com/cloudy-icon.png'
  })),
  createCurrentWeather: jest.fn((temperature, condition, currentConditionIcon) => {
    return (
      <div>
          <h2>Current Weather</h2>
          <p>Temperature: {temperature}-°F</p>
          <p>Condition: {condition}</p>
          <img src={currentConditionIcon} alt="Current Weather"></img>
      </div>
    );
  })
}));

describe('WeatherApp Component', () => {
  beforeEach(() => {
    fetchWeatherData.mockClear();
  });

  test('renders correctly initially', () => {
    render(<WeatherApp />);
    expect(screen.getByPlaceholderText('Enter your location')).toBeInTheDocument();
    expect(screen.getByText('MinimalWeather')).toBeInTheDocument();
  });

  test('allows entry of a location', () => {
    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your location'), { target: { value: 'New York' } });
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
  });

  test('Does not show loading message on intial page load', async () => {
    fetchWeatherData.mockResolvedValueOnce({}); // Simulate an empty response for simplicity
    render(<WeatherApp />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter your location'), { target: { value: 'New York' } });
    fireEvent.keyPress(screen.getByPlaceholderText('Enter your location'), { key: 'Enter', code: 'Enter' });
  });
});
