import { AlertCircle, Compass, RefreshCw } from 'lucide-react';
import type { City } from '../types/weather';

interface WeatherStatesProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  cityName?: string;
  error?: string;
  onRetry: () => void;
  cities?: City[];
  onSelectCity?: (city: City) => void;
}

export default function WeatherStates({
  status,
  cityName,
  error,
  onRetry,
  cities = [],
  onSelectCity,
}: WeatherStatesProps) {
  if (status === 'idle') {
    return (
      <div
        className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center backdrop-blur-xl"
        role="status"
      >
        <div className="animate-bounce rounded-full border border-cyan-500/20 bg-cyan-500/10 p-4">
          <Compass className="h-12 w-12 text-cyan-400" />
        </div>
        <div className="max-w-md">
          <h3 className="mb-2 text-xl font-bold text-slate-200">Chưa chọn thành phố</h3>
          <p className="mb-6 text-sm text-slate-400">
            Vui lòng chọn 1 trong 8 thành phố Việt Nam ở danh sách bên cạnh để xem dự báo thời tiết chi tiết.
          </p>
          {onSelectCity && (
            <div className="flex flex-wrap justify-center gap-2">
              {cities.slice(0, 4).map((city) => (
                <button
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  className="rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-700"
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div
        className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-12 backdrop-blur-xl"
        role="status"
        aria-live="polite"
      >
        <RefreshCw className="h-10 w-10 animate-spin text-cyan-400" />
        <p className="animate-pulse text-sm font-medium text-slate-300">
          Đang tải dữ liệu thời tiết cho {cityName}...
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="flex min-h-[350px] flex-col items-center justify-center gap-4 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-8 text-center backdrop-blur-xl"
        role="alert"
      >
        <div className="rounded-full bg-rose-500/20 p-3 text-rose-400">
          <AlertCircle className="h-10 w-10" />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-rose-200">Xảy ra lỗi tải dữ liệu</h3>
          <p className="max-w-md text-sm text-rose-300/80">{error || 'Đã xảy ra lỗi. Vui lòng thử lại.'}</p>
        </div>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Thử lại
        </button>
      </div>
    );
  }

  return null;
}
