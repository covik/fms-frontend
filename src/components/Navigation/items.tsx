import {
  AccountTieHat,
  Bell,
  Cog,
  HammerWrench,
  Power,
  Truck,
  TruckTrailer,
} from 'mdi-material-ui';

export const all = [
  {
    id: 'vehicles',
    title: 'Vozila',
    icon: <Truck />,
  },
  {
    id: 'trailers',
    title: 'Prikolice',
    icon: <TruckTrailer />,
  },
  {
    id: 'drivers',
    title: 'Vozači',
    icon: <AccountTieHat />,
  },
  {
    id: 'servicing',
    title: 'Servisi',
    icon: <HammerWrench />,
  },
  {
    id: 'notifications',
    title: 'Obavijesti',
    icon: <Bell />,
  },
  {
    id: 'settings',
    title: 'Postavke',
    icon: <Cog />,
  },
  {
    id: 'logout',
    title: 'Odjava',
    icon: <Power />,
  },
];
