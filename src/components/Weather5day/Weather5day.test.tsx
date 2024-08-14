import React from "react";
import { render, screen } from "@testing-library/react";
import Weather5day from "./Weather5day";
import { useWeather } from "../../WeatherContext";
import { useTranslation } from "react-i18next";
import translations from "../../translations/en.json";

jest.mock("../../WeatherContext", () => ({
  useWeather: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

// Helper function to get translated text
const getText = (key: string): string => {
  const keys = key.split(".");
  const translation = keys.reduce((obj, k) => (obj as any)[k], translations);
  return typeof translation === "string" ? translation : key;
};

interface WeatherData {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
}

describe("Weather5day Component", () => {
  const mockForecastData: WeatherData[] = [
    {
      dt_txt: "2023-10-01 12:00:00",
      main: {
        temp_min: 15,
        temp_max: 20,
      },
      weather: [
        {
          icon: "01d",
        },
      ],
    },
    {
      dt_txt: "2023-10-02 12:00:00",
      main: {
        temp_min: 17,
        temp_max: 22,
      },
      weather: [
        {
          icon: "02d",
        },
      ],
    },
  ];

  const mockUseWeather = {
    forecastData: mockForecastData,
    tempUnit: "metric",
  };

  const mockUseTranslation = {
    t: (key: string) => getText(key),
    i18n: {
      language: "en",
    },
  };

  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue(mockUseWeather);
    (useTranslation as jest.Mock).mockReturnValue(mockUseTranslation);
  });

  test("renders the Weather5day component", () => {
    render(<Weather5day />);
    expect(
      screen.getByText(getText("labels.title5DaysForecast"))
    ).toBeInTheDocument();
  });

  test("displays the correct forecast data", () => {
    render(<Weather5day />);

    expect(
      screen.getByText(/(?:Sun|Sunday|Oct 1|1 Oct|October 1)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/(?:Mon|Monday|Oct 2|2 Oct|October 2)/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/20.*[°℃]C.*\/.*15.*[°℃]C/i)).toBeInTheDocument();
    expect(screen.getByText(/22.*[°℃]C.*\/.*17.*[°℃]C/i)).toBeInTheDocument();
  });

  test("displays the correct weather icons", () => {
    render(<Weather5day />);
    const weatherIcons = screen.getAllByAltText("Weather Icon");
    expect(weatherIcons.length).toBe(2);
  });
});
