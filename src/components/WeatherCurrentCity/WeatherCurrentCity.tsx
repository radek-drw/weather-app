import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useWeather } from "../../WeatherContext";

import {
  CityCard,
  CityDate,
  CityLocationDetails,
  CityName,
  CityTime,
  LocationIcon,
} from "./WeatherCurrentCity.styles";

interface AdditionalDetails {
  county?: string;
  state?: string;
}

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  timezone?: number;
  additionalDetails?: AdditionalDetails;
}

interface WeatherContextValue {
  weatherData?: WeatherData;
  error?: string | null;
  isCurrentLocation: boolean;
}

const WeatherCurrentCity: React.FC = () => {
  const { weatherData, error, isCurrentLocation } =
    useWeather() as WeatherContextValue;
  const { i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    if (weatherData?.timezone !== undefined) {
      const now = new Date();
      const utcOffsetInMs = weatherData.timezone * 1000;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTime = new Date(utcTime + utcOffsetInMs);

      try {
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
    }
  }, [weatherData, i18n.language]);

  if (!weatherData) {
    return null;
  }

  const { name, sys, additionalDetails = {} } = weatherData;
  const { county, state } = additionalDetails;

  return (
    <CityCard>
      <CityName>
        {name}
        {isCurrentLocation && !error && <LocationIcon />}
      </CityName>
      <CityLocationDetails>
        {name}
        {county && `, ${county}`}
        {state && `, ${state}`}
        {`, ${sys.country}`}
      </CityLocationDetails>
      <CityTime>{currentTime}</CityTime>
      <CityDate>{currentDate}</CityDate>
    </CityCard>
  );
};

export default WeatherCurrentCity;
