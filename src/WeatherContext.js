import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const API_KEY = "0268633fae299db526aed6ff3c00d40d";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [tempUnit, setTempUnit] = useState("metric");

  const { t, i18n } = useTranslation();

  const fetchWeatherData = async (city, additionalDetails = {}, coordinates = null) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(false);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${tempUnit}&lang=${i18n.language}`
      );

      setWeatherData({
        ...response.data,
        additionalDetails,
        coordinates: coordinates || response.data.coord
      });
      fetchForecastData(city);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(t('errors.cityNotFound'));
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
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${tempUnit}&lang=${i18n.language}`
      );
      setForecastData(response.data.list);
    } catch (error) {
      setError(t('errors.fetchForecast'));
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${tempUnit}&lang=${i18n.language}`
      );
      setWeatherData(response.data);
      fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      setError(t('errors.fetchWeatherByCoordinates'));
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${tempUnit}&lang=${i18n.language}`
      );
      setForecastData(response.data.list);
    } catch (error) {
      setError(t('errors.fetchForecastByCoordinates'));
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
          setError(t('errors.geolocationFailure'));
        }
      );
    } else {
      setError(t('errors.geolocationUnavailable'));
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
        isCurrentLocation,
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