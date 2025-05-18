import React, { useState, useEffect } from 'react';
import { fetchWeather, WeatherResponse } from '../utils/weatherApi';
import { useTrip } from '../contexts/TripContext';
import { Cloud, Droplets, Wind } from 'lucide-react';

const Weather: React.FC = () => {
  const { trip } = useTrip();
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      if (!trip?.destination) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeather(trip.destination);
        setWeather(data);
      } catch (err) {
        console.error('Failed to fetch weather', err);
        setError('Unable to load weather data');
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [trip?.destination]);

  if (!trip) {
    return null;
  }

  if (loading) {
    return (
      <div className="border rounded-xl p-4 shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Weather</h2>
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 dark:bg-opacity-20">
          <p className="text-sm text-red-600 dark:text-red-300">
            {error || 'Weather data unavailable for this location'}
          </p>
        </div>
      </div>
    );
  }

  // Get correct weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="border rounded-xl p-4 shadow-sm animate-fadeIn">
      <h2 className="text-lg font-semibold mb-2">Weather in {weather.name}</h2>
      
      <div className="rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={iconUrl} 
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <div>
            <div className="text-3xl font-semibold">{Math.round(weather.main.temp)}°C</div>
            <div className="text-sm capitalize">{weather.weather[0].description}</div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <Droplets size={16} className="mr-2 opacity-60" />
            <span>{weather.main.humidity}% humidity</span>
          </div>
          <div className="flex items-center">
            <Wind size={16} className="mr-2 opacity-60" />
            <span>{Math.round(weather.wind.speed)} m/s wind</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-center opacity-50">
        <p>* Weather data is simulated for demonstration purposes</p>
      </div>
    </div>
  );
};

export default Weather;