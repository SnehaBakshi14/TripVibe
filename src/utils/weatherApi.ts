export interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

export const fetchWeather = async (city: string) => {
  try {
    // Using a proxy/mock for demo purposes - ideally would use a real API key and proper API call
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=SAMPLE_KEY`
    );
    
    if (!response.ok) {
      // For demo purposes, return mock data if the API call fails
      return getMockWeatherData(city);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    return getMockWeatherData(city);
  }
};

// Mock data for demonstration purposes
const getMockWeatherData = (city: string): WeatherResponse => {
  const mockData: Record<string, WeatherResponse> = {
    default: {
      main: {
        temp: 24,
        humidity: 65,
      },
      weather: [
        {
          description: 'sunny with some clouds',
          icon: '02d',
        }
      ],
      wind: {
        speed: 5.2,
      },
      name: city || 'Unknown',
      sys: {
        country: 'World',
      },
    },
    'london': {
      main: {
        temp: 15,
        humidity: 80,
      },
      weather: [
        {
          description: 'light rain',
          icon: '10d',
        }
      ],
      wind: {
        speed: 4.1,
      },
      name: 'London',
      sys: {
        country: 'GB',
      },
    },
    'paris': {
      main: {
        temp: 18,
        humidity: 70,
      },
      weather: [
        {
          description: 'partly cloudy',
          icon: '03d',
        }
      ],
      wind: {
        speed: 3.7,
      },
      name: 'Paris',
      sys: {
        country: 'FR',
      },
    },
    'new york': {
      main: {
        temp: 22,
        humidity: 55,
      },
      weather: [
        {
          description: 'clear sky',
          icon: '01d',
        }
      ],
      wind: {
        speed: 6.2,
      },
      name: 'New York',
      sys: {
        country: 'US',
      },
    },
    'tokyo': {
      main: {
        temp: 26,
        humidity: 75,
      },
      weather: [
        {
          description: 'light rain',
          icon: '09d',
        }
      ],
      wind: {
        speed: 3.5,
      },
      name: 'Tokyo',
      sys: {
        country: 'JP',
      },
    }
  };
  
  const lowercaseCity = city.toLowerCase();
  return mockData[lowercaseCity] || mockData.default;
};