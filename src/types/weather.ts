export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region: string;
  aliases?: string[];
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyWeather;
  timezone: string;
  timezone_abbreviation?: string;
  utc_offset_seconds?: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeatherIconName =
  | 'sun'
  | 'cloudSun'
  | 'cloud'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm';

export interface WeatherCondition {
  label: string;
  icon: string;
  iconName: WeatherIconName;
}
