import React from "react";
import styled from "styled-components";

const CityCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
`;

const CityName = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #fff;
`;

const CityDetails = styled.div`
  text-align: center;
`;

const CityTime = styled.div`
  font-size: 4rem;
  color: #00aaff; /* Light blue color for time */
  margin-bottom: 0.5rem;
`;

const CityDate = styled.div`
  color: #ccc;
`;

const WeatherCurrentCity = () => {
  return (
    <CityCard>
      <CityName>Athens</CityName>
      <CityDetails>
        <CityTime>09:03</CityTime>
        <CityDate>Thursday, 31 Aug</CityDate>
      </CityDetails>
    </CityCard>
  );
};

export default WeatherCurrentCity;
