import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import Navbar from './Navbar';
import { WeatherProvider } from '../../WeatherContext';
import { ThemeProvider } from '../../ThemeContext';
import i18n from '../../i18n';
import translations from '../../translations/en.json';
import { lightTheme, darkTheme } from '../../styles/themes/index';

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

jest.mock('../../ThemeContext', () => {
  const actualThemeContext = jest.requireActual('../../ThemeContext');
  return {
    ...actualThemeContext,
    useTheme: jest.fn(),
  };
});

const renderNavbar = (theme = 'light') => {
  const toggleTheme = jest.fn();
  const { useTheme } = require('../../ThemeContext');
  useTheme.mockReturnValue({
    theme,
    toggleTheme,
  });

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return {
    ...render(
      <I18nextProvider i18n={i18n}>
        <StyledThemeProvider theme={currentTheme}>
          <WeatherProvider>
            <ThemeProvider>
              <Navbar />
            </ThemeProvider>
          </WeatherProvider>
        </StyledThemeProvider>
      </I18nextProvider>
    ),
    toggleTheme,
  };
};

// Helper function to get translated text
const getText = (key) => {
  const keys = key.split('.');
  return keys.reduce((obj, k) => obj[k], translations) || key;
};

// Test suite for Navbar component
describe('Navbar Component', () => {
  // Test for handling input change
  test('handles input change', () => {
    renderNavbar();
    const input = screen.getByTestId('city-search');
    fireEvent.change(input, { target: { value: 'Dublin' } });
    expect(input.value).toBe('Dublin');
  });

  // Test for short city name error
  test('displays error for short city name', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(getText('placeholders.input'));
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(getText('errors.shortCityName'))).toBeInTheDocument();
    });
  });

  // Test for long city name error
  test('displays error when city name is too long', async () => {
    renderNavbar();
    const input = screen.getByTestId('city-search');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'A very long city name that exceeds fifty characters' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(getText('errors.longCityName'))).toBeInTheDocument();
    });
  });

  // Test for invalid characters in city name error
  test('displays error when city name contains invalid characters', async () => {
    renderNavbar();
    const input = screen.getByTestId('city-search');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Dublin-new123!' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(getText('errors.invalidCityName'))).toBeInTheDocument();
    });
  });

  // Test for theme toggling
  test('toggles theme from light to dark and vice versa', () => {
    const { toggleTheme } = renderNavbar('light');
  
    const toggleButton = screen.getByTestId('theme-toggle');
  
    fireEvent.click(toggleButton);
  
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});