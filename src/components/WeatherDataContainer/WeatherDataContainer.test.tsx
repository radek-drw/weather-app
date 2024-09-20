import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import WeatherDataContainer from "./WeatherDataContainer";
import { useWeather } from "../../WeatherContext";
import { ThemeProvider, useTheme } from "../../ThemeContext";
import i18n from "../../i18n";
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

jest.mock("../WeatherCurrentCity/WeatherCurrentCity", () => () => (
  <div data-testid="weather-current-city" />
));
jest.mock("../WeatherDetails/WeatherDetails", () => () => (
  <div data-testid="weather-details" />
));
jest.mock("../Weather5day/Weather5day", () => () => (
  <div data-testid="weather-5day" />
));
jest.mock("../WeatherHourly/WeatherHourly", () => () => (
  <div data-testid="weather-hourly" />
));
jest.mock("../../features/LoadingOverlay", () => () => (
  <div data-testid="loading-overlay" />
));

const renderComponent = (
  loading: boolean,
  error: string | null,
  theme: "light" | "dark" = "light"
) => {
  (useTheme as jest.Mock).mockReturnValue({
    theme,
    toggleTheme: jest.fn(),
  });

  (useWeather as jest.Mock).mockReturnValue({ loading, error });

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return render(
    <I18nextProvider i18n={i18n}>
      <StyledThemeProvider theme={currentTheme}>
        <ThemeProvider>
          <WeatherDataContainer />
        </ThemeProvider>
      </StyledThemeProvider>
    </I18nextProvider>
  );
};

describe("WeatherDataContainer", () => {
  test("renders loading overlay when loading is true", () => {
    renderComponent(true, null);
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "An error occurred";
    renderComponent(false, errorMessage);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("renders weather components when data is loaded without error", () => {
    renderComponent(false, null);
    expect(screen.getByTestId("weather-current-city")).toBeInTheDocument();
    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(screen.getByTestId("weather-5day")).toBeInTheDocument();
    expect(screen.getByTestId("weather-hourly")).toBeInTheDocument();
  });

  test("does not render loading overlay or error message when data is loaded without error", () => {
    renderComponent(false, null);
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
    expect(screen.queryByText("An error occurred")).not.toBeInTheDocument();
  });

  test("renders only weather components when neither loading nor error state is true", () => {
    renderComponent(false, null); // no loading and no error

    // Verify that the loading overlay is not rendered
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();

    // Verify that no error message is rendered
    expect(screen.queryByText("An error occurred")).not.toBeInTheDocument();

    // Ensure weather components are rendered
    expect(screen.getByTestId("weather-current-city")).toBeInTheDocument();
    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(screen.getByTestId("weather-5day")).toBeInTheDocument();
    expect(screen.getByTestId("weather-hourly")).toBeInTheDocument();
  });
});
