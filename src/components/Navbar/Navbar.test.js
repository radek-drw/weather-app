import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import Navbar from './Navbar';
import { WeatherProvider } from '../../WeatherContext';
import i18n from '../../i18n';
import translations from '../../translations/en.json';

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
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={mockTheme}>
        <WeatherProvider>
          <Navbar />
        </WeatherProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

const getText = (key) => {
  const keys = key.split('.');
  return keys.reduce((obj, k) => obj[k], translations) || key;
};

describe('Navbar Component', () => {
  test('handles input change', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(getText('placeholders.input'));
    fireEvent.change(input, { target: { value: 'Dublin' } });
    expect(input.value).toBe('Dublin');
  });

  test('displays error for short city name', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(getText('placeholders.input'));
    const searchButton = screen.getByRole('button', { name: getText('labels.searchBtn') });

    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(getText('errors.shortCityName'))).toBeInTheDocument();
    });
  });

  test('displays error when city name is too long', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(getText('placeholders.input'));
    const searchButton = screen.getByRole('button', { name: getText('labels.searchBtn') });

    fireEvent.change(input, { target: { value: 'A very long city name that exceeds fifty characters' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(getText('errors.longCityName'))).toBeInTheDocument();
    });
  });

  test('displays error when city name contains invalid characters', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(getText('placeholders.input'));
    const searchButton = screen.getByRole('button', { name: getText('labels.searchBtn') });

    fireEvent.change(input, { target: { value: 'Dublin-new123!' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(getText('errors.invalidCityName'))).toBeInTheDocument();
    });
  });

  test('calls fetchWeatherByCoordinates when current location button is clicked', () => {
    const { fetchWeatherByCoordinates } = require('../../WeatherContext').useWeather();

    renderNavbar();
    const currentLocationButton = screen.getByRole('button', { name: getText('labels.currentLocation') });

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        // Generate random coordinates for testing
        const latitude = 51.5 + Math.random() * 0.1;
        const longitude = -0.13 + Math.random() * 0.1;
        success({ coords: { latitude, longitude } });
      }),
    };

    fireEvent.click(currentLocationButton);

    expect(fetchWeatherByCoordinates).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
  });

  test('calls fetchWeatherByCoordinates with coordinates within expected range', () => {
    const { fetchWeatherByCoordinates } = require('../../WeatherContext').useWeather();

    renderNavbar();
    const currentLocationButton = screen.getByRole('button', { name: getText('labels.currentLocation') });

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        success({ coords: { latitude: 51.5074, longitude: -0.1278 } });
      }),
    };

    fireEvent.click(currentLocationButton);

    const [latitude, longitude] = fetchWeatherByCoordinates.mock.calls[0];

    // Check if latitude and longitude are within a realistic range
    expect(latitude).toBeGreaterThanOrEqual(51.5);
    expect(latitude).toBeLessThanOrEqual(51.6);
    expect(longitude).toBeGreaterThanOrEqual(-0.14);
    expect(longitude).toBeLessThanOrEqual(-0.12);
  });
});