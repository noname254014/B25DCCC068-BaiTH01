import { useEffect, useState } from 'react';

const STORAGE_KEY = 'baith02-weather-favorites';

function readFavorites(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // The app remains usable if storage is unavailable or full.
    }
  }, [favorites]);

  function toggleFavorite(cityId: string) {
    setFavorites((current) =>
      current.includes(cityId)
        ? current.filter((id) => id !== cityId)
        : [...current, cityId],
    );
  }

  return { favorites, toggleFavorite };
}