import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import media from "../styles/media";
import { useWeather } from "../WeatherContext";
import Toggle from "./subcomponent/Toggle";
import { LuMapPin } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 35px;
  margin-bottom: 20px;

  ${media.mobile`
    margin-bottom: 0;
    height: 28px;
  `}
`;

const SearchContainer = styled.form`
  flex-basis: 70%;
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.search.shadow};
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.search.shadowFocus};
  }

  ${media.mobile`
      padding: 0.5rem;
  `}
`;

const SearchIcon = styled(CiSearch)`
  align-self: center;
  flex-basis: 10%;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding-left: 0.5rem;
  border: none;
  font-size: 1.2rem;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }
`;

const SearchButton = styled.button`
  height: 100%;
  flex-basis: 20%;
  background-color: ${({ theme }) => theme.colors.search.btnBackground};
  color: ${({ theme }) => theme.colors.search.btnText};
  font-size: 1.3rem;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.search.btnHover};
  }

  ${media.mobile`
    display: none;
  `}
`;

const CurrentLocationButton = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  min-height: 25px;
  align-self: center;
  background-color: rgb(0, 128, 0);
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(0, 114, 0);
  }

  ${media.mobile`
    position: relative;
    left: -10px;
    background-color: transparent;
  `}
`;

const LocationIcon = styled(LuMapPin)`
  width: 14px;
  height: 14px;

  ${media.mobile`
    color:  ${({ theme }) => theme.colors.text};
  `}
`;

const LocationLabel = styled.p`
  margin-left: 5px;

  ${media.mobile`
    display: none;
  `}
`;

const ErrorText = styled.p`
  position: absolute;
  top: 103%;
  left: 0;
  color: red;
  font-size: 1.05rem;
`;

const Navbar = () => {
  const { fetchWeatherData, fetchWeatherByCoordinates, error, setError } = useWeather();
  const [city, setCity] = useState("");
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const handleFetchWeather = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const cityRegex = /^[a-zA-Z\s-]+$/;

    if (trimmedCity.length < 2) {
      setLocalError("City name is too short. Please enter a valid city name.");
      inputRef.current.focus();
    } else if (trimmedCity.length > 50) {
      setLocalError("City name is too long. Please enter a valid city name.");
      inputRef.current.focus();
    } else if (!cityRegex.test(trimmedCity)) {
      setLocalError("City name contains invalid characters. Please enter a valid city name.");
      inputRef.current.focus();
    } else {
      fetchWeatherData(trimmedCity);
      setCity("");
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setLocalError("");
  };

  const handleFetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
          setLocalError("");
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve your location.");
          setLocalError("");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocalError("");
    }
  };

  // Focus on the input when there's an error
  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <Nav>
      <Toggle />
      <SearchContainer onSubmit={handleFetchWeather}>
        <SearchIcon />
        <SearchInput
          id="city-search"
          name="city"
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search for city..."
          ref={inputRef}
        />
        <SearchButton type="submit">Search</SearchButton>
        {localError && <ErrorText>{localError}</ErrorText>}
      </SearchContainer>
      <CurrentLocationButton onClick={handleFetchWeatherByLocation}>
        <LocationIcon />
        <LocationLabel>Current location</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
