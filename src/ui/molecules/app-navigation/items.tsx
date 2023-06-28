import { Account, Map, Truck } from 'mdi-material-ui';
import type { NavigationItems } from '#ui/molecules';

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
    to: '/account',
    label: 'Račun',
    icon: <Account />,
  },
];

export const DESKTOP_ITEMS = all;
export const MOBILE_ITEMS = all;
