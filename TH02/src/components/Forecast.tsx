import { Calendar } from 'lucide-react';
import type { TemperatureUnit, WeatherResponse } from '../types/weather';
import { formatDay, formatTemperature, getWeatherCondition } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: WeatherResponse;
  unit: TemperatureUnit;
}

export default function Forecast({ data, unit }: ForecastProps) {
  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl"
      aria-label="Dự báo 7 ngày"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <Calendar className="h-4 w-4 text-cyan-400" />
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

          return (
            <div
              key={dateStr}
              className={`flex flex-col items-center justify-between gap-3 rounded-xl border p-3.5 text-center transition-all duration-300 ${
                index === 0
                  ? 'border-cyan-500/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/5'
                  : 'border-white/5 bg-slate-800/40 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <p className={`text-xs font-semibold ${index === 0 ? 'text-cyan-300' : 'text-slate-300'}`}>{weekday}</p>
                <p className="text-[11px] text-slate-400">{date}</p>
              </div>
              <div className="my-1 rounded-lg bg-white/5 p-2">
                <WeatherIcon name={condition.iconName} className="h-7 w-7 text-cyan-300" />
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
