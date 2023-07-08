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
import { useDateTime } from '#core/time';
import { Length, Speed } from '#lib/measurement-unit';

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

export function RouteSummaryList({ details }: RouteSummaryAttributes) {
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
                : Length.adaptiveFormat(details.distance, 1)
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
                    : Length.adaptiveFormat(details.startOdometer, 1)
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
                    : Length.adaptiveFormat(details.endOdometer, 1)
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
                : Speed.format(Speed.convert(details.maxSpeed).toKph())
            }
          />
          {speedDetailsOpen ? <ChevronUp /> : <ChevronDown />}
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
                    : Speed.format(Speed.convert(details.averageSpeed).toKph())
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}
