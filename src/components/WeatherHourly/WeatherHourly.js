import React from "react";
import { useWeather } from "../../WeatherContext";
import { weatherIcons } from "../../assets/weatherIcons";
import { useTranslation } from 'react-i18next';

import {
  HourlyCard,
  Title,
  HourlyContainer,
  HourlyItem,
  WeatherIcon,
  WindSpeedIndicator
} from './WeatherHourly.styles';

const WeatherHourly = () => {
  const { weatherData, forecastData, tempUnit } = useWeather();
  const { t } = useTranslation();

  if (!weatherData || !forecastData) {
    return null
  }

  const cityTimezoneOffset = weatherData.timezone;
  const localTime = (unixUtcTimestamp) => {
    const dt = new Date(unixUtcTimestamp * 1000);
    dt.setUTCSeconds(dt.getUTCSeconds() + cityTimezoneOffset);
    return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <HourlyCard>
      <Title>{t('labels.hourlyForecastTitle')}</Title>
      <HourlyContainer>
        {forecastData.slice(0, 5).map((forecast, index) => (
          <HourlyItem key={index}>
            <span>{localTime(forecast.dt)}</span>
            <WeatherIcon src={weatherIcons[forecast.weather[0].icon]} alt={forecast.weather[0].description} />
            <span>{Math.round(forecast.main.temp)}&deg;{tempUnit === 'metric' ? 'C' : 'F'}</span>
            <WindSpeedIndicator style={{ transform: `rotate(${forecast.wind.deg}deg)` }} />
            <span>{Math.round(forecast.wind.speed)}km/h</span>
          </HourlyItem>
        ))}
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
