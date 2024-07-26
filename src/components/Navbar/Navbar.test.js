import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Navbar from './Navbar';
import { WeatherProvider } from '../../WeatherContext';

// Mock theme
const mockTheme = {
  colors: {
    text: '#000',
    mutedText: '#888',
    search: {
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowFocus: 'rgba(0, 0, 0, 0.2)',
      btnBackground: '#007bff',
      btnText: '#fff',
      btnHover: '#0056b3',
    },
    toggleThemeBg: '#f0f0f0',
  },
};

// Mock translations
const mockTranslations = {
  'labels.searchBtn': 'Search',
  'labels.currentLocation': 'Current location',
  'placeholders.input': 'Enter a city',
  'errors.shortCityName': 'City name is too short',
};

// Mock the i18next library
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => mockTranslations[key] || key,
    i18n: { language: 'en' },
  }),
}));

// Mock the WeatherContext
jest.mock('../../WeatherContext', () => {
  const fetchWeatherByCoordinates = jest.fn();
  return {
    useWeather: () => ({
      fetchWeatherData: jest.fn(),
      fetchWeatherByCoordinates,
      error: null,
      setError: jest.fn(),
    }),
    WeatherProvider: ({ children }) => <div>{children}</div>,
  };
});

// Mock the ThemeContext (if you're using a separate ThemeContext)
jest.mock('../../ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: jest.fn(),
  }),
}));

const renderNavbar = () => {
  return render(
    <ThemeProvider theme={mockTheme}>
      <WeatherProvider>
        <Navbar />
      </WeatherProvider>
    </ThemeProvider>
  );
};

describe('Navbar Component', () => {
  test('handles input change', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText('Enter a city');
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input.value).toBe('London');
  });

  test('displays error for short city name', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText('Enter a city');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('City name is too short')).toBeInTheDocument();
    });
  });

  test('calls fetchWeatherByCoordinates when current location button is clicked', () => {
    const { fetchWeatherByCoordinates } = require('../../WeatherContext').useWeather();

    renderNavbar();
    const currentLocationButton = screen.getByRole('button', { name: 'Current location' });

    // Mock the geolocation API with variable latitude and longitude
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        // Generate random coordinates for testing
        const latitude = 51.5 + Math.random() * 0.1; // A range around 51.5
        const longitude = -0.13 + Math.random() * 0.1; // A range around -0.13
        success({ coords: { latitude, longitude } });
      }),
    };

    fireEvent.click(currentLocationButton);

    // Check if the mocked function was called with numbers
    expect(fetchWeatherByCoordinates).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
  });

  test('calls fetchWeatherByCoordinates with coordinates within expected range', () => {
    const { fetchWeatherByCoordinates } = require('../../WeatherContext').useWeather();

    renderNavbar();
    const currentLocationButton = screen.getByRole('button', { name: 'Current location' });

    // Mock the geolocation API
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        success({ coords: { latitude: 51.5074, longitude: -0.1278 } });
      }),
    };

    fireEvent.click(currentLocationButton);

    // Capture the arguments passed to fetchWeatherByCoordinates
    const [latitude, longitude] = fetchWeatherByCoordinates.mock.calls[0];

    // Check if latitude and longitude are within a realistic range
    expect(latitude).toBeGreaterThanOrEqual(51.5);
    expect(latitude).toBeLessThanOrEqual(51.6);
    expect(longitude).toBeGreaterThanOrEqual(-0.14);
    expect(longitude).toBeLessThanOrEqual(-0.12);
  });
});
