import { SensorShort } from '@/stores/chart-controller-store';

interface Sensor {
  id: number;
  name: string;
  short: SensorShort;
  unit: string;
}

const sensors: Sensor[] = [
  {
    id: 1,
    name: 'Temperature',
    short: 'TP',
    unit: '°C',
  },
  {
    id: 2,
    name: 'Humidity',
    short: 'HD',
    unit: '%',
  },
  {
    id: 3,
    name: 'pH',
    short: 'PH',
    unit: 'pH',
  },
  {
    id: 4,
    name: 'Ground Humidity',
    short: 'GH',
    unit: '%',
  },
  {
    id: 5,
    name: 'Air Quality',
    short: 'AQ',
    unit: 'ppm',
  },
  {
    id: 6,
    name: 'Light',
    short: 'LT',
    unit: 'lux',
  },
];

export default sensors;
