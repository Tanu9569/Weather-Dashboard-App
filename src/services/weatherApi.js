import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
// console.log("APIKEY: ", API_KEY);

const fetchWeatherData = async(city) => {
    try{
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        console.log('Weather data:', response.data);
        return response.data;
    }catch(error){
        if(error.response?.status === 404){
            throw new Error('City not found');
        }
        console.log('Error fetching weather data:', error);
    }
};

const fetchWeatherForecast = async(lan, lon) => {
    try {
        const response = await axios.get(FORECAST_URL, {
            params: {
                lat: lan,
                lon: lon,
                appid: API_KEY,
                units: 'metric'
            }
        });
        console.log('Weather forecast data:', response.data);
        return response.data;
    }catch(error){
        if(error.response?.status === 404){
            throw new Error('ForeCast data not found');
        }
        console.log('Failed to fetch forecast data', error);
    }
};

export { 
    fetchWeatherData, 
    fetchWeatherForecast
};
