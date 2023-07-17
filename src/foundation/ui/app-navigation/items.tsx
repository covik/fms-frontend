import { Account, FileChart, Map, Truck } from 'mdi-material-ui';
import type { NavigationItems } from '#ui/molecules/navigation';

export const all: NavigationItems = [
  {
    to: '/',
    label: 'Karta',
    icon: <Map />,
  },
  {
    to: '/vehicles',
    label: 'Vozila',
    icon: <Truck />,
  },
  {
    to: '/reports/mileage',
    label: 'Izvještaji',
    icon: <FileChart />,
  },
  {
    to: '/account',
    label: 'Račun',
    icon: <Account />,
  },
];

export const DESKTOP_ITEMS = all;
export const MOBILE_ITEMS = all;
