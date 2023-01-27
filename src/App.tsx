import {
  Box,
  Divider,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
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

import logo from './assets/logo.svg';
import { VehicleOverviewPage } from './VehicleOverviewPage';

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

  const logoSize = 34;
  const logoSpacing = theme.spacing(1);
  const itemSpacing = theme.spacing(2);

  return (
    <>
      <Drawer anchor="left" variant="permanent">
        <List disablePadding>
          <ListItem sx={{ padding: logoSpacing, justifyContent: 'center' }}>
            <img src={logo} alt="logo" width={logoSize} />
          </ListItem>
          <Divider />
          {navigationItems.map(({ id, title, icon }) => (
            <ListItem key={id} disablePadding>
              <Tooltip
                title={title}
                placement="right"
                TransitionComponent={Fade}
              >
                <ListItemButton
                  href="#"
                  sx={{ padding: itemSpacing, justifyContent: 'center' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ marginLeft: '57px' }}>
        <VehicleOverviewPage />
      </Box>
    </>
  );
}
