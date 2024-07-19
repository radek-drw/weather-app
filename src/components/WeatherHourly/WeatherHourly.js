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

// Utility function to convert Unix UTC timestamp to local time
const toLocalTime = (unixUtcTimestamp, timezoneOffset) => {
  const date = new Date(unixUtcTimestamp * 1000);
  date.setUTCSeconds(date.getUTCSeconds() + timezoneOffset);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const WeatherHourly = () => {
  const { weatherData, forecastData, tempUnit } = useWeather();
  const { t } = useTranslation();

  if (!weatherData || !forecastData) {
    return null;
  }

  const { timezone: cityTimezoneOffset } = weatherData;

  // Slice the forecast data and map it to hourly items
  const hourlyForecasts = forecastData.slice(0, 5).map((forecast, index) => {
    const { dt, weather, main, wind } = forecast;
    const time = toLocalTime(dt, cityTimezoneOffset);
    const temperature = Math.round(main.temp);
    const windSpeed = Math.round(wind.speed);
    const windDirection = wind.deg;
    const iconSrc = weatherIcons[weather[0].icon];
    const iconAlt = weather[0].description;
    const temperatureUnit = tempUnit === 'metric' ? 'C' : 'F';
    const windStyle = { transform: `rotate(${windDirection}deg)` };

    return (
      <HourlyItem key={index}>
        <span>{time}</span>
        <WeatherIcon src={iconSrc} alt={iconAlt} />
        <span>{temperature}&deg;{temperatureUnit}</span>
        <WindSpeedIndicator style={windStyle} />
        <span>{windSpeed}km/h</span>
      </HourlyItem>
    );
  });

  return (
    <HourlyCard>
      <Title>{t('labels.hourlyForecastTitle')}</Title>
      <HourlyContainer>
        {hourlyForecasts}
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
