import React, { useState, useEffect } from "react";
import { useWeather } from "../WeatherContext";
import styled from "styled-components";
import { LuMapPin } from "react-icons/lu";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyB7o6Su1TX6hUXN-TrtI-wQ9y3UfE5WKUY";

const CityCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityName = styled.h1`
  margin-bottom: 0.4rem;
  font-size: 2rem;
  color: inherit;
`;

const CityLocationDetails = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LocationIcon = styled(LuMapPin)`
  margin-left: 8px;
  font-size: 1.6rem;
`;

const CityTime = styled.div`
  margin-bottom: 0.5rem;
  font-size: 4rem;
  color: #00aaff; /* Light blue color for time */
`;

const CityDate = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
`;

const WeatherCurrentCity = () => {
  const { weatherData, error, fetchedByCoordinates } = useWeather();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState({});

  useEffect(() => {
    if (weatherData?.timezone !== undefined) {
      const fetchTimeData = () => {
        try {
          const now = new Date();
          const utcOffsetInMs = weatherData.timezone * 1000;
          const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
          const localTime = new Date(utcTime + utcOffsetInMs);

          setCurrentTime(
            localTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setCurrentDate(
            localTime.toLocaleDateString(navigator.language, {
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
  }, [weatherData]);

  useEffect(() => {
    if (weatherData) {
      const fetchAdditionalDetails = async () => {
        try {
          const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${weatherData.coord.lat},${weatherData.coord.lon}&key=${GOOGLE_API_KEY}`
          );
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const county = addressComponents.find(component =>
              component.types.includes("administrative_area_level_2")
            );
            const state = addressComponents.find(component =>
              component.types.includes("administrative_area_level_1")
            );
            setAdditionalDetails({
              county: county ? county.long_name : "",
              state: state ? state.long_name : "",
            });
          }
        } catch (error) {
          console.error("Error fetching additional location details:", error);
        }
      };

      fetchAdditionalDetails();
    }
  }, [weatherData]);

  if (!weatherData) {
    return null;
  }

  return (
    <CityCard>
      <CityName>
        {weatherData.name}
        {fetchedByCoordinates && !error && <LocationIcon />}
      </CityName>
      <CityLocationDetails>
        {weatherData.name}
        {additionalDetails.county && `, ${additionalDetails.county}`}
        {additionalDetails.county && `,`} {weatherData.sys.country}
      </CityLocationDetails>
      <CityTime>{currentTime}</CityTime>
      <CityDate>{currentDate}</CityDate>
    </CityCard>
  );
};

export default WeatherCurrentCity;
