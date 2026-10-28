import { describe, expect, it } from 'vitest';
import {
  convertTemperature,
  formatTemperature,
  getWeatherCondition,
  normalizeVietnamese,
} from './weather';

describe('getWeatherCondition', () => {
  it('maps clear, rain, and thunderstorm weather codes', () => {
    expect(getWeatherCondition(0).label).toBe('Trời quang');
    expect(getWeatherCondition(63).theme).toBe('rain');
    expect(getWeatherCondition(95).label).toBe('Dông');
  });
});

describe('temperature conversion', () => {
  it('converts Celsius to Fahrenheit without mutating source data', () => {
    expect(convertTemperature(0, 'fahrenheit')).toBe(32);
    expect(convertTemperature(100, 'fahrenheit')).toBe(212);
    expect(formatTemperature(25, 'celsius')).toBe('25°C');
    expect(formatTemperature(25, 'fahrenheit')).toBe('77°F');
  });
});

describe('normalizeVietnamese', () => {
  it('removes Vietnamese diacritics and ignores case', () => {
    expect(normalizeVietnamese('ĐÀ NẴNG')).toBe('da nang');
    expect(normalizeVietnamese('TP. Hồ Chí Minh')).toBe('tp. ho chi minh');
  });
});