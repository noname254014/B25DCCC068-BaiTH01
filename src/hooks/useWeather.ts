import { useCallback, useEffect, useState } from 'react';
import type { City, WeatherResponse } from '../types/weather';
import { fetchWeather } from '../services/weatherApi';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useWeather(city: City | null) {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const load = useCallback(async (selectedCity: City, signal: AbortSignal) => {
    setStatus('loading');
    setError('');
    try {
      const result = await fetchWeather(selectedCity, signal);
      if (!signal.aborted) {
        setData(result);
        setStatus('success');
      }
    } catch (err) {
      if (signal.aborted) return;
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (!city) {
      setData(null);
      setStatus('idle');
      setError('');
      return;
    }
    const controller = new AbortController();
    void load(city, controller.signal);
    return () => controller.abort();
  }, [city, load]);

  const retry = useCallback(() => {
    if (!city) return;
    const controller = new AbortController();
    void load(city, controller.signal);
  }, [city, load]);

  return { data, status, error, retry };
}