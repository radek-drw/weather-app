import React, { useState, useEffect, useRef, useCallback, FormEvent, ChangeEvent } from "react";
import { useWeather } from "../../WeatherContext";
import CitySuggestions from "../../features/CitySuggestions";
import { TempUnitToggle, ThemeToggle } from '../../features/Toggle';
import LanguageSelector from "../../features/LanguageSelector";
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
} from "./Navbar.styles";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY as string;

interface Suggestion {
  description: string;
  placeId: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface AdditionalDetails {
  state?: string;
  county?: string;
}

const Navbar: React.FC = () => {
  const { fetchWeatherData, fetchWeatherByCoordinates, error, setError } = useWeather();
  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [localError, setLocalError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=${i18n.language}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Google Maps API loaded");
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [i18n.language]);

  const handleFetchWeather = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const cityRegex = /^[a-zA-Z\s-,]+$/;

    if (trimmedCity.length < 2) {
      setLocalError(t('errors.shortCityName'));
    } else if (trimmedCity.length > 50) {
      setLocalError(t('errors.longCityName'));
    } else if (!cityRegex.test(trimmedCity)) {
      setLocalError(t('errors.invalidCityName'));
    } else {
      fetchWeatherData(trimmedCity);
      setCity("");
      setSuggestions([]);
      return;
    }
    inputRef.current?.focus();
  }, [city, fetchWeatherData, t]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    setLocalError("");
    if (value.length >= 3 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value, types: ["(cities)"], language: i18n.language },
        (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error("Error fetching city suggestions:", status);
            return;
          }
          setSuggestions(predictions.map(prediction => ({
            description: prediction.description,
            placeId: prediction.place_id
          })));
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [i18n.language]);

  const handleSelectCity = useCallback((selectedCity: Suggestion) => {
    if (placesService.current) {
      placesService.current.getDetails(
        { placeId: selectedCity.placeId, fields: ['address_components', 'geometry'] },
        (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const cityName = place.address_components?.find(component => component.types.includes("locality"))?.long_name;
            const countryName = place.address_components?.find(component => component.types.includes("country"))?.short_name;
            const state = place.address_components?.find(component => component.types.includes("administrative_area_level_1"))?.long_name;
            const county = place.address_components?.find(component => component.types.includes("administrative_area_level_2"))?.long_name;
            const fullCityName = `${cityName}, ${countryName}`;
            const additionalDetails: AdditionalDetails = { state, county };
            const coordinates: Coordinates = {
              lat: place.geometry?.location?.lat() || 0,
              lon: place.geometry?.location?.lng() || 0
            };
            fetchWeatherData(fullCityName, additionalDetails, coordinates);
          } else {
            console.error("Place details error:", status);
            setError(t('errors.cityNotFound'));
          }
        }
      );
    }
    setCity("");
    setSuggestions([]);
  }, [fetchWeatherData, setError, t]);

  const handleFetchWeatherByLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
          setLocalError("");
          setCity("");
          inputRef.current?.focus();
        },
        (err: GeolocationPositionError) => {
          console.error("Geolocation error:", err);
          setError(t('errors.geolocationFailure'));
          setLocalError("");
        }
      );
    } else {
      setError(t('errors.geolocationUnavailable'));
      setLocalError("");
    }
  }, [fetchWeatherByCoordinates, setError, t]);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <Nav>
      <ThemeToggle />
      <TempUnitToggle />
      <LanguageSelector />
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
          data-testid="city-search"
        />
        <SearchButton type="submit" data-testid="search-button">{t('labels.searchBtn')}</SearchButton>
        {localError && <ErrorText>{localError}</ErrorText>}
        {suggestions.length > 0 && (
          <CitySuggestions suggestions={suggestions} onSelect={handleSelectCity} />
        )}
      </SearchContainer>
      <CurrentLocationButton 
        onClick={handleFetchWeatherByLocation}
        data-testid="current-location-button"  
      >
        <LocationIcon />
        <LocationLabel>{t('labels.currentLocation')}</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
