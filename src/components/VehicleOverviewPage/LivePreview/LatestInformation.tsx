import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  CarBattery,
  ClockOutline,
  Counter,
  DirectionsFork,
  ImageFilterHdr,
  LightningBolt,
  MapMarker,
  Navigation,
  Timer,
  WifiStrength4,
} from 'mdi-material-ui';
import type { ReactNode } from 'react';

export interface InformationContainerAttributes {
  children: ReactNode;
}

export function InformationContainer({
  children,
}: InformationContainerAttributes) {
  return (
    <List disablePadding dense>
      {children}
    </List>
  );
}

export interface StateDetailsAttributes {
  inMotion: boolean;
  hasIgnition: boolean;
  speed: string;
}

export function StateDetails({
  inMotion,
  hasIgnition,
  speed,
}: StateDetailsAttributes) {
  const movementStateText = inMotion ? 'U pokretu' : 'Zaustavljen';
  const movementText = `${movementStateText} (${speed})`;
  const ignitionText = hasIgnition ? 'Uključen' : 'Isključen';

  return (
    <>
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
    </>
  );
}

export interface ConnectionDetailsAttributes {
  isActive: boolean;
  latency: string;
}

export function ConnectionDetails({
  isActive,
  latency,
}: ConnectionDetailsAttributes) {
  const statusText = isActive ? 'Aktivna' : 'Prekinuta';

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <WifiStrength4 />
        </ListItemIcon>
        <ListItemText primary="Veza sa serverom" secondary={statusText} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Timer />
        </ListItemIcon>
        <ListItemText primary="Kašnjenje" secondary={latency} />
      </ListItem>
    </>
  );
}

export interface SpatialDetailsAttributes {
  coordinates: string;
  course: string;
  altitude: string;
  lastFixTime: string;
}

export function SpatialDetails({
  coordinates,
  course,
  altitude,
  lastFixTime,
}: SpatialDetailsAttributes) {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <MapMarker />
        </ListItemIcon>
        <ListItemText primary="Koordinate" secondary={coordinates} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ClockOutline />
        </ListItemIcon>
        <ListItemText primary="Ažurirana" secondary={lastFixTime} />
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
    </>
  );
}

export interface BatteryStateAttributes {
  voltage: string;
}

export function BatteryState({ voltage }: BatteryStateAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <CarBattery />
      </ListItemIcon>
      <ListItemText primary="Napon" secondary={voltage} />
    </ListItem>
  );
}

export interface MileageDetailsAttributes {
  mileage: string;
}

export function MileageDetails({ mileage }: MileageDetailsAttributes) {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Counter />
        </ListItemIcon>
        <ListItemText primary="Kilometraža" secondary={mileage} />
      </ListItem>
    </>
  );
}
