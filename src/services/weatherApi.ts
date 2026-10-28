import type { City, WeatherResponse } from '../types/weather';

const API_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(city: City, signal?: AbortSignal): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  });

  const response = await fetch(`${API_BASE}?${params.toString()}`, { signal });
  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu thời tiết (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!isWeatherResponse(data)) {
    throw new Error('Dữ liệu thời tiết nhận được không đúng định dạng.');
  }
  return data;
}

function isWeatherResponse(value: unknown): value is WeatherResponse {
  if (typeof value !== 'object' || value === null) return false;
  const data = value as Partial<WeatherResponse>;
  const current = data.current;
  const daily = data.daily;
  return Boolean(
    current &&
      typeof current.time === 'string' &&
      typeof current.temperature_2m === 'number' &&
      typeof current.relative_humidity_2m === 'number' &&
      typeof current.weather_code === 'number' &&
      typeof current.wind_speed_10m === 'number' &&
      daily &&
      Array.isArray(daily.time) &&
      Array.isArray(daily.weather_code) &&
      Array.isArray(daily.temperature_2m_max) &&
      Array.isArray(daily.temperature_2m_min) &&
      daily.time.length >= 7 &&
      daily.weather_code.length >= 7 &&
      daily.temperature_2m_max.length >= 7 &&
      daily.temperature_2m_min.length >= 7,
  );
}