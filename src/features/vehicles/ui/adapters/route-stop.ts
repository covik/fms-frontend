import type { RouteStopData } from '../types/route';
import type { UnitFormatters } from '../../queries';
import type { RouteStop } from '../../models/route-stop';

export interface StopFormatters
  extends Pick<UnitFormatters, 'formatDuration'> {}

function adaptRouteStop(
  stop: RouteStop,
  formatters: StopFormatters,
): RouteStopData {
  const { formatDuration } = formatters;

  return {
    id: stop.id(),
    latitude: stop.coordinates().latitude(),
    longitude: stop.coordinates().longitude(),
    duration: formatDuration(stop.duration()),
  };
}

export function adaptRouteStops(
  stops: RouteStop[],
  formatters: StopFormatters,
): RouteStopData[] {
  return stops.map((stop) => adaptRouteStop(stop, formatters));
}
