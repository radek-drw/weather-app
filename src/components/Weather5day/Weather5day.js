import React from "react";
import { useWeather } from "../../WeatherContext";
import { weatherIcons } from "../../assets/weatherIcons";
import { useTranslation } from 'react-i18next';
import {
  FiveDaysCard,
  Title,
  DayContainer,
  WeatherIcon,
  TemperatureValue,
  DateValue
} from './Weather5day.styles';

const formatDate = (dateString, locale) => {
  const dateTime = new Date(dateString);
  return dateTime.toLocaleDateString(locale, { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });
};

const processForecastData = (data, locale) => {
  const dailyData = {};

  data.forEach((item) => {
    const date = formatDate(item.dt_txt, locale);
    const weatherCode = item.weather[0].icon.replace('n', 'd');

    if (!dailyData[date]) {
      dailyData[date] = {
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        weatherCode: weatherCode,
      };
    } else {
      dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp_min);
      dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
    }
  });

  return Object.keys(dailyData).map((date) => ({
    date,
    ...dailyData[date],
  }));
};

const Weather5day = () => {
  const { forecastData, tempUnit } = useWeather();
  const { t, i18n } = useTranslation();

  const daysForecast = processForecastData(forecastData, i18n.language).slice(0, 5);

  const tempSuffix = tempUnit === 'metric' ? 'C' : 'F';

  return (
    <FiveDaysCard>
      <Title>{t('labels.title5DaysForecast')}</Title>
      {daysForecast.map((forecast, index) => (
        <DayContainer key={index}>
          <WeatherIcon src={weatherIcons[forecast.weatherCode]} alt="Weather Icon" />
          <TemperatureValue>
            {Math.round(forecast.maxTemp)}&deg;{tempSuffix} / {Math.round(forecast.minTemp)}&deg;{tempSuffix}
          </TemperatureValue>
          <DateValue>{forecast.date}</DateValue>
        </DayContainer>
      ))}
    </FiveDaysCard>
  );
};

export default Weather5day;
