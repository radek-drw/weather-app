import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const API_KEY = "0268633fae299db526aed6ff3c00d40d";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
