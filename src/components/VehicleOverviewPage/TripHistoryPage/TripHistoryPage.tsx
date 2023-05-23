import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/router';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { Http } from '../../../lib/HttpClient';
import { z } from 'zod';
import {
  TraccarTrip,
  TraccarTripInterface,
  TraccarTripWithPositions,
  TraccarTripWithPositionsInterface,
} from '../../../lib/Traccar';
import { TripMap } from './TripMap';
import { DatePicker } from '@mui/x-date-pickers';
import { TripsTable } from './TripResults';
import { useEffect, useState } from 'react';
import { Vehicle } from '../../../lib/VehicleService';
import { RoutePosition } from '../../../models/Position';
import { endOfDay, startOfDay } from 'date-fns';

const tripsRoute = '/vehicles/$vehicleId/trips/$date';

export function TripHistoryPage() {
  const navigate = useNavigate({ from: tripsRoute });
  const { vehicleId, date } = useParams({ from: tripsRoute });
  const [hiddenTripsAndStops, setHiddenTripsAndStops] = useState<string[]>([]);

  const startTime = startOfDay(date);
  const endTime = endOfDay(date);

  function replaceDateURL(date: Date) {
    void navigate({
      to: tripsRoute,
      params: { vehicleId, date },
      replace: true,
    });
  }

  const query = useQuery({
    queryKey: ['vehicle', vehicleId, 'trips', startTime, endTime],
    queryFn: async () => {
      const tripsResponse = await Http.request(
        `/api/reports/trips?deviceId=${vehicleId}&from=${startTime.toISOString()}&to=${endTime.toISOString()}`,
      );
      const tripsJson = await tripsResponse.json();
      const trips = z.array(TraccarTrip).parse(tripsJson);

      if (trips.length === 0) return [];

      const positionsStartTime = new Date(trips[0].startTime);
      const positionsEndTime = new Date(trips[trips.length - 1].endTime);
      const positions = await Vehicle.Route.fetchInRange({
        vehicleId,
        from: positionsStartTime,
        to: positionsEndTime,
      });
      const tripsWithPositions = attachPositionsToTrips(positions, trips);
      return z.array(TraccarTripWithPositions).parse(tripsWithPositions);
    },
    staleTime: Infinity,
  });

  const stopsQuery = useQuery({
    queryKey: ['vehicle', vehicleId, 'stops', startTime, endTime],
    queryFn: ({ signal }) =>
      Vehicle.Route.fetchStopsInRange(
        {
          vehicleId,
          from: startTime,
          to: endTime,
        },
        signal,
      ),
    staleTime: Infinity,
  });

  const isLoading = query.data === undefined || stopsQuery.data === undefined;

  const trips = query.data ?? [];
  const stops = stopsQuery.data ?? [];
  const noData = trips.length === 0 && stops.length === 0;

  const rowSpacing = 1;
  const columnSpacing = 1;

  useEffect(() => {
    showAllTripsAndStops();
  }, [trips, stops]);

  function toggleTripVisibility(startTime: string) {
    setHiddenTripsAndStops((alreadyHidden) => {
      if (alreadyHidden.includes(startTime)) {
        return alreadyHidden.filter((v) => v !== startTime);
      }

      return [...alreadyHidden, startTime];
    });
  }

  function hideAllTripsAndStops() {
    setHiddenTripsAndStops([
      ...trips.map((trip) => trip.startTime),
      ...stops.map((stop) => stop.id()),
    ]);
  }

  function showAllTripsAndStops() {
    setHiddenTripsAndStops([]);
  }

  return (
    <>
      <Grid
        container
        direction="row"
        flex={1}
        rowSpacing={rowSpacing}
        columnSpacing={columnSpacing}
      >
        <Grid item xs={12} md={5} lg={4} position={'relative'}>
          <Paper
            sx={(theme) => ({
              position: 'absolute',
              top: theme.spacing(rowSpacing),
              bottom: 0,
              left: theme.spacing(columnSpacing),
              right: 0,
              overflow: 'auto',
              padding: 1,
            })}
          >
            <TripPicker targetDate={date} onChange={replaceDateURL} />

            {isLoading ? (
              <LoadingSpinner />
            ) : noData ? (
              <NoData />
            ) : (
              <TripsTable
                trips={trips}
                stops={stops}
                hiddenTripsAndStops={hiddenTripsAndStops}
                onVisibilityToggle={toggleTripVisibility}
                onHideAll={hideAllTripsAndStops}
                onShowAll={showAllTripsAndStops}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <TripMap
            trips={trips}
            stops={stops}
            hiddenTripsAndStops={hiddenTripsAndStops}
          />
        </Grid>
      </Grid>
    </>
  );
}

function TripPicker({
  targetDate,
  onChange,
}: {
  targetDate: Date;
  onChange: (date: Date) => void;
}) {
  return (
    <DatePicker
      value={targetDate}
      onChange={(v) => v && onChange(v)}
      disableFuture={true}
    />
  );
}

function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <CircularProgress />
    </Box>
  );
}

function NoData() {
  return (
    <Typography
      component={'h1'}
      variant={'subtitle2'}
      textAlign={'center'}
      width={'100%'}
      marginTop={1}
    >
      Nema podataka
    </Typography>
  );
}

function attachPositionsToTrips(
  positions: RoutePosition[],
  trips: TraccarTripInterface[],
): TraccarTripWithPositionsInterface[] {
  return trips.map((trip) => {
    const startTime = new Date(trip.startTime);
    const endTime = new Date(trip.endTime);

    const positionsInRange = positions.filter(
      (position) =>
        position.timestamp().fixationTime() >= startTime &&
        position.timestamp().fixationTime() <= endTime,
    );
    return {
      ...trip,
      positions: positionsInRange,
    };
  });
}
