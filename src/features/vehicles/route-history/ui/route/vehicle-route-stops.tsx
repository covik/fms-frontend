import { useDateTime } from '#core/time';
import { RouteStopMarker } from '../markers';
import type { RouteStop } from '../../../models/route-stop';

export interface VehicleRouteStopsAttributes {
  stops: RouteStop[];
}

export function VehicleRouteStops({ stops }: VehicleRouteStopsAttributes) {
  return (
    <>
      {stops.map((stop) => (
        <VehicleRouteStop stop={stop} key={stop.id()} />
      ))}
    </>
  );
}

interface VehicleRouteStopAttributes {
  stop: RouteStop;
}

function VehicleRouteStop({ stop }: VehicleRouteStopAttributes) {
  const { formatDuration } = useDateTime();
  const duration = formatDuration(stop.duration());

  return (
    <RouteStopMarker coordinates={stop.coordinates()} duration={duration} />
  );
}
