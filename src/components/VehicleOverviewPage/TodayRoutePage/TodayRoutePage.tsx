import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Map } from '../../Map';
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
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { useParams } from '@tanstack/router';
import { Vehicle } from '../../../lib/VehicleService';
import { VehicleRoute, VehicleRouteStops } from '../../VehicleRoute';
import { RouteStop } from '../../../models/RouteStop';
import { useDateTime } from '../../../foundation';
import { Length, Speed } from '../../../lib/MeasurementUnit';
import { RouteSummary } from '../../../models/RouteSummary';
import { RoutePosition } from '../../../models/Position';
import { Coordinates } from '../../../lib/Dimension';

const CROATIA = {
  coordinates: new Coordinates(44.698832, 16.373162),
  zoom: 7,
};

const routeColor = '#BA68C8';
const today = new Date();
const from = startOfDay(today);
const to = endOfDay(today);

export function TodayRoutePage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/today' });
  const routeQuery = useQuery({
    queryKey: [
      'vehicles',
      vehicleId,
      'routes',
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: ({ signal }) =>
      Vehicle.Route.fetchInRange({ vehicleId, from, to }, signal),
  });
  const stopsQuery = useQuery({
    queryKey: [
      'vehicles',
      vehicleId,
      'stops',
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: ({ signal }) =>
      Vehicle.Route.fetchStopsInRange({ vehicleId, from, to }, signal),
  });
  const summaryQuery = useQuery({
    queryKey: [
      'vehicles',
      vehicleId,
      'summary',
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: async ({ signal }) => {
      try {
        return await Vehicle.Route.fetchSummaryInRange(
          { vehicleId, from, to },
          signal,
        );
      } catch (e) {
        if (e instanceof Vehicle.NoRouteSummary) return new NoSummary();
        throw e;
      }
    },
  });
  const [checkpointsVisible, showCheckpoints] = useState(false);

  const routes = routeQuery.data ?? [];
  const stops = stopsQuery.data ?? [];

  const summaryData: FullSummary | NoSummary | undefined = useMemo(() => {
    if (summaryQuery.data instanceof NoSummary) return summaryQuery.data;

    if (summaryQuery.data === undefined || stopsQuery.data === undefined)
      return undefined;

    return calculateFullSummary(summaryQuery.data, stops);
  }, [summaryQuery.error, summaryQuery.data, stopsQuery.data]);

  const bounds = useMemo(
    () => calculateMapBounds(routes, stops),
    [routes, stops],
  );

  const spacing = 1;
  return (
    <Grid container direction="row" flex={1} spacing={spacing}>
      <Grid item xs={12} md={4} lg={3} xl={2} position={'relative'}>
        <Box
          sx={(theme) => ({
            position: {
              md: 'absolute',
              xs: 'static',
            },
            top: theme.spacing(spacing),
            bottom: 0,
            left: theme.spacing(spacing),
            right: 0,
            overflow: 'auto',
            paddingBottom: '2px', // otherwise card box shadow is invisible
          })}
        >
          <Stack spacing={2}>
            <Tile label={'Sažetak'}>
              {summaryData instanceof NoSummary ? (
                <CardContent>
                  <Typography variant={'body2'}>Nema informacija</Typography>
                </CardContent>
              ) : (
                <Summary details={summaryData} />
              )}
            </Tile>
            <Tile label={'Zaustavljanje'}>
              <CardContent>
                <StopsTable stops={stopsQuery.data} />
              </CardContent>
            </Tile>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9} xl={10}>
        <Card
          sx={{
            height: '100%',
            padding: 1,
            minHeight: { xs: '40vmax', lg: 'auto' },
          }}
        >
          <Map
            x={CROATIA.coordinates.latitude()}
            y={CROATIA.coordinates.longitude()}
            z={CROATIA.zoom}
            width={'100%'}
            height={'100%'}
            onZoomChanged={(zoom) => {
              showCheckpoints(zoom >= 15);
            }}
            fitBounds={bounds}
          >
            <VehicleRoute
              positions={routes}
              color={routeColor}
              showCheckpoints={checkpointsVisible}
            />
            <VehicleRouteStops stops={stops} />
          </Map>
        </Card>
      </Grid>
    </Grid>
  );
}

export interface TileAttributes {
  label: string;
  children: ReactNode;
}

function Tile({ label, children }: TileAttributes) {
  return (
    <Card>
      <CardHeader
        title={label}
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 500,
        }}
        sx={{ paddingBottom: 0 }}
      />
      {children}
    </Card>
  );
}

interface SummaryAttributes {
  details: FullSummary | undefined;
}

function Summary({ details }: SummaryAttributes) {
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

  const skeleton = (
    <>
      <Skeleton variant={'text'} width={'50px'} />
    </>
  );

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

function StopsTable({ stops }: { stops: RouteStop[] | undefined }) {
  const { formatTime, formatDuration } = useDateTime();

  if (stops && stops.length === 0) {
    return <Typography variant={'body2'}>Nema zaustavljanja</Typography>;
  }

  const indexWidth = '30px';
  const departureWidth = '60px';
  const arrivalWidth = '60px';

  return (
    <Table
      size={'small'}
      sx={{
        '& .MuiTableCell-root': {
          paddingX: 1,
        },
      }}
    >
      <TableHead>
        <TableRow
          sx={(theme) => ({
            '& .MuiTableCell-root': {
              paddingBottom: '0 !important',
              textTransform: 'uppercase',
              color: `${theme.palette.text.secondary} !important`,
            },
          })}
        >
          <TableCell sx={{ width: indexWidth }}>#</TableCell>
          <TableCell align={'center'} sx={{ width: departureWidth }}>
            Od
          </TableCell>
          <TableCell align={'center'} sx={{ width: arrivalWidth }}>
            Do
          </TableCell>
          <TableCell>Trajanje</TableCell>
        </TableRow>
      </TableHead>

      <TableBody
        sx={{
          '& .MuiTableCell-root': { color: 'text.primary' },
          '& > tr:last-of-type td': { border: 0 },
        }}
      >
        {stops !== undefined ? (
          stops.map((stop, index) => (
            <TableRow key={stop.id()}>
              <TableCell sx={{ width: indexWidth }}>{index + 1}</TableCell>
              <TableCell align={'center'} sx={{ width: departureWidth }}>
                {formatTime(stop.startTime())}
              </TableCell>
              <TableCell align={'center'} sx={{ width: arrivalWidth }}>
                {formatTime(stop.endTime())}
              </TableCell>
              <TableCell>{formatDuration(stop.duration())}</TableCell>
            </TableRow>
          ))
        ) : (
          <>
            {[1, 2, 3].map((index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: indexWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell align={'center'} sx={{ width: departureWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell align={'center'} sx={{ width: arrivalWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell>
                  <Skeleton variant={'text'} />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}

interface FullSummary {
  totalDuration: number;
  drivingDuration: number;
  stopDuration: number;
  distance: Length.BaseLength;
  startOdometer: Length.BaseLength;
  endOdometer: Length.BaseLength;
  averageSpeed: Speed.BaseSpeed;
  maxSpeed: Speed.BaseSpeed;
}

function calculateFullSummary(
  summary: RouteSummary,
  stops: RouteStop[],
): FullSummary {
  const totalDuration = summary.durationInSeconds();
  const { drivingDuration, stopDuration } =
    summary.drivingAndStopDuration(stops);
  const distance = summary.distance();
  const startOdometer = summary.startOdometer();
  const endOdometer = summary.endOdometer();
  const averageSpeed = summary.averageSpeed();
  const maxSpeed = summary.maxSpeed();

  return {
    totalDuration,
    drivingDuration,
    stopDuration,
    distance,
    startOdometer,
    endOdometer,
    averageSpeed,
    maxSpeed,
  };
}

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters < 1000) return `${distanceInMeters}m`;

  const inKilometers = distanceInMeters / 1000;
  return `${inKilometers.toFixed(1)} km`;
}

function formatSpeed(speed: Speed.KPH) {
  return `${Math.round(speed.value())} ${speed.symbol()}`;
}

class NoSummary {}

function calculateMapBounds(
  positions: RoutePosition[],
  stops: RouteStop[],
): google.maps.LatLngLiteral[] {
  const positionsLatLngLiterals = positions.map((position) => ({
    lat: position.latitude(),
    lng: position.longitude(),
  }));

  const stopLatLngLiterals = stops.map((stop) => ({
    lat: stop.coordinates().latitude(),
    lng: stop.coordinates().longitude(),
  }));

  return [...positionsLatLngLiterals, ...stopLatLngLiterals];
}
