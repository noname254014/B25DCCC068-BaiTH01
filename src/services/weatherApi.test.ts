import { afterEach, describe, expect, it, vi } from 'vitest';
import { CITIES } from '../data/cities';
import { fetchWeather } from './weatherApi';

afterEach(() => vi.restoreAllMocks());

const mockResponse = {
  current: {
    time: '2026-10-28T09:00',
    temperature_2m: 28,
    relative_humidity_2m: 70,
    weather_code: 1,
    wind_speed_10m: 12,
  },
  daily: {
    time: ['2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02', '2026-11-03'],
    weather_code: [1, 2, 3, 61, 0, 95, 3],
    temperature_2m_max: [30, 31, 29, 28, 32, 27, 29],
    temperature_2m_min: [24, 25, 23, 22, 24, 21, 22],
  },
  timezone: 'Asia/Ho_Chi_Minh',
};

describe('fetchWeather', () => {
  it('requests Open-Meteo with the expected city and seven-day fields', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );
    const result = await fetchWeather(CITIES[0]);
    expect(fetchMock).toHaveBeenCalledOnce();
    const url = new URL(String(fetchMock.mock.calls[0][0]));
    expect(url.hostname).toBe('api.open-meteo.com');
    expect(url.searchParams.get('latitude')).toBe('21.0285');
    expect(url.searchParams.get('forecast_days')).toBe('7');
    expect(result.daily.time).toHaveLength(7);
  });

  it('throws a readable error for HTTP failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 503 }));
    await expect(fetchWeather(CITIES[0])).rejects.toThrow('HTTP 503');
  });

  it('returns parsed weather data on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );
    const result = await fetchWeather(CITIES[0]);
    expect(result.current.temperature_2m).toBe(28);
    expect(result.current.weather_code).toBe(1);
    expect(result.daily.time).toHaveLength(7);
  });
});