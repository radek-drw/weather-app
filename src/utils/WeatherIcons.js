import {
    WiDaySunny,
    WiNightClear,
    WiCloud,
    WiCloudy,
    WiDayCloudy,
    WiNightAltCloudy,
    WiDayRain,
    WiNightAltRain,
    WiDayShowers,
    WiNightAltShowers,
    WiDaySnow,
    WiNightAltSnow,
    WiDayThunderstorm,
    WiNightAltThunderstorm,
    WiDayFog,
    WiNightFog,
  } from "react-icons/wi";
  
  // Map OpenWeatherMap icon codes to appropriate react-icons components
  export const weatherIcons = {
    "01d": WiDaySunny, // clear sky day
    "01n": WiNightClear, // clear sky night
    "02d": WiDayCloudy, // few clouds day
    "02n": WiNightAltCloudy, // few clouds night
    "03d": WiCloud, // scattered clouds day
    "03n": WiCloud, // scattered clouds night
    "04d": WiCloudy, // broken clouds day
    "04n": WiCloudy, // broken clouds night
    "09d": WiDayShowers, // shower rain day
    "09n": WiNightAltShowers, // shower rain night
    "10d": WiDayRain, // rain day
    "10n": WiNightAltRain, // rain night
    "11d": WiDayThunderstorm, // thunderstorm day
    "11n": WiNightAltThunderstorm, // thunderstorm night
    "13d": WiDaySnow, // snow day
    "13n": WiNightAltSnow, // snow night
    "50d": WiDayFog, // mist day
    "50n": WiNightFog, // mist night
  };
  