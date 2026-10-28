import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CityList from './CityList';
import { CITIES } from '../data/cities';

describe('CityList', () => {
  it('renders all eight cities and selects a city when clicked', () => {
    const onSelect = vi.fn();
    render(<CityList cities={CITIES} selectedCityId={null} favorites={[]} onSelect={onSelect} onToggleFavorite={vi.fn()} />);
    expect(screen.getByText('Hà Nội')).toBeInTheDocument();
    expect(screen.getByText('Cần Thơ')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Thêm yêu thích/ })).toHaveLength(8);
    fireEvent.click(screen.getByRole('button', { name: /Đà Nẵng\s+Miền Trung/ }));
    expect(onSelect).toHaveBeenCalledWith(CITIES.find((city) => city.id === 'da-nang'));
  });

  it('searches city names without Vietnamese diacritics', () => {
    render(<CityList cities={CITIES} selectedCityId={null} favorites={[]} onSelect={vi.fn()} onToggleFavorite={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Tìm thành phố' }), { target: { value: 'da nang' } });
    expect(screen.getByText('Đà Nẵng')).toBeInTheDocument();
    expect(screen.queryByText('Hà Nội')).not.toBeInTheDocument();
  });
});