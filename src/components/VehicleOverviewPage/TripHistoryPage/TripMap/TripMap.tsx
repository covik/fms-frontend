import { useMemo, useState } from 'react';
import { AppMap, MapBounds } from '../../../Map';
import { VehicleRoute, VehicleRouteStops } from '../../../VehicleRoute';
import { RouteStop } from '../../../../models/RouteStop';
import type { TraccarTripWithPositionsInterface } from '../../../../lib/Traccar';
import type { SxProps } from '@mui/material';
import type { Coordinates } from '../../../../lib/Dimension';

const color = '#BA68C8';

export interface TripMapAttributes {
  trips: TraccarTripWithPositionsInterface[];
  stops: RouteStop[];
  hiddenTripsAndStops: string[];
  sx: SxProps;
}

export function TripMap({
  trips,
  stops,
  hiddenTripsAndStops,
  sx,
}: TripMapAttributes) {
  const bounds = useMemo(
    () => calculateMapBounds(trips, stops),
    [trips, stops],
  );

  const visibleStops = useMemo(
    () => stops.filter((stop) => !hiddenTripsAndStops.includes(stop.id())),
    [stops, hiddenTripsAndStops],
  );

  const [checkpointsVisibility, showCheckpoints] = useState(false);

  return (
    <AppMap
      onZoomChanged={(zoom) => {
        showCheckpoints(zoom >= 15);
      }}
      sx={sx}
    >
      <MapBounds coordinates={bounds} />
      {trips
        .filter((trip) => !hiddenTripsAndStops.includes(trip.startTime))
        .map((trip) => (
          <VehicleRoute
            key={trip.startTime}
            positions={trip.positions}
            color={color}
            showCheckpoints={checkpointsVisibility}
          />
        ))}
      <VehicleRouteStops stops={visibleStops} />
    </AppMap>
  );
}

function calculateMapBounds(
  trips: TraccarTripWithPositionsInterface[],
  stops: RouteStop[],
): Coordinates[] {
  const tripsBounds = trips.reduce((acc: Coordinates[], currentTrip) => {
    const tripBoundary = currentTrip.positions.map((position) =>
      position.coordinates(),
    );
    return acc.concat(tripBoundary);
  }, []);

  const stopsBounds = stops.map((stop) => stop.coordinates());

  return [...tripsBounds, ...stopsBounds];
}
