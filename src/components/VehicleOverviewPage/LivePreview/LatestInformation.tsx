import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Battery,
  CarBattery,
  ClockOutline,
  Counter,
  DirectionsFork,
  ImageFilterHdr,
  LightningBolt,
  MapMarker,
  Navigation,
  SpeedometerSlow,
  WifiStrength4,
} from 'mdi-material-ui';

export interface StateDetailsAttributes {
  inMotion: boolean;
  hasIgnition: boolean;
  speed: string;
  lastFixTime: string;
}

export function StateDetails({
  inMotion,
  hasIgnition,
  speed,
  lastFixTime,
}: StateDetailsAttributes) {
  const movementText = inMotion ? 'U pokretu' : 'Zaustavljen';
  const ignitionText = hasIgnition ? 'Uključen' : 'Isključen';

  return (
    <List disablePadding dense>
      <ListItem>
        <ListItemIcon>
          <Navigation />
        </ListItemIcon>
        <ListItemText primary="Kretanje" secondary={movementText} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LightningBolt />
        </ListItemIcon>
        <ListItemText primary="Kontakt" secondary={ignitionText} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <SpeedometerSlow />
        </ListItemIcon>
        <ListItemText primary="Brzina" secondary={speed} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ClockOutline />
        </ListItemIcon>
        <ListItemText primary="Posljednja pozicija" secondary={lastFixTime} />
      </ListItem>
    </List>
  );
}

export interface ConnectionDetailsAttributes {
  isActive: boolean;
}

export function ConnectionDetails({ isActive }: ConnectionDetailsAttributes) {
  const statusText = isActive ? 'Aktivna' : 'Prekinuta';

  return (
    <List disablePadding dense>
      <ListItem>
        <ListItemIcon>
          <WifiStrength4 />
        </ListItemIcon>
        <ListItemText primary="Veza sa serverom" secondary={statusText} />
      </ListItem>
    </List>
  );
}

export interface SpatialDetailsAttributes {
  coordinates: string;
  course: string;
  altitude: string;
}

export function SpatialDetails({
  coordinates,
  course,
  altitude,
}: SpatialDetailsAttributes) {
  return (
    <List disablePadding dense>
      <ListItem>
        <ListItemIcon>
          <MapMarker />
        </ListItemIcon>
        <ListItemText primary="Koordinate" secondary={coordinates} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DirectionsFork />
        </ListItemIcon>
        <ListItemText primary="Smjer" secondary={course} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ImageFilterHdr />
        </ListItemIcon>
        <ListItemText primary="Nadmorska visina" secondary={altitude} />
      </ListItem>
    </List>
  );
}

export interface BatteryLevelsAttributes {
  vehicleLevel: string;
  gpsDeviceLevel: string;
}

export function BatteryLevels({
  vehicleLevel,
  gpsDeviceLevel,
}: BatteryLevelsAttributes) {
  return (
    <List disablePadding dense>
      <ListItem>
        <ListItemIcon>
          <CarBattery />
        </ListItemIcon>
        <ListItemText primary="Baterija" secondary={vehicleLevel} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Battery />
        </ListItemIcon>
        <ListItemText
          primary="Baterija GPS uređaja"
          secondary={gpsDeviceLevel}
        />
      </ListItem>
    </List>
  );
}

export interface MileageDetailsAttributes {
  mileage: string;
}

export function MileageDetails({ mileage }: MileageDetailsAttributes) {
  return (
    <List disablePadding dense>
      <ListItem>
        <ListItemIcon>
          <Counter />
        </ListItemIcon>
        <ListItemText primary="Kilometraža" secondary={mileage} />
      </ListItem>
    </List>
  );
}
