import styled, { css } from "styled-components";

import { FaWind } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { WiBarometer, WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";

import media from "../../styles/media";

const twilightColors = {
  sunrise: "#ffd700",
  sunset: "#ff6347",
};

export const DetailsCard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 65%;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  flex-basis: 33%;

  &:nth-child(2) {
    justify-content: space-around;
    align-items: center;
  }

  &:nth-child(3) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const CurrentTemp = styled.div`
  font-size: 3.5rem;
`;

export const FeelsLikeTemp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.mutedText};

  span {
    margin: 5px;
    font-size: 1.6rem;
  }
`;

export const SunTwilight = styled.div`
  display: flex;
  align-items: center;

  &:first-of-type {
    margin-bottom: -5px;
  }

  div {
    text-align: center;
    margin-left: 4px;

    p {
      word-wrap: break-word;
    }
  }
`;

export const SunriseIcon = styled(WiSunrise)`
  font-size: 40px;
  color: ${twilightColors.sunrise};
`;

export const SunsetIcon = styled(WiSunset)`
  font-size: 40px;
  color: ${twilightColors.sunset};
`;

export const SkyCondIcon = styled.img`
  width: 100px;
  height: 100px;

  ${media.mobile`
    width: 75px;
    height: 75px;
  `}
`;

export const SkyCondition = styled.h3`
  font-size: 1.6rem;
`;

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-basis: 50%;

  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 14px;
  }
`;

export const MetricIconStyles = css`
  height: 40px;
`;

export const MetricValue = styled.div`
  font-size: 1.1rem;
`;

export const MetricLabel = styled.p`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  font-size: 0.9rem;
  word-break: break-all;
`;

export const HumidityIcon = styled(WiHumidity)`
  ${MetricIconStyles}
  font-size: 37px;
`;

export const WindIcon = styled(FaWind)`
  ${MetricIconStyles}
  font-size: 24px;
`;

export const BarometerIcon = styled(WiBarometer)`
  ${MetricIconStyles}
  font-size: 44px;
`;

export const VisibilityIcon = styled(MdOutlineVisibility)`
  ${MetricIconStyles}
  font-size: 25px;
`;
