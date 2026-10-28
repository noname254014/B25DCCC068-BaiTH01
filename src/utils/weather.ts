import type { TemperatureUnit, WeatherCondition } from '../types/weather';

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) {
    return {
      label: 'Trời quang',
      icon: '☀️',
      iconName: 'sun',
      theme: 'clear',
      gradient: 'from-amber-400 via-orange-400 to-sky-500',
      bgClass: 'bg-gradient-to-br from-amber-500/20 to-sky-600/30',
    };
  }
  if (code === 1) {
    return {
      label: 'Ít mây',
      icon: '🌤️',
      iconName: 'cloudSun',
      theme: 'clear',
      gradient: 'from-blue-400 via-sky-400 to-indigo-500',
      bgClass: 'bg-gradient-to-br from-sky-400/20 to-indigo-600/30',
    };
  }
  if (code === 2) {
    return {
      label: 'Có mây rải rác',
      icon: '⛅',
      iconName: 'cloudSun',
      theme: 'cloudy',
      gradient: 'from-blue-400 via-sky-400 to-indigo-500',
      bgClass: 'bg-gradient-to-br from-sky-400/20 to-indigo-600/30',
    };
  }
  if (code === 3) {
    return {
      label: 'Nhiều mây',
      icon: '☁️',
      iconName: 'cloud',
      theme: 'cloudy',
      gradient: 'from-slate-400 via-gray-500 to-slate-700',
      bgClass: 'bg-gradient-to-br from-slate-500/20 to-gray-700/30',
    };
  }
  if ([45, 48].includes(code)) {
    return {
      label: 'Sương mù',
      icon: '🌫️',
      iconName: 'fog',
      theme: 'fog',
      gradient: 'from-teal-400 via-slate-400 to-gray-600',
      bgClass: 'bg-gradient-to-br from-teal-500/20 to-slate-700/30',
    };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: 'Mưa phùn',
      icon: '🌦️',
      iconName: 'drizzle',
      theme: 'rain',
      gradient: 'from-cyan-500 via-blue-500 to-slate-600',
      bgClass: 'bg-gradient-to-br from-cyan-500/20 to-blue-700/30',
    };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: 'Có mưa',
      icon: '🌧️',
      iconName: 'rain',
      theme: 'rain',
      gradient: 'from-blue-600 via-indigo-600 to-slate-800',
      bgClass: 'bg-gradient-to-br from-blue-600/20 to-indigo-800/30',
    };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: 'Có tuyết',
      icon: '❄️',
      iconName: 'snow',
      theme: 'snow',
      gradient: 'from-indigo-300 via-sky-300 to-slate-500',
      bgClass: 'bg-gradient-to-br from-sky-300/20 to-indigo-500/30',
    };
  }
  if ([95, 96, 99].includes(code)) {
    return {
      label: 'Dông',
      icon: '⛈️',
      iconName: 'storm',
      theme: 'storm',
      gradient: 'from-purple-700 via-indigo-800 to-slate-900',
      bgClass: 'bg-gradient-to-br from-purple-800/30 to-slate-950/50',
    };
  }
  return {
    label: 'Chưa xác định',
    icon: '🌡️',
    iconName: 'cloudSun',
    theme: 'cloudy',
    gradient: 'from-blue-500 via-indigo-500 to-slate-700',
    bgClass: 'bg-gradient-to-br from-blue-500/20 to-slate-700/30',
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
