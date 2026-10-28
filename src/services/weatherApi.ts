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

  const data = (await response.json()) as WeatherResponse;
  return data;
}