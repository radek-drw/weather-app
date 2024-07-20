import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [state, setState] = useState({
    weatherData: null,
    forecastData: [],
    loading: false,
    error: null,
    isCurrentLocation: false,
    tempUnit: "metric"
  });

  const { t, i18n } = useTranslation();

  const setStateField = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const fetchData = async (endpoint, params) => {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await axios.get(url, { params: { ...params, appid: API_KEY, units: state.tempUnit, lang: i18n.language } });
    return response.data;
  };

  const fetchWeatherData = async (city, additionalDetails = {}, coordinates = null) => {
    setStateField('loading', true);
    setStateField('error', null);
    setStateField('isCurrentLocation', false);

    try {
      const weatherData = await fetchData('weather', { q: city });
      setStateField('weatherData', {
        ...weatherData,
        additionalDetails,
        coordinates: coordinates || weatherData.coord
      });
      await fetchForecastData(city);
    } catch (error) {
      handleError(error, 'cityNotFound');
    } finally {
      setStateField('loading', false);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const forecastData = await fetchData('forecast', { q: city });
      setStateField('forecastData', forecastData.list);
    } catch (error) {
      handleError(error, 'fetchForecast');
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    setStateField('loading', true);
    setStateField('error', null);
    setStateField('isCurrentLocation', true);

    try {
      const weatherData = await fetchData('weather', { lat: latitude, lon: longitude });
      setStateField('weatherData', weatherData);
      await fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      handleError(error, 'fetchWeatherByCoordinates');
    } finally {
      setStateField('loading', false);
    }
  };

  const fetchForecastByCoordinates = async (latitude, longitude) => {
    try {
      const forecastData = await fetchData('forecast', { lat: latitude, lon: longitude });
      setStateField('forecastData', forecastData.list);
    } catch (error) {
      handleError(error, 'fetchForecastByCoordinates');
    }
  };

  const handleError = (error, errorKey) => {
    const errorMessage = error.response?.status === 404 ? t(`errors.${errorKey}`) : error.message;
    setStateField('error', errorMessage);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          fetchWeatherByCoordinates(latitude, longitude);
          setStateField('error', '');
        },
        (err) => {
          console.error("Geolocation error:", err);
          setStateField('error', t('errors.geolocationFailure'));
        }
      );
    } else {
      setStateField('error', t('errors.geolocationUnavailable'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTempUnit = () => {
    const newTempUnit = state.tempUnit === 'metric' ? 'imperial' : 'metric';
    const convertTemp = (temp) => newTempUnit === 'metric' ? (temp - 32) * 5 / 9 : temp * 9 / 5 + 32;

    setStateField('tempUnit', newTempUnit);
    
    if (state.weatherData) {
      setStateField('weatherData', {
        ...state.weatherData,
        main: {
          ...state.weatherData.main,
          temp: convertTemp(state.weatherData.main.temp),
          feels_like: convertTemp(state.weatherData.main.feels_like),
        },
      });
    }

    setStateField('forecastData', state.forecastData.map(item => ({
      ...item,
      main: {
        ...item.main,
        temp_min: convertTemp(item.main.temp_min),
        temp_max: convertTemp(item.main.temp_max),
        temp: convertTemp(item.main.temp),
      },
    })));
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        setError: (error) => setStateField('error', error),
        fetchWeatherData,
        fetchWeatherByCoordinates,
        toggleTempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};