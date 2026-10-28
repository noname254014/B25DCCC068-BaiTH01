import { Heart, MapPin, Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
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

  const visibleCities = useMemo(() => {
    const normalizedQuery = normalizeVietnamese(query);
    return cities.filter((city) => {
      const haystack = normalizeVietnamese(
        `${city.name} ${city.region} ${(city.aliases ?? []).join(' ')}`,
      );
      const matchesQuery = haystack.includes(normalizedQuery);
      return matchesQuery && (!favoritesOnly || favorites.includes(city.id));
    });
  }, [cities, favorites, favoritesOnly, query]);

  return (
    <section
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
      aria-label="Danh sách thành phố"
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-200">
          <MapPin className="h-4 w-4 text-cyan-400" />
          Thành phố ({cities.length})
        </h2>
        <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[11px] font-semibold text-cyan-200">
          {visibleCities.length}/8
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm thành phố (ví dụ: ha noi, da nang)..."
          aria-label="Tìm thành phố"
          className="w-full rounded-xl border border-slate-700/60 bg-slate-800/80 py-2 pl-9 pr-12 text-sm text-slate-100 placeholder-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
        className={`flex items-center gap-2 text-xs transition ${
          favoritesOnly ? 'text-amber-300' : 'text-slate-400 hover:text-slate-200'
        }`}
        onClick={() => setFavoritesOnly((value) => !value)}
        aria-pressed={favoritesOnly}
      >
        <Heart size={15} fill={favoritesOnly ? 'currentColor' : 'none'} />
        Chỉ xem yêu thích
      </button>

      <div className="custom-scrollbar flex max-h-[500px] flex-col gap-2 overflow-y-auto pr-1 md:max-h-[calc(100vh-250px)]">
        {visibleCities.map((city) => {
          const selected = city.id === selectedCityId;
          const favorite = favorites.includes(city.id);
          return (
            <div
              key={city.id}
              className={`group relative flex items-center justify-between rounded-xl border p-3.5 transition-all duration-300 ${
                selected
                  ? 'translate-x-1 border-cyan-400/80 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 shadow-lg shadow-cyan-500/10'
                  : 'border-white/5 bg-slate-800/40 hover:border-white/10 hover:bg-slate-800/80'
              }`}
            >
              <button
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={() => onSelect(city)}
                aria-pressed={selected}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    selected ? 'bg-cyan-400 ring-4 ring-cyan-400/20' : 'bg-slate-600 group-hover:bg-slate-400'
                  }`}
                />
                <span className="min-w-0">
                  <strong className={`block text-sm font-medium ${selected ? 'font-semibold text-cyan-300' : 'text-slate-200'}`}>
                    {city.name}
                  </strong>
                  <small className="text-[11px] text-slate-400">{city.region}</small>
                </span>
              </button>
              <button
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700/50 hover:text-amber-400"
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
          <div className="rounded-xl bg-slate-800/30 p-6 text-center text-sm text-slate-400">
            Không tìm thấy thành phố phù hợp.
          </div>
        )}
      </div>
      <p className="border-t border-white/10 pt-3 text-[10px] text-slate-500">Dữ liệu dự báo từ Open-Meteo</p>
    </section>
  );
}
