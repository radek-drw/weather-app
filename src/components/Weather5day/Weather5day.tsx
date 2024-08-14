import React from "react";
import { useTranslation } from "react-i18next";

import { useWeather } from "../../WeatherContext";

import { weatherIcons, WeatherIconKey } from "../../assets/weatherIcons";

import {
  DateValue,
  DayContainer,
  FiveDaysCard,
  TemperatureValue,
  Title,
  WeatherIcon,
} from "./Weather5day.styles";

type ForecastItem = {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    icon: string;
  }[];
};

type ProcessedForecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherCode: string;
};

type WeatherContextType = {
  forecastData: ForecastItem[];
  tempUnit: "metric" | "imperial";
};

const formatDate = (dateString: string, locale: string): string => {
  // Convert date string to short date format (e.g., "Mon, 7 Aug")
  const dateTime = new Date(dateString);
  return dateTime.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const processForecastData = (
  data: ForecastItem[],
  locale: string
): ProcessedForecast[] => {
  // Object to store aggregated daily forecast data
  const dailyData: Record<
    string,
    { minTemp: number; maxTemp: number; weatherCode: string }
  > = {};

  data.forEach((item) => {
    const date = formatDate(item.dt_txt, locale);
    const weatherCode = item.weather[0].icon.replace("n", "d"); // Convert nighttime icons to daytime equivalents

    if (!dailyData[date]) {
      dailyData[date] = {
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        weatherCode: weatherCode,
      };
    } else {
      // Update the existing date entry with min/max temperatures
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        item.main.temp_min
      );
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        item.main.temp_max
      );
    }
  });

  return Object.keys(dailyData).map((date) => ({
    date,
    ...dailyData[date],
  }));
};

const Weather5day: React.FC = () => {
  const { forecastData, tempUnit } = useWeather() as WeatherContextType;
  const { t, i18n } = useTranslation();

  // Process and slice the forecast data to display only the first 5 days
  const daysForecast = processForecastData(forecastData, i18n.language).slice(
    0,
    5
  );

  const tempSuffix = tempUnit === "metric" ? "C" : "F";

  return (
    <FiveDaysCard>
      <Title>{t("labels.title5DaysForecast")}</Title>
      {daysForecast.map((forecast, index) => (
        <DayContainer key={index}>
          <WeatherIcon
            src={weatherIcons[forecast.weatherCode as WeatherIconKey]}
            alt="Weather Icon"
          />
          <TemperatureValue>
            {Math.round(forecast.maxTemp)}&deg;{tempSuffix} /{" "}
            {Math.round(forecast.minTemp)}&deg;{tempSuffix}
          </TemperatureValue>
          <DateValue>{forecast.date}</DateValue>
        </DayContainer>
      ))}
    </FiveDaysCard>
  );
};

export default Weather5day;
