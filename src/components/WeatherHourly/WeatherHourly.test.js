import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import WeatherHourly from './WeatherHourly';
import { darkTheme } from '../../styles/themes/darkTheme';

jest.mock('../../WeatherContext', () => ({
  useWeather: () => ({
    weatherData: {
      timezone: 3600,
    },
    forecastData: [
      {
        dt: 1627776000,
        weather: [{ icon: '01d', description: 'clear sky' }],
        main: { temp: 25 },
        wind: { speed: 5, deg: 180 },
      },
    ],
    tempUnit: 'metric',
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../../assets/weatherIcons', () => ({
  weatherIcons: {
    '01d': 'mocked-icon-url',
  },
}));

const renderWithTheme = (ui, theme = darkTheme) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('WeatherHourly', () => {
  test('renders without crashing', () => {
    renderWithTheme(<WeatherHourly />);
    expect(screen.getByText('labels.hourlyForecastTitle')).toBeInTheDocument();
  });

  test('displays temperature in correct unit', () => {
    renderWithTheme(<WeatherHourly />);
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  test('displays weather icon correctly', () => {
    renderWithTheme(<WeatherHourly />);
    const weatherIcon = screen.getByAltText('clear sky');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute('src', 'mocked-icon-url');
  });

  test('displays wind speed correctly', () => {
    renderWithTheme(<WeatherHourly />);
    expect(screen.getByText('5km/h')).toBeInTheDocument();
  });
});
