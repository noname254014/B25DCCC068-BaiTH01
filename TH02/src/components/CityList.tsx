import { Heart, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';
import type { City } from '../types/weather';
import { normalizeVietnamese } from '../utils/weather';

interface CityListProps {
  cities: City[];
  selectedCityId: string | null;
  favorites: string[];
  onSelect: (city: City) => void;
  onToggleFavorite: (cityId: string) => void;
}

export default function CityList({
  cities,
  selectedCityId,
  favorites,
  onSelect,
  onToggleFavorite,
}: CityListProps) {
  const [query, setQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const visibleCities = cities.filter((city) => {
    const normalizedQuery = normalizeVietnamese(query);
    const haystack = normalizeVietnamese(
      `${city.name} ${city.region} ${(city.aliases ?? []).join(' ')}`,
    );
    const matchesQuery = haystack.includes(normalizedQuery);
    return matchesQuery && (!favoritesOnly || favorites.includes(city.id));
  });

  return (
    <section
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-800 p-4"
      aria-label="Danh sách thành phố"
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-200">
          <MapPin className="h-4 w-4 text-blue-400" />
          Thành phố ({cities.length})
        </h2>
        <span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2 py-1 text-[11px] font-semibold text-blue-200">
          {visibleCities.length}/8
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm thành phố..."
          aria-label="Tìm thành phố"
          className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 pl-9 pr-12 text-sm text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            onClick={() => setQuery('')}
            aria-label="Xóa tìm kiếm"
          >
            Xóa
          </button>
        )}
      </div>

      <button
        className={`flex items-center gap-2 text-xs ${
          favoritesOnly ? 'text-amber-300' : 'text-slate-400'
        }`}
        onClick={() => setFavoritesOnly((value) => !value)}
        aria-pressed={favoritesOnly}
      >
        <Heart size={15} fill={favoritesOnly ? 'currentColor' : 'none'} />
        Chỉ xem yêu thích
      </button>

      <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto pr-1 md:max-h-[calc(100vh-250px)]">
        {visibleCities.map((city) => {
          const selected = city.id === selectedCityId;
          const favorite = favorites.includes(city.id);
          return (
            <div
              key={city.id}
              className={`flex items-center justify-between rounded-lg border p-3 ${
                selected
                  ? 'border-blue-500 bg-blue-600/20'
                  : 'border-white/5 bg-slate-700'
              }`}
            >
              <button
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={() => onSelect(city)}
                aria-pressed={selected}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    selected ? 'bg-blue-400' : 'bg-slate-500'
                  }`}
                />
                <span className="min-w-0">
                  <strong className={`block text-sm font-medium ${selected ? 'text-blue-300' : 'text-slate-200'}`}>
                    {city.name}
                  </strong>
                  <small className="text-[11px] text-slate-400">{city.region}</small>
                </span>
              </button>
              <button
                className="rounded-lg p-1.5 text-slate-400 hover:text-amber-400"
                onClick={() => onToggleFavorite(city.id)}
                aria-label={`${favorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'} ${city.name}`}
                aria-pressed={favorite}
                title={favorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
              >
                <Star className={`h-4 w-4 ${favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>
          );
        })}
        {visibleCities.length === 0 && (
          <div className="rounded-lg bg-slate-700 p-6 text-center text-sm text-slate-400">
            Không tìm thấy thành phố phù hợp.
          </div>
        )}
      </div>
      <p className="border-t border-white/10 pt-3 text-[10px] text-slate-500">Dữ liệu từ Open-Meteo</p>
    </section>
  );
}
