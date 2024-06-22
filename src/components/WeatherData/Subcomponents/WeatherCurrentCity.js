import React from "react";
import styled from "styled-components";

const CityCard = styled.div`
  border: 1px solid white;
`;

const CityName = styled.h1``;

const CityDetails = styled.div``;

const CityTime = styled.span``;

const CityDate = styled.span``;

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
