import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCurrentCity from "./WeatherCurrentCity";
import { useWeather } from "../../WeatherContext";

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

  test("renders without crashing when weatherData is not available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: null,
      error: null,
      isCurrentLocation: false,
    });

    const { container } = render(<WeatherCurrentCity />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders city name, time, and date when weatherData is available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        name: "Dublin",
        sys: { country: "IE" },
        timezone: 3600, // UTC+1
      },
      error: null,
      isCurrentLocation: true,
    });

    expect(screen.getByText("Dublin")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("Sunday, 1 October")).toBeInTheDocument();
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

    expect(screen.queryByTestId("location-icon")).toBeNull();
  });

  test("renders additional details when available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        name: "Dublin",
        sys: { country: "IE" },
        timezone: 3600,
        additionalDetails: {
          county: "County Dublin",
          state: "Ireland",
        },
      },
      error: null,
      isCurrentLocation: true,
    });

    expect(
      screen.getByText("Dublin, County Dublin, Ireland, IE")
    ).toBeInTheDocument();
  });
});
