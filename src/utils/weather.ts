import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from 'lucide-react';
import type { TemperatureUnit, WeatherCondition, WeatherIconName } from '../types/weather';

export const ICONS: Record<WeatherIconName, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  cloudSun: CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) {
    return {
      label: 'Trời quang',
      icon: '☀️',
      iconName: 'sun',
    };
  }
  if (code === 1) {
    return {
      label: 'Ít mây',
      icon: '🌤️',
      iconName: 'cloudSun',
    };
  }
  if (code === 2) {
    return {
      label: 'Có mây rải rác',
      icon: '⛅',
      iconName: 'cloudSun',
    };
  }
  if (code === 3) {
    return {
      label: 'Nhiều mây',
      icon: '☁️',
      iconName: 'cloud',
    };
  }
  if ([45, 48].includes(code)) {
    return {
      label: 'Sương mù',
      icon: '🌫️',
      iconName: 'fog',
    };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: 'Mưa phùn',
      icon: '🌦️',
      iconName: 'drizzle',
    };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: 'Có mưa',
      icon: '🌧️',
      iconName: 'rain',
    };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: 'Có tuyết',
      icon: '❄️',
      iconName: 'snow',
    };
  }
  if ([95, 96, 99].includes(code)) {
    return {
      label: 'Dông',
      icon: '⛈️',
      iconName: 'storm',
    };
  }
  return {
    label: 'Chưa xác định',
    icon: '🌡️',
    iconName: 'cloudSun',
  };
}

export function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius;
}

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  return `${Math.round(convertTemperature(celsius, unit))}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function normalizeVietnamese(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase('vi-VN')
    .trim();
}

export function formatDay(dateString: string, today = false): { weekday: string; date: string } {
  const date = new Date(`${dateString}T12:00:00`);
  const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return {
    weekday: today ? 'Hôm nay' : weekdays[date.getDay()],
    date: new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(date),
  };
}

export function formatUpdatedAt(dateTime: string): string {
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) return dateTime.replace('T', ' ');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
