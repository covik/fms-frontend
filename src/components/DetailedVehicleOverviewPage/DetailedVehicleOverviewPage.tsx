import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { Map } from '../Map/Map';
import { CarBattery, Navigation, SpeedometerMedium } from 'mdi-material-ui';

export interface DetailedVehicleOverviewPageAttributes {
  activeTab: 'live-updates' | 'info' | 'routes' | 'maintenance';
}

export function DetailedVehicleOverviewPage({
  activeTab = 'live-updates',
}: DetailedVehicleOverviewPageAttributes) {
  const theme = useTheme();

  const tabs = [
    {
      id: 'live-updates',
      children: (
        <Card sx={{ height: '100%' }}>
          <Map
            x={44.698832}
            y={16.373162}
            z={6}
            width="100%"
            height="100%"
            noControls
          />
        </Card>
      ),
    },
    {
      id: 'info',
      children: (
        <Card sx={{ height: 'auto' }}>
          <List disablePadding dense>
            <ListItem divider>
              <ListItemIcon>
                <Navigation />
              </ListItemIcon>
              <ListItemText primary="Kretanje" secondary="U pokretu" />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <SpeedometerMedium />
              </ListItemIcon>
              <ListItemText primary="Brzina" secondary="10 km/h" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CarBattery />
              </ListItemIcon>
              <ListItemText primary="Baterija" secondary="24.52 V" />
            </ListItem>
          </List>
        </Card>
      ),
    },
  ];

  return (
    <Box
      sx={{
        padding: theme.spacing(1.4),
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Typography
          component="h1"
          variant="h4"
          color="grey"
          fontWeight="medium"
          lineHeight={1}
        >
          ZD001AA
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 0.5, marginBottom: 1.4 }}>
        {tabs.map(({ id, children }) => {
          if (id === activeTab) return children;
          else return null;
        })}
      </Box>
      <Card sx={{ flexGrow: 0 }}>
        <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
          <Tab value="live-updates" label="Karta" />
          <Tab value="info" label="Info" />
          <Tab value="routes" label="Rute" />
          <Tab value="maintenance" label="Servisi" />
        </Tabs>
      </Card>
    </Box>
  );
}
