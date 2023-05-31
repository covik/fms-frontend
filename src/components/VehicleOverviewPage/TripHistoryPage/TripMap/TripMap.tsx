import { useMemo, useState } from 'react';
import { AppMap } from '../../../Map';
import { VehicleRoute, VehicleRouteStops } from '../../../VehicleRoute';
import { RouteStop } from '../../../../models/RouteStop';
import type { TraccarTripWithPositionsInterface } from '../../../../lib/Traccar';
import type { SxProps } from '@mui/material';

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
      fitBounds={bounds}
      sx={sx}
    >
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
): google.maps.LatLngLiteral[] {
  const tripsBounds = trips.reduce(
    (acc: google.maps.LatLngLiteral[], currentTrip) => {
      const tripBoundary = currentTrip.positions.map((position) => ({
        lat: position.latitude(),
        lng: position.longitude(),
      }));
      return [...acc, ...tripBoundary];
    },
    [],
  );

  const stopsBounds = stops.map((stop) => ({
    lat: stop.coordinates().latitude(),
    lng: stop.coordinates().longitude(),
  }));

  return [...tripsBounds, ...stopsBounds];
}
