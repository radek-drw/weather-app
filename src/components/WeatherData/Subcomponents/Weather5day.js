import React from "react";
import styled from "styled-components";

const FiveDaysCard = styled.div`
  flex-basis: 30%;
`;

const Title = styled.h3``;

const DayContainer = styled.div``;

const TemperatureValue = styled.span``;

const DayName = styled.span``;

const DateValue = styled.div``;

const Weather5day = () => {
  return (
    <FiveDaysCard>
      <Title>5 Days Forecast</Title>
      <DayContainer>
        {/* weather icons here */}
        <TemperatureValue>20&deg;C</TemperatureValue>
        <DayName>Friday</DayName>
        <DateValue>1 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        {/* weather icons here */}
        <TemperatureValue>22&deg;C</TemperatureValue>
        <DayName>Saturday</DayName>
        <DateValue>2 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        {/* weather icons here */}
        <TemperatureValue>27&deg;C</TemperatureValue>
        <DayName>Sunday</DayName>
        <DateValue>3 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        {/* weather icons here */}
        <TemperatureValue>18&deg;C</TemperatureValue>
        <DayName>Monday</DayName>
        <DateValue>4 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        {/* weather icons here */}
        <TemperatureValue>16&deg;C</TemperatureValue>
        <DayName>Tuesday</DayName>
        <DateValue>5 Sep</DateValue>
      </DayContainer>
    </FiveDaysCard>
  );
};

export default Weather5day;
