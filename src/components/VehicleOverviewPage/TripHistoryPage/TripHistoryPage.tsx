import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/router';
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { Http } from '../../../lib/HttpClient';
import { z } from 'zod';
import {
  TraccarPosition,
  TraccarPositionInterface,
  TraccarTrip,
  TraccarTripInterface,
  TraccarTripStop,
  TraccarTripWithPositions,
  TraccarTripWithPositionsInterface,
} from '../../../lib/Traccar';
import { TripMap } from './TripMap';
import { formatDateForURL } from '../../../utils/date';
import { DatePicker } from '@mui/x-date-pickers';
import { TripsTable } from './TripResults/TripsTable';
import { useEffect, useState } from 'react';

const tripsRoute = '/vehicles/$vehicleId/trips/$date';

export function TripHistoryPage() {
  const navigate = useNavigate({ from: tripsRoute });
  const { vehicleId, date } = useParams({
    from: tripsRoute,
  });
  const theme = useTheme();
  const [hiddenTripsAndStops, setHiddenTripsAndStops] = useState<string[]>([]);

  const formattedDate = formatDateForURL(date);
  const startTime = `${formattedDate}T00:00:00Z`;
  const endTime = `${formattedDate}T23:59:59Z`;

  function replaceDateURL(date: Date) {
    void navigate({
      to: tripsRoute,
      params: { vehicleId, date },
      replace: true,
    });
  }

  const query = useQuery({
    queryKey: ['vehicle', vehicleId, 'trips', formattedDate],
    queryFn: async () => {
      const tripsResponse = await Http.request(
        `/api/reports/trips?deviceId=${vehicleId}&from=${startTime}&to=${endTime}`,
      );
      const tripsJson = await tripsResponse.json();
      const trips = z.array(TraccarTrip).parse(tripsJson);

      if (trips.length === 0) return [];

      const positionsStartTime = new Date(trips[0].startTime);
      const positionsEndTime = new Date(trips[trips.length - 1].endTime);
      const positions = await fetchPositions(
        vehicleId,
        positionsStartTime,
        positionsEndTime,
      );
      const tripsWithPositions = attachPositionsToTrips(positions, trips);
      return z.array(TraccarTripWithPositions).parse(tripsWithPositions);
    },
    staleTime: Infinity,
  });

  const stopsQuery = useQuery({
    queryKey: ['vehicle', vehicleId, 'stops', formattedDate],
    queryFn: async () => {
      const stopsResponse = await Http.request(
        `/api/reports/stops?deviceId=${vehicleId}&from=${startTime}&to=${endTime}`,
      );
      const stopsJson = await stopsResponse.json();
      return z.array(TraccarTripStop).parse(stopsJson);
    },
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
      ...stops.map((stop) => stop.startTime),
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
            sx={{
              position: 'absolute',
              top: theme.spacing(rowSpacing),
              bottom: 0,
              left: theme.spacing(columnSpacing),
              right: 0,
              overflow: 'auto',
              padding: 1,
            }}
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

async function fetchPositions(
  vehicleId: string,
  start: Date,
  end: Date,
): Promise<TraccarPositionInterface[]> {
  const positionsResponse = await Http.request(
    `/api/positions?deviceId=${vehicleId}&from=${start.toISOString()}&to=${end.toISOString()}`,
  );
  const positionsJson = await positionsResponse.json();
  return z.array(TraccarPosition).parse(positionsJson);
}

function attachPositionsToTrips(
  positions: TraccarPositionInterface[],
  trips: TraccarTripInterface[],
): TraccarTripWithPositionsInterface[] {
  return trips.map((trip) => {
    const startPositionId = trip.startPositionId;
    const endPositionId = trip.endPositionId;

    const positionsInRange =
      positions.filter(
        (position) =>
          position.id >= startPositionId && position.id <= endPositionId,
      ) ?? [];
    return {
      ...trip,
      positions: positionsInRange,
    };
  });
}
