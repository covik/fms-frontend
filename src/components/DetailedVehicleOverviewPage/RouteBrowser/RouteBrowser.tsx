import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  BedClock,
  CarClock,
  ClockOutline,
  MapMarkerDistance,
  Speedometer,
  SpeedometerMedium,
} from 'mdi-material-ui';
import { Map } from '../../Map/Map';
import { RouteFilter } from './RouteFilter';

export function RouteBrowser() {
  return (
    <Box>
      <RouteFilter view="today" />
      <Card sx={{ height: '40vw', minHeight: '200px', marginTop: 2 }}>
        <Map
          x={44.698832}
          y={16.373162}
          z={6}
          width="100%"
          height="100%"
          noControls
        />
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <CarClock />
            </ListItemIcon>
            <ListItemText primary="Vožnja" secondary="9h" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BedClock />
            </ListItemIcon>
            <ListItemText primary="Stajanje" secondary="45min" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ClockOutline />
            </ListItemIcon>
            <ListItemText primary="Ukupno" secondary="9h 45m" />
          </ListItem>
        </List>
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <MapMarkerDistance />
            </ListItemIcon>
            <ListItemText primary="Prijeđena udaljenost" secondary="270 km" />
          </ListItem>
        </List>
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <Speedometer />
            </ListItemIcon>
            <ListItemText primary="Najveća brzina" secondary="92 km/h" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SpeedometerMedium />
            </ListItemIcon>
            <ListItemText primary="Prosječna brzina" secondary="80 km/h" />
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}
