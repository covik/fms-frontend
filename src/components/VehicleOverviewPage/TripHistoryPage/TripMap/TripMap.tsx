import { useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { intervalToDuration } from 'date-fns';
import { Marker, Polyline } from '@react-google-maps/api';
import { Map } from '../../../Map';
import { Coordinates } from '../../../../lib/Dimension';
import { FinishMarker, StartMarker, StopMarker } from '../../../VehicleRoute';
import type { ReactElement } from 'react';
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
          <Trip
            trip={trip}
            key={trip.startTime}
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

interface TripAttributes {
  trip: TraccarTripWithPositionsInterface;
  color: string;
  showCheckpoints: boolean;
}

function Trip({ trip, color, showCheckpoints }: TripAttributes) {
  const polylinePath = trip.positions.map(({ latitude, longitude }) => ({
    lat: latitude,
    lng: longitude,
  }));

  const firstPosition = trip.positions[0];
  const lastPosition = trip.positions[trip.positions.length - 1];

  const firstCoordinates = new Coordinates(
    firstPosition.latitude,
    firstPosition.longitude,
  );
  const lastCoordinates = new Coordinates(
    lastPosition.latitude,
    lastPosition.longitude,
  );

  const checkpoints = trip.positions.map((tripCheckpoint) => ({
    id: tripCheckpoint.id,
    position: {
      lat: tripCheckpoint.latitude,
      lng: tripCheckpoint.longitude,
    },
    stationary: !tripCheckpoint.attributes.motion,
    rotation: tripCheckpoint.course,
  }));

  const ArrowMarker = ({
    position,
    stationary,
    rotation,
  }: {
    position: google.maps.LatLngLiteral;
    stationary: boolean;
    rotation: number;
  }) => {
    const size = 32;
    const radius = size / 2;
    return (
      <IconCheckpoint position={position}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
        >
          {stationary ? (
            <IconStationary color={color} />
          ) : (
            <g transform={`rotate(${rotation} ${radius} ${radius})`}>
              <path
                fill={color}
                stroke={'#000000'}
                strokeWidth="1"
                d="M20 20.725a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20.725z"
                transform="translate(4, 3)"
              />
            </g>
          )}
        </svg>
      </IconCheckpoint>
    );
  };

  return (
    <>
      <Polyline
        path={polylinePath}
        options={{
          clickable: false,
          strokeColor: color,
          strokeWeight: 5,
        }}
      />
      {showCheckpoints
        ? checkpoints.map(({ id, position, stationary, rotation }) => (
            <ArrowMarker
              key={id}
              position={position}
              stationary={stationary}
              rotation={rotation}
            />
          ))
        : null}
      <FinishMarker coordinates={lastCoordinates} />
      <StartMarker coordinates={firstCoordinates} />
    </>
  );
}

interface IconCheckpointAttributes {
  position: google.maps.LatLngLiteral;
  children: ReactElement;
}

function IconCheckpoint({ position, children }: IconCheckpointAttributes) {
  const iconContentFromSvg = renderToString(children);
  const urlEncodedIconContent = encodeURIComponent(iconContentFromSvg);
  const icon: google.maps.Icon = {
    url: `data:image/svg+xml,${urlEncodedIconContent}`,
    anchor: {
      x: 16,
      y: 16,
    } as google.maps.Point,
  };

  return <Marker position={position} icon={icon} zIndex={0} />;
}

function IconStationary({ color }: { color: string }) {
  const size = 32;
  const radius = size / 2;
  const stopIndicatorSize = 12;
  const stopIndicatorCenter = radius - stopIndicatorSize / 2;
  const fillColor = color;
  const strokeColor = '#000000';

  return (
    <rect
      data-cy="stop-indicator"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1"
      width={stopIndicatorSize}
      height={stopIndicatorSize}
      x={stopIndicatorCenter}
      y={stopIndicatorCenter}
    />
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
      const tripBoundary = currentTrip.positions.map(
        ({ latitude, longitude }) => ({ lat: latitude, lng: longitude }),
      );
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
