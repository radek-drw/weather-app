import React from "react";
import { render } from "@testing-library/react";
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
});
