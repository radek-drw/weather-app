import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather5day from './Weather5day';
import { useWeather } from '../../WeatherContext';
import { useTranslation } from 'react-i18next';
import translations from '../../translations/en.json';

jest.mock('../../WeatherContext', () => ({
  useWeather: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const getText = (key) => {
  const keys = key.split('.');
  return keys.reduce((obj, k) => obj[k], translations) || key;
};

describe('Weather5day Component', () => {
  const mockForecastData = [
    {
      dt_txt: '2023-10-01 12:00:00',
      main: {
        temp_min: 15,
        temp_max: 20,
      },
      weather: [
        {
          icon: '01d',
        },
      ],
    },
    {
      dt_txt: '2023-10-02 12:00:00',
      main: {
        temp_min: 17,
        temp_max: 22,
      },
      weather: [
        {
          icon: '02d',
        },
      ],
    },
  ];

  const mockUseWeather = {
    forecastData: mockForecastData,
    tempUnit: 'metric',
  };

  const mockUseTranslation = {
    t: (key) => getText(key),
    i18n: {
      language: 'en',
    },
  };

  beforeEach(() => {
    useWeather.mockReturnValue(mockUseWeather);
    useTranslation.mockReturnValue(mockUseTranslation);
  });

  test('renders the Weather5day component', () => {
    render(<Weather5day />);
    expect(screen.getByText(getText('labels.title5DaysForecast'))).toBeInTheDocument();
  });

  test('displays the correct forecast data', () => {
    render(<Weather5day />);

    expect(screen.getByText(/(?:Sun|Sunday|Oct 1|1 Oct|October 1)/i)).toBeInTheDocument();
    expect(screen.getByText(/(?:Mon|Monday|Oct 2|2 Oct|October 2)/i)).toBeInTheDocument();
    
    expect(screen.getByText(/20.*[°℃]C.*\/.*15.*[°℃]C/i)).toBeInTheDocument();
    expect(screen.getByText(/22.*[°℃]C.*\/.*17.*[°℃]C/i)).toBeInTheDocument();
  });

  test('displays the correct weather icons', () => {
    render(<Weather5day />);
    const weatherIcons = screen.getAllByAltText('Weather Icon');
    expect(weatherIcons.length).toBe(2);
  });
});