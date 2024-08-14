import React from "react";
import { useTranslation } from "react-i18next";

import { useWeather } from "../../WeatherContext";

import { weatherIcons } from "../../assets/weatherIcons";

import {
  BarometerIcon,
  CurrentTemp,
  DetailsCard,
  FeelsLikeTemp,
  HumidityIcon,
  Metric,
  MetricLabel,
  MetricValue,
  Panel,
  SkyCondIcon,
  SkyCondition,
  SunTwilight,
  SunriseIcon,
  SunsetIcon,
  VisibilityIcon,
  WindIcon,
} from "./WeatherDetails.styles";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
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

interface WeatherContextProps {
  weatherData: WeatherData | undefined;
  tempUnit: "metric" | "imperial";
}

const WeatherDetails: React.FC = () => {
  const { t } = useTranslation();
  const { weatherData, tempUnit } = useWeather() as WeatherContextProps;

  if (!weatherData) {
    return null;
  }

  const {
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    sys: { sunrise, sunset },
    visibility,
    timezone,
  } = weatherData;

  const weatherIconCode = weather[0].icon;
  const WeatherIconUrl =
    weatherIcons[weatherIconCode as keyof typeof weatherIcons];

  const roundedTemp = Math.round(temp);
  const roundedFeelsLike = Math.round(feels_like);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  // Convert sunrise and sunset times to localized time strings
  const sunriseTime = new Date((sunrise + timezone) * 1000).toLocaleTimeString(
    "en-GB",
    options
  );
  const sunsetTime = new Date((sunset + timezone) * 1000).toLocaleTimeString(
    "en-GB",
    options
  );

  return (
    <DetailsCard>
      {/* PANEL LEFT: Displays temperature, feels-like temperature, and sun timings */}
      <Panel>
        <div>
          <CurrentTemp>
            {roundedTemp}&deg;{tempUnit === "metric" ? "C" : "F"}
          </CurrentTemp>
          <FeelsLikeTemp>
            {t("labels.feelsLike")}:{" "}
            <span>
              {roundedFeelsLike}&deg;{tempUnit === "metric" ? "C" : "F"}
            </span>
          </FeelsLikeTemp>
        </div>
        <div>
          <SunTwilight>
            <SunriseIcon />
            <div>
              <p>{t("labels.sunrise")}</p>
              <span>{sunriseTime}</span>
            </div>
          </SunTwilight>
          <SunTwilight>
            <SunsetIcon />
            <div>
              <p>{t("labels.sunset")}</p>
              <span>{sunsetTime}</span>
            </div>
          </SunTwilight>
        </div>
      </Panel>

      {/* PANEL MIDDLE: Displays the current weather condition and icon */}
      <Panel>
        <SkyCondIcon src={WeatherIconUrl} alt={weather[0].main} />
        <SkyCondition>{weather[0].description}</SkyCondition>
      </Panel>

      {/* PANEL RIGHT: Displays additional weather metrics (humidity, wind speed, pressure, visibility) */}
      <Panel>
        <Metric>
          <HumidityIcon />
          <MetricValue>{humidity}%</MetricValue>
          <MetricLabel>{t("labels.humidity")}</MetricLabel>
        </Metric>
        <Metric>
          <WindIcon />
          <MetricValue>{Math.round(speed)} km/h</MetricValue>
          <MetricLabel>{t("labels.windSpeed")}</MetricLabel>
        </Metric>
        <Metric>
          <BarometerIcon />
          <MetricValue>{pressure} hPa</MetricValue>
          <MetricLabel>{t("labels.pressure")}</MetricLabel>
        </Metric>
        <Metric>
          <VisibilityIcon />
          <MetricValue>{visibility / 1000} km</MetricValue>
          <MetricLabel>{t("labels.visibility")}</MetricLabel>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;
