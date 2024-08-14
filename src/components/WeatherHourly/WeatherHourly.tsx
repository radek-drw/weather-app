import React from "react";
import { useTranslation } from "react-i18next";

import { useWeather } from "../../WeatherContext";

import { weatherIcons, WeatherIconKey } from "../../assets/weatherIcons";

import {
  HourlyCard,
  Title,
  HourlyContainer,
  HourlyItem,
  WeatherIcon,
  WindSpeedIndicator,
} from "./WeatherHourly.styles";

interface WeatherData {
  timezone: number;
}

interface ForecastData {
  dt: number;
  weather: Array<{
    icon: WeatherIconKey;
    description: string;
  }>;
  main: {
    temp: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

// Converts a Unix UTC timestamp to a localized time string based on the city's timezone offset
const toLocalTime = (
  unixUtcTimestamp: number,
  timezoneOffset: number
): string => {
  const date = new Date(unixUtcTimestamp * 1000);
  date.setUTCSeconds(date.getUTCSeconds() + timezoneOffset);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const WeatherHourly: React.FC = () => {
  const { weatherData, forecastData, tempUnit } = useWeather();
  const { t } = useTranslation();

  if (!weatherData || !forecastData) {
    return null;
  }

  const { timezone: cityTimezoneOffset } = weatherData as WeatherData;

  const hourlyForecasts = (forecastData as ForecastData[])
    .slice(0, 5) // Display only the next 5 hourly forecasts
    .map((forecast, index) => {
      const { dt, weather, main, wind } = forecast;
      const time = toLocalTime(dt, cityTimezoneOffset);
      const temperature = Math.round(main.temp);
      const windSpeed = Math.round(wind.speed);
      const windDirection = wind.deg;
      const iconSrc = weatherIcons[weather[0].icon];
      const iconAlt = weather[0].description;
      const temperatureUnit = tempUnit === "metric" ? "C" : "F";
      const windStyle: React.CSSProperties = {
        transform: `rotate(${windDirection}deg)`,
      };

      return (
        <HourlyItem key={index}>
          <span>{time}</span>
          <WeatherIcon src={iconSrc} alt={iconAlt} />
          <span>
            {temperature}&deg;{temperatureUnit}
          </span>
          <WindSpeedIndicator style={windStyle} />
          <span>{windSpeed}km/h</span>
        </HourlyItem>
      );
    });

  return (
    <HourlyCard>
      <Title>{t("labels.hourlyForecastTitle")}</Title>
      <HourlyContainer>{hourlyForecasts}</HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
