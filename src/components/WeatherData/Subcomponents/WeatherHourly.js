import React from "react";
import styled from "styled-components";

const HourlyCard = styled.div``;

const Title = styled.h3``;

const HourlyContainer = styled.div``;

const HourlyItem = styled.div``;

const TimeLabel = styled.span``;

const TemperatureValue = styled.span``;

const WindSpeedIndicator = styled.span``;

const WindSpeedLabel = styled.span``;

const WeatherHourly = () => {
  return (
    <HourlyCard>
      <Title>Hourly Forecast</Title>
      <HourlyContainer>
        <HourlyItem>
          <TimeLabel>12:00</TimeLabel>
          {/* icon here */}
          <TemperatureValue>26C</TemperatureValue>
          <WindSpeedIndicator>{/* icon here */}</WindSpeedIndicator>
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>15:00</TimeLabel>
          {/* icon here */}
          <TemperatureValue>27C</TemperatureValue>
          <WindSpeedIndicator>{/* icon here */}</WindSpeedIndicator>
          <WindSpeedLabel>2km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>18:00</TimeLabel>
          {/* icon here */}
          <TemperatureValue>27C</TemperatureValue>
          <WindSpeedIndicator>{/* icon here */}</WindSpeedIndicator>
          <WindSpeedLabel>2km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>21:00</TimeLabel>
          {/* icon here */}
          <TemperatureValue>25C</TemperatureValue>
          <WindSpeedIndicator>{/* icon here */}</WindSpeedIndicator>
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>00:00</TimeLabel>
          {/* icon here */}
          <TemperatureValue>22C</TemperatureValue>
          <WindSpeedIndicator>{/* icon here */}</WindSpeedIndicator>
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
