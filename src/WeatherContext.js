import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

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

  const fetchFromApi = async (endpoint, params) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/${endpoint}`,
        { params: { ...params, appid: apiKey, units: tempUnit, lang: i18n.language } }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(t('errors.cityNotFound'));
      } else {
        throw new Error(error.message);
      }
    }
  };

  const fetchWeatherData = async (city, additionalDetails = {}, coordinates = null) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(false);
    try {
      const data = await fetchFromApi('weather', { q: city });
      setWeatherData({
        ...data,
        additionalDetails,
        coordinates: coordinates || data.coord
      });
      fetchForecastData(city);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const data = await fetchFromApi('forecast', { q: city });
      setForecastData(data.list);
    } catch (error) {
      setError(t('errors.fetchForecast'));
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(true);
    try {
      const data = await fetchFromApi('weather', { lat: latitude, lon: longitude });
      setWeatherData(data);
      fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      setError(t('errors.fetchWeatherByCoordinates'));
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCoordinates = async (latitude, longitude) => {
    try {
      const data = await fetchFromApi('forecast', { lat: latitude, lon: longitude });
      setForecastData(data.list);
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
