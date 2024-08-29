import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCurrentCity from "./WeatherCurrentCity";
import { useWeather } from "../../WeatherContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes/index"; // Adjust if you're using darkTheme

jest.mock("../../WeatherContext", () => ({
  useWeather: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
  }),
}));

describe("WeatherCurrentCity", () => {
  const fixedDate = new Date("2023-10-01T12:00:00Z");

  beforeAll(() => {
    jest
      .spyOn(global, "Date")
      .mockImplementation(() => fixedDate as unknown as Date);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <StyledThemeProvider theme={lightTheme}>{component}</StyledThemeProvider>
    );
  };

  test("renders without crashing when weatherData is not available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: null,
      error: null,
      isCurrentLocation: false,
    });

    const { container } = renderWithTheme(<WeatherCurrentCity />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders city name, time, and date when weatherData is available", () => {
    const fixedDate = new Date("2023-10-01T12:00:00Z");
    jest
      .spyOn(global, "Date")
      .mockImplementation(() => fixedDate as unknown as Date);

    const timezoneOffset = 3600;
    const localTime = new Date(
      fixedDate.getTime() + timezoneOffset * 1000
    ).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        name: "Dublin",
        sys: { country: "IE" },
        timezone: timezoneOffset,
      },
      error: null,
      isCurrentLocation: true,
    });

    renderWithTheme(<WeatherCurrentCity />);

    expect(screen.getByTestId("city-name")).toHaveTextContent("Dublin");

    // Expect the time in 12-hour format with AM/PM
    expect(screen.getByTestId("time")).toHaveTextContent(localTime);
    expect(screen.getByTestId("date")).toHaveTextContent("Sunday, October 1");

    jest.restoreAllMocks();
  });

  test("does not render LocationIcon when there is an error", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        name: "Dublin",
        sys: { country: "IE" },
        timezone: 3600,
      },
      error: "Some error",
      isCurrentLocation: true,
    });

    renderWithTheme(<WeatherCurrentCity />);

    expect(screen.queryByTestId("location-icon")).toBeNull();
  });
});
