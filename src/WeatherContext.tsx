import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY as string;

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  timezone: number;
  additionalDetails?: object;
  coordinates?: { lon: number; lat: number };
}

interface ForecastData {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number; deg: number };
}

interface WeatherContextProps {
  weatherData: WeatherData | undefined;
  forecastData: ForecastData[];
  loading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isCurrentLocation: boolean;
  fetchWeatherData: (
    city: string,
    additionalDetails?: object,
    coordinates?: { lon: number; lat: number } | null
  ) => Promise<void>;
  fetchWeatherByCoordinates: (
    latitude: number,
    longitude: number
  ) => Promise<void>;
  tempUnit: string;
  toggleTempUnit: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [tempUnit, setTempUnit] = useState("metric");

  const { t, i18n } = useTranslation();

  // Helper function to fetch data from OpenWeatherMap API
  const fetchFromApi = async (endpoint: string, params: object) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/${endpoint}`,
        {
          params: {
            ...params,
            appid: apiKey,
            units: tempUnit,
            lang: i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(t("errors.cityNotFound"));
      } else {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error(String(error));
        }
      }
    }
  };

  const fetchWeatherData = async (
    city: string,
    additionalDetails: object = {},
    coordinates: { lon: number; lat: number } | null = null
  ) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(false);
    try {
      const data: WeatherData = await fetchFromApi("weather", { q: city });
      setWeatherData({
        ...data,
        additionalDetails,
        coordinates: coordinates || data.coord,
      });
      fetchForecastData(city);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (city: string) => {
    try {
      const data: { list: ForecastData[] } = await fetchFromApi("forecast", {
        q: city,
      });
      setForecastData(data.list);
    } catch (error) {
      setError(t("errors.fetchForecast"));
    }
  };

  const fetchWeatherByCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    setLoading(true);
    setError(null);
    setIsCurrentLocation(true);
    try {
      const data: WeatherData = await fetchFromApi("weather", {
        lat: latitude,
        lon: longitude,
      });
      setWeatherData(data);
      fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      setError(t("errors.fetchWeatherByCoordinates"));
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const data: { list: ForecastData[] } = await fetchFromApi("forecast", {
        lat: latitude,
        lon: longitude,
      });
      setForecastData(data.list);
    } catch (error) {
      setError(t("errors.fetchForecastByCoordinates"));
    }
  };

  // Effect hook to fetch weather data for the user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(t("errors.geolocationFailure"));
        }
      );
    } else {
      setError(t("errors.geolocationUnavailable"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTempUnit = () => {
    const newTempUnit = tempUnit === "metric" ? "imperial" : "metric";

    const convertTemperature = (temp: number) => {
      return newTempUnit === "metric"
        ? ((temp - 32) * 5) / 9 // Fahrenheit to Celsius
        : (temp * 9) / 5 + 32; // Celsius to Fahrenheit
    };

    // Update weather data with converted temperatures
    setWeatherData((prevState) =>
      prevState
        ? {
            ...prevState,
            main: {
              ...prevState.main,
              temp: convertTemperature(prevState.main.temp),
              feels_like: convertTemperature(prevState.main.feels_like),
            },
          }
        : undefined
    );

    // Update forecast data with converted temperatures
    setForecastData((prevState) =>
      prevState.map((item) => ({
        ...item,
        main: {
          ...item.main,
          temp_min: convertTemperature(item.main.temp_min),
          temp_max: convertTemperature(item.main.temp_max),
          temp: convertTemperature(item.main.temp),
        },
      }))
    );

    setTempUnit(newTempUnit);
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        setError,
        isCurrentLocation,
        fetchWeatherData,
        fetchWeatherByCoordinates,
        tempUnit,
        toggleTempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
