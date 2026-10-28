import {
  Calendar,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from 'lucide-react';
import type { TemperatureUnit, WeatherResponse } from '../types/weather';
import { formatDay, formatTemperature, getWeatherCondition } from '../utils/weather';

const ICONS: Record<string, any> = {
  sun: Sun,
  cloudSun: CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

interface ForecastProps {
  data: WeatherResponse;
  unit: TemperatureUnit;
}

export default function Forecast({ data, unit }: ForecastProps) {
  return (
    <section
      className="rounded-xl border border-white/10 bg-slate-800 p-6"
      aria-label="Dự báo 7 ngày"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <Calendar className="h-4 w-4 text-blue-400" />
          Dự báo thời tiết 7 ngày
        </h3>
        <span className="text-xs text-slate-400">Đơn vị: °{unit === 'celsius' ? 'C' : 'F'}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {data.daily.time.slice(0, 7).map((dateStr, index) => {
          const condition = getWeatherCondition(data.daily.weather_code[index]);
          const { weekday, date } = formatDay(dateStr, index === 0);
          const maxTemp = formatTemperature(data.daily.temperature_2m_max[index], unit);
          const minTemp = formatTemperature(data.daily.temperature_2m_min[index], unit);
          const Icon = ICONS[condition.iconName];

          return (
            <div
              key={dateStr}
              className={`flex flex-col items-center justify-between gap-3 rounded-lg border p-3.5 text-center ${
                index === 0
                  ? 'border-blue-500 bg-blue-600/20'
                  : 'border-white/5 bg-slate-700'
              }`}
            >
              <div>
                <p className={`text-xs font-semibold ${index === 0 ? 'text-blue-300' : 'text-slate-300'}`}>{weekday}</p>
                <p className="text-[11px] text-slate-400">{date}</p>
              </div>
              <div className="my-1 rounded-lg bg-slate-600 p-2">
                <Icon className="h-7 w-7 text-blue-300" aria-hidden="true" />
              </div>
              <p className="line-clamp-1 text-[10px] font-medium text-slate-300" title={condition.label}>
                {condition.label}
              </p>
              <div className="flex w-full items-center justify-between border-t border-white/10 pt-2 text-xs">
                <span className="font-bold text-slate-100">{maxTemp}</span>
                <span className="text-slate-400">{minTemp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
