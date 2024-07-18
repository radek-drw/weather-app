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

const Weather5day = () => {
  const { forecastData, tempUnit } = useWeather();
  const { t, i18n } = useTranslation();

  const processForecastData = (data) => {
    const dailyData = {};

    data.forEach((item) => {
      const dateTime = new Date(item.dt_txt);
      const date = dateTime.toLocaleDateString(i18n.language, { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });

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

  const daysForecast = processForecastData(forecastData).slice(0, 5);

  return (
    <FiveDaysCard>
      <Title>{t('labels.title5DaysForecast')}</Title>
      {daysForecast.map((forecast, index) => (
        <DayContainer key={index}>
          <WeatherIcon src={weatherIcons[forecast.weatherCode]} alt="Weather Icon" />
          <TemperatureValue>
            {Math.round(forecast.maxTemp)}&deg;{tempUnit === 'metric' ? 'C' : 'F'} /{' '}  
            {Math.round(forecast.minTemp)}&deg;{tempUnit === 'metric' ? 'C' : 'F'}
          </TemperatureValue>
          <DateValue>{forecast.date}</DateValue>
        </DayContainer>
      ))}
    </FiveDaysCard>
  );
};

export default Weather5day;
