import { CloudSun } from 'lucide-react';
import { useState } from 'react';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherStates from './components/WeatherStates';
import { CITIES } from './data/cities';
import { useFavorites } from './hooks/useFavorites';
import { useWeather } from './hooks/useWeather';
import type { City, TemperatureUnit } from './types/weather';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const { favorites, toggleFavorite } = useFavorites();
  const { data, status, error, retry } = useWeather(selectedCity);

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-800 px-4 py-3 lg:px-8">
        <button
          className="flex items-center space-x-3 text-left"
          onClick={() => setSelectedCity(null)}
          aria-label="Khí Tượng - Trang chủ"
        >
          <div className="rounded-xl bg-blue-500 p-2">
            <CloudSun className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Khí Tượng
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">Dự báo thời tiết Việt Nam</p>
          </div>
        </button>

        <div className="flex items-center rounded-xl border border-white/10 bg-slate-700 p-1" role="group" aria-label="Đơn vị nhiệt độ">
          <button
            onClick={() => setUnit('celsius')}
            aria-pressed={unit === 'celsius'}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              unit === 'celsius' ? 'bg-blue-500 text-white' : 'text-slate-400'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('fahrenheit')}
            aria-pressed={unit === 'fahrenheit'}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              unit === 'fahrenheit' ? 'bg-blue-500 text-white' : 'text-slate-400'
            }`}
          >
            °F
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <CityList
              cities={CITIES}
              selectedCityId={selectedCity?.id ?? null}
              favorites={favorites}
              onSelect={setSelectedCity}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          <section className="flex flex-col gap-6 md:col-span-8" aria-label="Thông tin thời tiết">
            {status !== 'success' || !selectedCity || !data ? (
              <WeatherStates
                status={status}
                cityName={selectedCity?.name}
                error={error}
                onRetry={retry}
                cities={CITIES}
                onSelectCity={setSelectedCity}
              />
            ) : (
              <div className="flex flex-col gap-6">
                <CurrentWeather
                  city={selectedCity}
                  data={data}
                  unit={unit}
                  favorite={favorites.includes(selectedCity.id)}
                  onToggleFavorite={() => toggleFavorite(selectedCity.id)}
                />
                <Forecast data={data} unit={unit} />
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-slate-800 px-4 py-4 text-center text-xs text-slate-400">
        <p>Bài thực hành TH02 - Lập trình Web React TypeScript</p>
      </footer>
    </div>
  );
}
