import React, { useState, useEffect, useRef } from "react";
import { useWeather } from "../WeatherContext";
import CitySuggestions from "./subcomponent/CitySuggestions";
import ThemeToggle from "./subcomponent/ThemeToggle";
import TempUnitToggle from "./subcomponent/TempUnitToggle";
import { useTranslation } from 'react-i18next';
import {
  Nav,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchButton,
  CurrentLocationButton,
  LocationIcon,
  LocationLabel,
  ErrorText
} from "./NavbarStyles";

const GOOGLE_API_KEY = "AIzaSyB7o6Su1TX6hUXN-TrtI-wQ9y3UfE5WKUY";

const Navbar = () => {
  const { fetchWeatherData, fetchWeatherByCoordinates, error, setError } = useWeather();
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const userLanguage = navigator.language || 'en';

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&language=${userLanguage}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Google Maps API loaded");
    };

    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchWeather = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const cityRegex = /^[a-zA-Z\s-,]+$/;

    if (trimmedCity.length < 2) {
      setLocalError(t('errors.shortCityName'));
      inputRef.current.focus();
    } else if (trimmedCity.length > 50) {
      setLocalError(t('errors.longCityName'));
      inputRef.current.focus();
    } else if (!cityRegex.test(trimmedCity)) {
      setLocalError(t('errors.invalidCityName'));
      inputRef.current.focus();
    } else {
      fetchWeatherData(trimmedCity);
      setCity("");
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setLocalError("");
    if (e.target.value.length >= 3) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: e.target.value, types: ["(cities)"], language: userLanguage },
        (predictions, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error("Error fetching city suggestions:", status);
            return;
          }

          const suggestions = predictions.map(prediction => ({
            description: prediction.description,
            placeId: prediction.place_id
          }));
          setSuggestions(suggestions);
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = async (selectedCity) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: selectedCity.placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const cityName = results[0].address_components.find(component => component.types.includes("locality"))?.long_name;
        const countryName = results[0].address_components.find(component => component.types.includes("country"))?.short_name;
        const fullCityName = `${cityName}, ${countryName}`;
        fetchWeatherData(fullCityName);
      } else {
        console.error("Geocode error:", status);
        setError(t('errors.cityNotFound'));
      }
    });
    setCity("");
    setSuggestions([]);
  };

  const handleFetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
          setLocalError("");
          setCity("");
          inputRef.current.focus();
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(t('errors.geolocationFailure'));
          setLocalError("");
        }
      );
    } else {
      setError(t('errors.geolocationUnavailable'));
      setLocalError("");
    }
  };

  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <Nav>
      <ThemeToggle />
      <TempUnitToggle />
      <SearchContainer onSubmit={handleFetchWeather}>
        <SearchIcon />
        <SearchInput
          id="city-search"
          name="city"
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder={t('placeholders.input')}
          ref={inputRef}
        />
        <SearchButton type="submit">{t('labels.searchBtn')}</SearchButton>
        {localError && <ErrorText>{localError}</ErrorText>}
        {suggestions.length > 0 && (
          <CitySuggestions suggestions={suggestions} onSelect={handleSelectCity} />
        )}
      </SearchContainer>
      <CurrentLocationButton onClick={handleFetchWeatherByLocation}>
        <LocationIcon />
        <LocationLabel>{t('labels.currentLocation')}</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
