import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "0268633fae299db526aed6ff3c00d40d";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedByCoordinates, setFetchedByCoordinates] = useState(false);
  const [tempUnit, setTempUnit] = useState("metric");

  const fetchWeatherData = async (locationQuery) => {
    setLoading(true);
    setError(null);
    setFetchedByCoordinates(false);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationQuery)}&limit=1&appid=${API_KEY}`
      );
  
      if (response.data.length === 0) {
        setError("City not found. Please check the spelling or try another city.");
        setLoading(false);
        return;
      }
  
      const { lat, lon } = response.data[0];
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${tempUnit}`
      );
  
      setWeatherData(weatherResponse.data);
      fetchForecastData(weatherResponse.data.name);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found. Please check the spelling or try another city.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${tempUnit}`
      );
      setForecastData(response.data.list);
    } catch (error) {
      setError("Error fetching forecast data.");
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setFetchedByCoordinates(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${tempUnit}`
      );
      setWeatherData(response.data);
      fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      setError("Error fetching weather data by coordinates.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${tempUnit}`
      );
      setForecastData(response.data.list);
    } catch (error) {
      setError("Error fetching forecast data by coordinates.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTempUnit = () => {

    const newTempUnit = tempUnit === 'metric' ? 'imperial' : 'metric';

    const convertTemperature = (temp) => {
      return newTempUnit === 'metric'
        ? ((temp - 32) * 5) / 9 // Fahrenheit to Celsius
        : (temp * 9) / 5 + 32; // Celsius to Fahrenheit
    };

    setWeatherData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        temp: convertTemperature(prevState.main.temp),
        feels_like: convertTemperature(prevState.main.feels_like),
      },
    }));

    setForecastData((prevState) =>
      prevState.map((item) => ({
        ...item,
        main: {
          ...item.main,
          temp_min: convertTemperature(item.main.temp_min),
          temp_max: convertTemperature(item.main.temp_max),
          temp: convertTemperature(item.main.temp),
        },
      }))
    );

    setTempUnit(newTempUnit);
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        setError,
        fetchedByCoordinates,
        fetchWeatherData,
        fetchWeatherByCoordinates,
        tempUnit,
        toggleTempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
