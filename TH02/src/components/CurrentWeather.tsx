import { Droplets, MapPin, RefreshCw, Star, Wind } from 'lucide-react';
import type { City, TemperatureUnit, WeatherResponse } from '../types/weather';
import { formatTemperature, formatUpdatedAt, getWeatherCondition } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  city: City;
  data: WeatherResponse;
  unit: TemperatureUnit;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export default function CurrentWeather({ city, data, unit, favorite, onToggleFavorite }: CurrentWeatherProps) {
  const condition = getWeatherCondition(data.current.weather_code);

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-white/15 p-6 shadow-2xl backdrop-blur-xl md:p-8 ${condition.bgClass}`}
      aria-label="Thời tiết hiện tại"
    >
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
              {city.region}
            </span>
            <button
              onClick={onToggleFavorite}
              className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
              aria-label={favorite ? 'Bỏ yêu thích thành phố' : 'Yêu thích thành phố'}
              aria-pressed={favorite}
            >
              <Star className={`h-3.5 w-3.5 ${favorite ? 'fill-amber-400' : ''}`} />
              {favorite ? 'Đã thích' : 'Lưu yêu thích'}
            </button>
          </div>

          <h2 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <MapPin className="h-6 w-6 text-cyan-300" />
            {city.name}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-300">
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
            Cập nhật: <span className="font-medium text-slate-100">{formatUpdatedAt(data.current.time)}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-inner backdrop-blur-md">
            <WeatherIcon name={condition.iconName} className="h-16 w-16 text-cyan-200 drop-shadow-md sm:h-20 sm:w-20" />
          </div>
          <div>
            <div className="text-5xl font-black tracking-tight text-white sm:text-6xl">
              {formatTemperature(data.current.temperature_2m, unit)}
            </div>
            <p className="mt-1 text-base font-semibold text-cyan-200" aria-label={condition.label}>
              {condition.label}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
        <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-slate-900/40 p-3.5">
          <div className="rounded-lg bg-blue-500/20 p-2.5 text-blue-400">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Độ ẩm</p>
            <p className="text-lg font-bold text-slate-100">{data.current.relative_humidity_2m}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-slate-900/40 p-3.5">
          <div className="rounded-lg bg-cyan-500/20 p-2.5 text-cyan-400">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Tốc độ gió</p>
            <p className="text-lg font-bold text-slate-100">
              {Math.round(data.current.wind_speed_10m)}{' '}
              <span className="text-xs font-normal text-slate-400">km/h</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
