import React, { useState } from "react";
import { fetchWeatherData } from "../services/weatherApi";

export const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setWeatherData(null);

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      console.log(err.message);
      // setError('City not found');
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
        {weatherData ? (
          <div>
            <p>City:{weatherData.name}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} meter/sec</p>
            {/* <span>Weather Icon: {weatherData.weather[0].icon}</span> */}
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt="weather icon"
            />
          </div>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};
