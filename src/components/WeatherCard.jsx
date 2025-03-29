// WeatherCard.jsx
import React, { useState } from "react";
import { fetchWeatherData, fetchWeatherForecast } from "../services/weatherApi";

export const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setWeatherData(null);
    setForecastData(null);

    try {
      // current weather data
      const currentData = await fetchWeatherData(city);
      setWeatherData(currentData);

      // forecast using coordinates from current data
      const forecast = await fetchWeatherForecast(
        currentData.coord.lat,
        currentData.coord.lon
      );
      setForecastData(forecast);

    } catch (err) {
      if (err.message === "City not found") {
        setError("City not found");
      } else {
        setError("Error fetching weather data");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center flex-col">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      <div className="flex justify-center flex-col">
        {weatherData && (
          <div>
            {/* Current Weather */}
            <p>City: {weatherData.name}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} meter/sec</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt="weather icon"
            />
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecastData && (
          <div>
            <h3>5-Day Forecast</h3>
            {forecastData.list.slice(0, 5).map((item, index) => (
              <div key={index}>
                <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {item.main.temp}°C</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="forecast icon"
                />
              </div>
            ))}
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};