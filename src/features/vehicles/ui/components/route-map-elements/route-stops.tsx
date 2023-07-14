import { Coordinates } from '#lib/dimension';
import { RouteStopMarker } from './markers';
import type { RouteStopData } from '../../types/route';

export interface RouteStopsAttributes {
  stops: RouteStopData[];
}

export function RouteStops({ stops }: RouteStopsAttributes) {
  return (
    <>
      {stops.map((stop) => (
        <RouteStopMarker
          key={stop.id}
          coordinates={new Coordinates(stop.latitude, stop.longitude)}
          duration={stop.duration}
        />
      ))}
    </>
  );
}
