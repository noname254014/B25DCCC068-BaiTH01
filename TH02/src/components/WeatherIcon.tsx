import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { WeatherIconName } from '../types/weather';

const ICONS: Record<WeatherIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  sun: Sun,
  cloudSun: CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

interface WeatherIconProps {
  name: WeatherIconName;
  className?: string;
}

export default function WeatherIcon({ name, className }: WeatherIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
