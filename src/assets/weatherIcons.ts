import sunnyDayIcon from './icons/sunny_day.svg';
import clearNightIcon from './icons/clear_night.svg';
import fewCloudsDayIcon from './icons/few_clouds_day.svg';
import fewCloudsNightIcon from './icons/few_clouds_night.svg';
import scatteredCloudsIcon from './icons/scattered_clouds.svg';
import brokenCloudsIcon from './icons/broken_clouds.svg';
import showerRainDayIcon from './icons/shower_rain_day.svg';
import showerRainNightIcon from './icons/shower_rain_night.svg';
import rainIcon from './icons/rain.svg';
import thunderstormDayIcon from './icons/thunderstorm_day.svg';
import thunderstormNightIcon from './icons/thunderstorm_night.svg';
import snowIcon from './icons/snow.svg';
import mistIcon from './icons/mist.svg';

// Define a type for the weather icon keys
type WeatherIconKey = 
  | "01d" | "01n" | "02d" | "02n" | "03d" | "03n" | "04d" | "04n"
  | "09d" | "09n" | "10d" | "10n" | "11d" | "11n" | "13d" | "13n"
  | "50d" | "50n";

// Define the type for the weatherIcons object
type WeatherIcons = {
  [key in WeatherIconKey]: string;
};

export const weatherIcons: WeatherIcons = {
  "01d": sunnyDayIcon, 
  "01n": clearNightIcon, 
  "02d": fewCloudsDayIcon, 
  "02n": fewCloudsNightIcon,
  "03d": scatteredCloudsIcon, 
  "03n": scatteredCloudsIcon, 
  "04d": brokenCloudsIcon,
  "04n": brokenCloudsIcon,
  "09d": showerRainDayIcon,
  "09n": showerRainNightIcon, 
  "10d": rainIcon,
  "10n": rainIcon,
  "11d": thunderstormDayIcon, 
  "11n": thunderstormNightIcon, 
  "13d": snowIcon, 
  "13n": snowIcon, 
  "50d": mistIcon, 
  "50n": mistIcon, 
};