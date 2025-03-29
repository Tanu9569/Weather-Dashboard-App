import React, { useState, useEffect } from "react";
import { fetchWeatherData, fetchWeatherForecast } from "../services/weatherApi";
import { Search, MapPin, Clock } from 'lucide-react';
import { Button } from "./Button";

export const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [searchHistory, setSearchHistory] = useState([]);
  
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToSearchHistory = (cityName) => {
    if (!cityName || searchHistory.includes(cityName)) return;

    const updatedHistory = [cityName, ...searchHistory.filter(item => item !== cityName)].slice(0, 5);
    setSearchHistory(updatedHistory);
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setError(null);
    setLoading(true);
    setWeatherData(null);
    setForecastData(null);
    
    try {
      // current weather data
      const currentData = await fetchWeatherData(city);
      setWeatherData(currentData);
      
      // Add to search history
      addToSearchHistory(currentData.name);
      
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
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (cityName) => {
    setCity(cityName);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeekday = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const getFormattedDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };


  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const convertTemp = (celsius) => {
    if (unit === "C") return Math.round(celsius);
    return Math.round((celsius * 9/5) + 32);
  };

  const getUniqueForecasts = () => {
    if (!forecastData) return [];
    
    const dailyForecasts = [];
    const days = {};
    
    forecastData.list.forEach(item => {
      const day = new Date(item.dt * 1000).toDateString();
      if (!days[day] && dailyForecasts.length < 5) {
        days[day] = true;
        dailyForecasts.push(item);
      }
    });
    
    return dailyForecasts;
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto mb-8 bg-[#1E1E1F] rounded-xl p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-3 px-4 bg-[#282829] text-[#FAFAFA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDB70]"
            />
            <Button className="h-[48px]" onClick={handleSearch}>
              <Search />
            </Button>
          </div>
          
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-2 text-[#FAFAFA] opacity-70">
                <Clock size={16} />
                <span>Recent searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((historyItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(historyItem)}
                    className="px-3 py-1 bg-[#282829] hover:bg-[#373738] text-[#FAFAFA] rounded-full text-sm transition-colors"
                  >
                    {historyItem}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FFDB70]"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-6">
            <p className="text-red-400 font-medium text-lg">{error}</p>
            <p className="text-[#FAFAFA] opacity-70 mt-2">Please check the city name and try again.</p>
          </div>
        )}
        
        {weatherData && (
          <div className="space-y-8 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#FFDB70]" />
                  <h2 className="text-3xl font-bold text-[#FAFAFA]">{weatherData.name}</h2>
                </div>
                <p className="text-[#FAFAFA] opacity-70 mt-1">
                  {getFormattedDate(weatherData.dt)}
                </p>
              </div>
              
              <button 
                onClick={toggleUnit}
                className="bg-[#373738] text-[#FFDB70] h-10 w-10 rounded-full flex items-center justify-center font-medium hover:bg-[#444] transition-colors"
              >
                °{unit}
              </button>
            </div>
            
            {/* Current Weather */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={getWeatherIcon(weatherData.weather[0].icon)}
                    alt="weather icon"
                    className="w-24 h-24"
                  />
                </div>
                <div>
                  <h1 className="text-6xl font-bold text-[#FAFAFA]">
                    {convertTemp(weatherData.main.temp)}°{unit}
                  </h1>
                  <p className="text-xl text-[#FAFAFA] capitalize">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#222224] p-4 rounded-lg">
                  <p className="text-[#FAFAFA] opacity-70 text-2xl text-center mb-1">Humidity</p>
                  <p className="text-xl font-semibold text-[#FAFAFA] text-center">{weatherData.main.humidity}%</p>
                </div>
                <div className="bg-[#222224] p-4 rounded-lg">
                  <p className="text-[#FAFAFA] opacity-70 text-2xl text-center mb-1">Wind</p>
                  <p className="text-xl font-semibold text-[#FAFAFA] text-center">{weatherData.wind.speed} m/s</p>
                </div>
              </div>
            </div>
            
            {/* 5-Day Forecast */}
            {forecastData && (
              <div>
                <h3 className="text-xl font-semibold text-[#FAFAFA] mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {getUniqueForecasts().map((item, index) => (
                    <div 
                      key={index}
                      className="bg-[#222224] p-4 rounded-lg flex flex-col items-center"
                    >
                      <p className="text-[#FAFAFA] font-medium">{getWeekday(item.dt)}</p>
                      <img
                        src={getWeatherIcon(item.weather[0].icon)}
                        alt="forecast icon"
                        className="w-16 h-16 my-2"
                      />
                      <p className="text-lg font-semibold text-[#FAFAFA]">
                        {convertTemp(item.main.temp)}°{unit}
                      </p>
                      <p className="text-xs text-[#FAFAFA] opacity-70 text-center capitalize">
                        {item.weather[0].description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};