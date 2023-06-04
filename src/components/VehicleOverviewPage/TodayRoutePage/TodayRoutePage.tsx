import { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AppMap } from '../../Map';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { useParams } from '@tanstack/router';
import { Vehicle } from '../../../lib/VehicleService';
import { VehicleRoute, VehicleRouteStops } from '../../VehicleRoute';
import { RouteStop } from '../../../models/RouteStop';
import { useDateTime } from '../../../foundation';
import { RouteSummary } from '../../../models/RouteSummary';
import { RoutePosition } from '../../../models/Position';
import { NoContent, Tile, TileContent } from '../../Tile';
import { RouteSummary as Summary } from '../RouteSummary';
import type { SummaryData } from '../RouteSummary';
import type { Coordinates } from '../../../lib/Dimension';

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

  const summaryData: SummaryData | NoSummary | undefined = useMemo(() => {
    if (summaryQuery.data instanceof NoSummary) return summaryQuery.data;

    if (summaryQuery.data === undefined || stopsQuery.data === undefined)
      return undefined;

    return calculateFullSummary(summaryQuery.data, stops);
  }, [summaryQuery.data, stopsQuery.data]);

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
                <TileContent>
                  <NoContent>Nema informacija</NoContent>
                </TileContent>
              ) : (
                <Summary details={summaryData} />
              )}
            </Tile>
            <Tile label={'Zaustavljanje'}>
              <TileContent>
                <StopsTable stops={stopsQuery.data} />
              </TileContent>
            </Tile>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9} xl={10}>
        <AppMap
          onZoomChanged={(zoom) => {
            showCheckpoints(zoom >= 15);
          }}
          fitBounds={bounds}
          sx={{
            height: '100%',
            minHeight: { xs: '40vmax', lg: 'auto' },
          }}
        >
          <VehicleRoute
            positions={routes}
            color={routeColor}
            showCheckpoints={checkpointsVisible}
          />
          <VehicleRouteStops stops={stops} />
        </AppMap>
      </Grid>
    </Grid>
  );
}

function StopsTable({ stops }: { stops: RouteStop[] | undefined }) {
  const { formatTime, formatDuration } = useDateTime();

  if (stops && stops.length === 0) {
    return <NoContent>Nema zaustavljanja</NoContent>;
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

function calculateFullSummary(
  summary: RouteSummary,
  stops: RouteStop[],
): SummaryData {
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

class NoSummary {}

function calculateMapBounds(
  positions: RoutePosition[],
  stops: RouteStop[],
): Coordinates[] {
  const positionCoordinates = positions.map((position) =>
    position.coordinates(),
  );
  const stopCoordinates = stops.map((stop) => stop.coordinates());

  return positionCoordinates.concat(stopCoordinates);
}
