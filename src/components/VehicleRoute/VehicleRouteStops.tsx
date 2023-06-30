import { RouteStop } from '../../models/RouteStop';
import { StopMarker } from './StopMarker';
import { useDateTime } from '#core/time';

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
function VehicleRouteStop({ stop }: { stop: RouteStop }) {
  const { formatDuration } = useDateTime();
  const duration = formatDuration(stop.duration());

  return <StopMarker coordinates={stop.coordinates()} duration={duration} />;
}
