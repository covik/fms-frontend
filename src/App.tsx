import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  useTheme,
} from '@mui/material';

import {
  AccountTieHat,
  Bell,
  Cog,
  HammerWrench,
  Power,
  Truck,
  TruckTrailer,
} from 'mdi-material-ui';

const navigationItems = [
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

export function App() {
  const theme = useTheme();

  return (
    <>
      <Drawer anchor="left" variant="permanent">
        <List disablePadding>
          {navigationItems.map(({ id, icon }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton href="#" sx={{ padding: theme.spacing(2) }}>
                <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
