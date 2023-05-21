import { useMemo, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { Map } from '../../../Map';
import { Coordinates } from '../../../../lib/Dimension';
import { StopMarker, VehicleRoute } from '../../../VehicleRoute';
import type {
  TraccarTripStopInterface,
  TraccarTripWithPositionsInterface,
} from '../../../../lib/Traccar';

const CROATIA = {
  coordinates: new Coordinates(44.698832, 16.373162),
  zoom: 7,
};

const color = '#BA68C8';

export interface TripMapAttributes {
  trips: TraccarTripWithPositionsInterface[];
  stops: TraccarTripStopInterface[];
  hiddenTripsAndStops: string[];
}

export function TripMap({
  trips,
  stops,
  hiddenTripsAndStops,
}: TripMapAttributes) {
  const bounds = useMemo(
    () => calculateMapBounds(trips, stops),
    [trips, stops],
  );

  const [checkpointsVisibility, showCheckpoints] = useState(false);

  return (
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
      {stops
        .filter((stop) => !hiddenTripsAndStops.includes(stop.startTime))
        .map((stop) => (
          <Stop stop={stop} key={stop.startTime} />
        ))}
    </Map>
  );
}

function Stop({ stop }: { stop: TraccarTripStopInterface }) {
  const latitude = stop.latitude;
  const longitude = stop.longitude;

  const duration = formatDuration(stop.duration);
  const coordinates = useMemo(
    () => new Coordinates(latitude, longitude),
    [latitude, longitude],
  );

  return <StopMarker coordinates={coordinates} duration={duration} />;
}

function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 60) return `${durationInSeconds}s`;

  const duration = intervalToDuration({ start: 0, end: durationInSeconds });
  const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];

  const valuesWithSymbol = [];
  if (hours > 0) valuesWithSymbol.push(`${hours}h`);
  if (minutes > 0) valuesWithSymbol.push(`${minutes}m`);

  return valuesWithSymbol.join(' ');
}

function calculateMapBounds(
  trips: TraccarTripWithPositionsInterface[],
  stops: TraccarTripStopInterface[],
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
    lat: stop.latitude,
    lng: stop.longitude,
  }));

  return [...tripsBounds, ...stopsBounds];
}
