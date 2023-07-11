import { Coordinates } from '#lib/dimension';
import { RouteStop } from '../../models/route-stop';
import stops from '../raw/route-stops';

export default stops.map(
  (stop) =>
    new RouteStop({
      id: stop.startTime,
      coordinates: new Coordinates(stop.latitude, stop.longitude),
      startTime: new Date(stop.startTime),
      endTime: new Date(stop.endTime),
      duration: stop.duration / 1000,
    }),
);
