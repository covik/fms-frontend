import { Map } from '../../../Map';
import { Coordinates } from '../../../../lib/Dimension';
import {
  TraccarTripStopInterface,
  TraccarTripWithPositionsInterface,
} from '../../../../lib/Traccar';
import { Marker, Polyline } from '@react-google-maps/api';
import { ReactElement, ReactNode, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { intervalToDuration } from 'date-fns';

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

  const checkpoints = trip.positions.map((tripCheckpoint) => ({
    id: tripCheckpoint.id,
    position: {
      lat: tripCheckpoint.latitude,
      lng: tripCheckpoint.longitude,
    },
    stationary: !tripCheckpoint.attributes.motion,
    rotation: tripCheckpoint.course,
  }));

  const StartMarker = () => {
    const position = {
      lat: firstPosition.latitude,
      lng: firstPosition.longitude,
    };

    return (
      <IconStart position={position}>
        <IconBackground>
          <path
            transform={'translate(4,3)'}
            fill={'#666'}
            d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z"
          />
        </IconBackground>
      </IconStart>
    );
  };

  const EndMarker = () => {
    const position = {
      lat: lastPosition.latitude,
      lng: lastPosition.longitude,
    };

    return (
      <IconStart position={position}>
        <IconBackground>
          <path
            transform={'translate(4,3)'}
            fill={'#666'}
            d="M14.4,6H20V16H13L12.6,14H7V21H5V4H14L14.4,6M14,14H16V12H18V10H16V8H14V10L13,8V6H11V8H9V6H7V8H9V10H7V12H9V10H11V12H13V10L14,12V14M11,10V8H13V10H11M14,10H16V12H14V10Z"
          />
        </IconBackground>
      </IconStart>
    );
  };

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
      <EndMarker />
      <StartMarker />
    </>
  );
}

function IconBackground({
  children,
  rotation = 0,
}: {
  children: ReactNode;
  rotation?: number;
}) {
  const size = 32;
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      <g transform={`rotate(${rotation} ${radius} ${radius})`}>
        <circle cx={centerX} cy={centerY} r={radius} fill="#aaaaaa" />
        <circle cx={centerX} cy={centerY} r={radius - 1} fill="#ebebeb" />
        {children}
      </g>
    </svg>
  );
}

interface IconStartAttributes {
  position: google.maps.LatLngLiteral;
  children: ReactElement;
}

function IconStart({ position, children }: IconStartAttributes) {
  const iconContentFromSvg = renderToString(children);
  const urlEncodedIconContent = encodeURIComponent(iconContentFromSvg);
  const icon: google.maps.Icon = {
    url: `data:image/svg+xml,${urlEncodedIconContent}`,
    anchor: {
      x: 16,
      y: 16,
    } as google.maps.Point,
  };

  return <Marker position={position} icon={icon} zIndex={1} />;
}

interface IconCheckpointAttributes extends IconStartAttributes {}

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

  const label: google.maps.MarkerLabel = {
    text: duration,
    fontFamily: 'FiraGO',
    fontWeight: '400',
    color: 'white',
    fontSize: '12px',
    className: 'trip-stop-marker-label',
  };

  const iconContentFromSvg = renderToString(<StopIcon />);
  const urlEncodedIconContent = encodeURIComponent(iconContentFromSvg);
  const icon: google.maps.Icon = {
    url: `data:image/svg+xml,${urlEncodedIconContent}`,
    anchor: {
      x: 16,
      y: 16,
    } as google.maps.Point,
    labelOrigin: {
      x: 16,
      y: 42,
    } as google.maps.Point,
  };

  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      icon={icon}
      label={label}
      zIndex={2}
    />
  );
}

function StopIcon() {
  const size = 32;
  const radius = size / 2;
  const center = radius;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      <circle cx={center} cy={center} r={radius} fill="#ed6c02" />
      <path
        transform={'translate(5,4)'}
        fill={'#ffffff'}
        d="M13.2,11H10V7H13.2A2,2 0 0,1 15.2,9A2,2 0 0,1 13.2,11M13,3H6V21H10V15H13A6,6 0 0,0 19,9C19,5.68 16.31,3 13,3Z"
      />
    </svg>
  );
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
