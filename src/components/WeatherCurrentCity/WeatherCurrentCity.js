import React, { useState, useEffect } from "react";
import { useWeather } from "../../WeatherContext";
import { useTranslation } from 'react-i18next';
import {
  CityCard,
  CityName,
  CityLocationDetails,
  LocationIcon,
  CityTime,
  CityDate
} from './WeatherCurrentCity.styles';

const WeatherCurrentCity = () => {
  const { weatherData, error, isCurrentLocation } = useWeather();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    if (weatherData?.timezone !== undefined) {
      const fetchTimeData = () => {
        try {
          const now = new Date();
          const utcOffsetInMs = weatherData.timezone * 1000;
          const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
          const localTime = new Date(utcTime + utcOffsetInMs);

          setCurrentTime(
            localTime.toLocaleTimeString(i18n.language, {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setCurrentDate(
            localTime.toLocaleDateString(i18n.language, {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          );
        } catch (error) {
          console.error("Error calculating local time:", error);
        }
      };

      fetchTimeData();
    }
  }, [weatherData, i18n.language]);

  if (!weatherData) {
    return null;
  }

  const { additionalDetails = {} } = weatherData;

  return (
    <CityCard>
      <CityName>
        {weatherData.name}
        {isCurrentLocation && !error && <LocationIcon />}
      </CityName>
      <CityLocationDetails>
        {weatherData.name}
        {additionalDetails.county && `, ${additionalDetails.county}`}
        {additionalDetails.state && `, ${additionalDetails.state}`}
        {`, ${weatherData.sys.country}`}
      </CityLocationDetails>
      <CityTime>{currentTime}</CityTime>
      <CityDate>{currentDate}</CityDate>
    </CityCard>
  );
};

export default WeatherCurrentCity;
