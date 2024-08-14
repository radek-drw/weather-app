import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import WeatherDetails from "./WeatherDetails";
import { useWeather } from "../../WeatherContext";
import { ThemeProvider, useTheme } from "../../ThemeContext";
import i18n from "../../i18n";
import translations from "../../translations/en.json";
import { lightTheme, darkTheme } from "../../styles/themes/index";

jest.mock("../../WeatherContext", () => ({
  useWeather: jest.fn(),
}));

jest.mock("../../ThemeContext", () => {
  const actualThemeContext = jest.requireActual("../../ThemeContext");
  return {
    ...actualThemeContext,
    useTheme: jest.fn(),
  };
});

// Helper function to get translated text
const getText = (key: string): string => {
  const keys = key.split(".");
  const translation = keys.reduce((obj, k) => (obj as any)[k], translations);
  return typeof translation === "string" ? translation : key;
};

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  timezone: number;
}

const mockWeatherData: WeatherData = {
  main: {
    temp: 20,
    feels_like: 18,
    humidity: 50,
    pressure: 1012,
  },
  weather: [
    {
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: {
    speed: 10,
  },
  sys: {
    sunrise: 1600000000,
    sunset: 1600040000,
  },
  visibility: 10000,
  timezone: 0,
};

const renderComponent = (
  weatherData: WeatherData = mockWeatherData,
  tempUnit: string = "metric",
  theme: "light" | "dark" = "light"
) => {
  (useTheme as jest.Mock).mockReturnValue({
    theme,
    toggleTheme: jest.fn(),
  });

  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  (useWeather as jest.Mock).mockReturnValue({ weatherData, tempUnit });

  return render(
    <I18nextProvider i18n={i18n}>
      <StyledThemeProvider theme={currentTheme}>
        <ThemeProvider>
          <WeatherDetails />
        </ThemeProvider>
      </StyledThemeProvider>
    </I18nextProvider>
  );
};

describe("WeatherDetails", () => {
  test("should render without crashing", () => {
    renderComponent();

    expect(screen.getByText(getText("labels.sunrise"))).toBeInTheDocument();
    expect(screen.getByText(getText("labels.sunset"))).toBeInTheDocument();
    expect(screen.getByText(getText("labels.humidity"))).toBeInTheDocument();
    expect(screen.getByText(getText("labels.windSpeed"))).toBeInTheDocument();
    expect(screen.getByText(getText("labels.pressure"))).toBeInTheDocument();
    expect(screen.getByText(getText("labels.visibility"))).toBeInTheDocument();
  });

  test("should display correct temperature and feels like", () => {
    renderComponent();

    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
  });

  test("should display correct weather conditions", () => {
    renderComponent();

    expect(screen.getByAltText("Clear")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
  });

  test("should display correct humidity, wind speed, pressure, and visibility", () => {
    renderComponent();

    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("10 km/h")).toBeInTheDocument();
    expect(screen.getByText("1012 hPa")).toBeInTheDocument();
    expect(screen.getByText("10 km")).toBeInTheDocument();
  });
});
