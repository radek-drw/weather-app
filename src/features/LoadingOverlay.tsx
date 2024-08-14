import React from "react";
import styled from "styled-components";
import { useWeather } from "../WeatherContext";
import { BeatLoader } from "react-spinners";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  backdrop-filter: blur(3px);
`;

const LoadingOverlay: React.FC = () => {
  const { loading } = useWeather();

  return loading ? (
    <Overlay data-testid="loading-overlay">
      <BeatLoader color="#00aaff" size={20} />
    </Overlay>
  ) : null;
};

export default LoadingOverlay;
