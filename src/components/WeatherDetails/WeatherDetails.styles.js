import styled, { css } from "styled-components";
import { WiSunrise, WiSunset, WiHumidity, WiBarometer } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import media from "../../styles/media";

const twilightColors = {
  sunrise: "#ffd700",
  sunset: "#ff6347",
};

export const DetailsCard = styled.div`
  flex-basis: 65%;
  display: flex;
  justify-content: space-between;
`;

export const Panel = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

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
  color: ${({ theme }) => theme.colors.mutedText};
  display: flex;
  justify-content: center;
  align-items: center;

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
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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
  font-size: 0.9rem;
  flex-grow: 1;
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
