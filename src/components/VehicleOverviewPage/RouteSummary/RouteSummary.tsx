import { useState } from 'react';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import {
  BedClock,
  CarClock,
  ChevronDown,
  ChevronUp,
  ClockOutline,
  Counter,
  MapMarkerDistance,
  Speedometer,
  SpeedometerMedium,
} from 'mdi-material-ui';
import { useDateTime } from '../../../foundation';
import { Length, Speed } from '../../../lib/MeasurementUnit';

export interface SummaryData {
  totalDuration: number;
  drivingDuration: number;
  stopDuration: number;
  distance: Length.BaseLength;
  startOdometer: Length.BaseLength;
  endOdometer: Length.BaseLength;
  averageSpeed: Speed.BaseSpeed;
  maxSpeed: Speed.BaseSpeed;
}

export interface RouteSummaryAttributes {
  details: SummaryData | undefined;
}

export function RouteSummary({ details }: RouteSummaryAttributes) {
  const { formatDuration } = useDateTime();
  const [timeDetailsOpen, setTimeDetailsOpen] = useState(false);
  const [odometerDetailsOpen, setOdometerDetailsOpen] = useState(false);
  const [speedDetailsOpen, setSpeedDetailsOpen] = useState(false);

  function toggleTimeDetails() {
    setTimeDetailsOpen(!timeDetailsOpen);
  }

  function toggleOdometerDetails() {
    setOdometerDetailsOpen(!odometerDetailsOpen);
  }

  function toggleSpeedDetails() {
    setSpeedDetailsOpen(!speedDetailsOpen);
  }

  const skeleton = <Skeleton variant={'text'} width={'50px'} />;

  return (
    <>
      <List disablePadding dense>
        <ListItemButton onClick={toggleTimeDetails}>
          <ListItemIcon>
            <ClockOutline />
          </ListItemIcon>
          <ListItemText
            primary="Trajanje"
            secondary={
              details === undefined
                ? skeleton
                : formatDuration(details.totalDuration)
            }
          />
          {timeDetailsOpen ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>

        <Collapse in={timeDetailsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem>
              <ListItemIcon>
                <CarClock />
              </ListItemIcon>
              <ListItemText
                primary="Vožnja"
                secondary={
                  details === undefined
                    ? skeleton
                    : formatDuration(details.drivingDuration)
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BedClock />
              </ListItemIcon>
              <ListItemText
                primary="Stajanje"
                secondary={
                  details === undefined
                    ? skeleton
                    : formatDuration(details.stopDuration)
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List disablePadding dense>
        <ListItemButton onClick={toggleOdometerDetails}>
          <ListItemIcon>
            <MapMarkerDistance />
          </ListItemIcon>
          <ListItemText
            primary="Prijeđena udaljenost"
            secondary={
              details === undefined
                ? skeleton
                : formatDistance(details.distance.value())
            }
          />
          {odometerDetailsOpen ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>

        <Collapse in={odometerDetailsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem>
              <ListItemIcon>
                <Counter />
              </ListItemIcon>
              <ListItemText
                primary="Početni brojčanik"
                secondary={
                  details === undefined
                    ? skeleton
                    : formatDistance(details.startOdometer.value())
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Counter />
              </ListItemIcon>
              <ListItemText
                primary="Završni brojčanik"
                secondary={
                  details === undefined
                    ? skeleton
                    : formatDistance(details.endOdometer.value())
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List disablePadding dense>
        <ListItemButton onClick={toggleSpeedDetails}>
          <ListItemIcon>
            <Speedometer />
          </ListItemIcon>
          <ListItemText
            primary="Najveća brzina"
            secondary={
              details === undefined
                ? skeleton
                : formatSpeed(Speed.convert(details.maxSpeed).toKph())
            }
          />
          {timeDetailsOpen ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>

        <Collapse in={speedDetailsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem>
              <ListItemIcon>
                <SpeedometerMedium />
              </ListItemIcon>
              <ListItemText
                primary="Prosječna brzina"
                secondary={
                  details === undefined
                    ? skeleton
                    : formatSpeed(Speed.convert(details.averageSpeed).toKph())
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters < 1000) return `${distanceInMeters.toFixed(1)}m`;

  const inKilometers = distanceInMeters / 1000;
  return `${inKilometers.toFixed(1)} km`;
}

function formatSpeed(value: Speed.KPH) {
  return Speed.format(value);
}
