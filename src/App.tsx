import {
  Drawer,
  List,
  ListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
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

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export function App() {
  return (
    <>
      <Drawer anchor="left" variant="permanent">
        <List disablePadding>
          {navigationItems.map(({ id, title, icon }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
