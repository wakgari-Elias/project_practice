// src/components/Weather.jsx

import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import ErrorMessage from './ErrorMessage';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const allIcons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '11d': rain_icon,
        '11n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    };

    const search = async (cityOrCoords) => {
        setLoading(true);
        setError(null);

        let url;

        if (typeof cityOrCoords === 'string') {
            if (cityOrCoords === "") {
                setError("Please enter a city name");
                setLoading(false);
                return;
            }
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrCoords}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        } else {
            const { lat, lon } = cityOrCoords;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "City not found");
                setWeatherData(null);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

        } catch (error) {
            setWeatherData(null);
            setError('Error fetching weather data');
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocationWeather = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lon } = position.coords;
                    search({ lat, lon });
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    setError("Unable to retrieve your location");
                    search('London');
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            search('London');
        }
    };

    useEffect(() => {
        fetchLocationWeather();
    }, []);

    return (
        <div className='flex flex-col items-center p-8 bg-gradient-to-r from-teal-500 via-purple-500 to-yellow-500
 rounded-lg shadow-lg transition-transform transform hover:scale-105 max-w-lg mx-auto mt-16'>
            <SearchBar onSearch={search} loading={loading} />
            {loading && <p className='text-gray-50 text-lg'>Loading...</p>}
            {error && <ErrorMessage message={error} />}
            {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};

export default Weather;
