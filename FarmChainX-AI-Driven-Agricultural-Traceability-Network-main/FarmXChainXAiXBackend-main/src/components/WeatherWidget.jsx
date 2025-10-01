import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Indian states with their approximate coordinates for weather API
const indianStates = [
  { name: 'Andhra Pradesh', lat: 15.9129, lon: 79.7400 },
  { name: 'Arunachal Pradesh', lat: 28.2180, lon: 94.7278 },
  { name: 'Assam', lat: 26.2006, lon: 92.9376 },
  { name: 'Bihar', lat: 25.0961, lon: 85.3131 },
  { name: 'Chhattisgarh', lat: 21.2787, lon: 81.8661 },
  { name: 'Goa', lat: 15.2993, lon: 74.1240 },
  { name: 'Gujarat', lat: 22.2587, lon: 71.1924 },
  { name: 'Haryana', lat: 29.0588, lon: 76.0856 },
  { name: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734 },
  { name: 'Jharkhand', lat: 23.6102, lon: 85.2799 },
  { name: 'Karnataka', lat: 15.3173, lon: 75.7139 },
  { name: 'Kerala', lat: 10.8505, lon: 76.2711 },
  { name: 'Madhya Pradesh', lat: 22.9734, lon: 78.6569 },
  { name: 'Maharashtra', lat: 19.7515, lon: 75.7139 },
  { name: 'Manipur', lat: 24.6637, lon: 93.9063 },
  { name: 'Meghalaya', lat: 25.4670, lon: 91.3662 },
  { name: 'Mizoram', lat: 23.1645, lon: 92.9376 },
  { name: 'Nagaland', lat: 26.1584, lon: 94.5624 },
  { name: 'Odisha', lat: 20.9517, lon: 85.0985 },
  { name: 'Punjab', lat: 31.1471, lon: 75.3412 },
  { name: 'Rajasthan', lat: 27.0238, lon: 74.2179 },
  { name: 'Sikkim', lat: 27.5330, lon: 88.5122 },
  { name: 'Tamil Nadu', lat: 11.1271, lon: 78.6569 },
  { name: 'Telangana', lat: 18.1124, lon: 79.0193 },
  { name: 'Tripura', lat: 23.9408, lon: 91.9882 },
  { name: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Uttarakhand', lat: 30.0668, lon: 79.0193 },
  { name: 'West Bengal', lat: 22.9868, lon: 87.8550 }
]

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Function to get weather icon based on weather condition
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) return '☀️'
    if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) return '☁️'
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return '🌧️'
    if (conditionLower.includes('snow')) return '❄️'
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) return '⛈️'
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️'
    return '🌤️'
  }

  // Function to fetch weather data for a single state
  const fetchWeatherForState = async (state) => {
    try {
      // Using OpenWeatherMap API (you'll need to add your API key)
      // For demo purposes, I'll use mock data
      const mockWeather = {
        temp: Math.floor(Math.random() * 35) + 15, // Random temp between 15-50°C
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Overcast'][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
      }
      
      return {
        name: state.name,
        temperature: mockWeather.temp,
        condition: mockWeather.condition,
        humidity: mockWeather.humidity,
        windSpeed: mockWeather.windSpeed,
        icon: getWeatherIcon(mockWeather.condition)
      }
    } catch (error) {
      console.error(`Error fetching weather for ${state.name}:`, error)
      return {
        name: state.name,
        temperature: 'N/A',
        condition: 'Unknown',
        humidity: 'N/A',
        windSpeed: 'N/A',
        icon: '❓'
      }
    }
  }

  // Function to fetch weather for all states
  const fetchAllWeather = async () => {
    setLoading(true)
    try {
      const weatherPromises = indianStates.map(state => fetchWeatherForState(state))
      const results = await Promise.all(weatherPromises)
      
      const weatherMap = {}
      results.forEach(result => {
        weatherMap[result.name] = result
      })
      
      setWeatherData(weatherMap)
      setLastUpdated(new Date())
      setError(null)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchAllWeather()
    
    // Update every 5 minutes
    const interval = setInterval(fetchAllWeather, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Function to refresh weather data manually
  const handleRefresh = () => {
    fetchAllWeather()
  }

  if (loading && Object.keys(weatherData).length === 0) {
    return (
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 border border-blue-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">🌤️ Live Weather</h3>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300/80">Loading weather data...</p>
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 border border-blue-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">🌤️ Live Weather</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
          title="Refresh weather data"
        >
          🔄
        </motion.button>
      </div>
      
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mb-3">{error}</p>
      )}
      
      {lastUpdated && (
        <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
      
      <div className="max-h-48 overflow-y-auto">
        <div className="space-y-2">
          {indianStates.map((state) => {
            const weather = weatherData[state.name]
            if (!weather) return null
            
            return (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors cursor-pointer group"
                title={`${weather.condition} • Humidity: ${weather.humidity}% • Wind: ${weather.windSpeed} km/h`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{weather.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-20">
                    {state.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {weather.temperature}°C
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-gray-600">
        <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
          Auto-updates every 5 minutes
        </p>
      </div>
    </div>
  )
}

export default WeatherWidget


