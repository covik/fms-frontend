import { z } from 'zod';
import { PositionTimestamps, RoutePosition } from '../../models/Position';
import { Http } from '../HttpClient';
import { TraccarPosition, TraccarTripStop } from '../Traccar';
import { Coordinates } from '../Dimension';
import { Angle, Length, Speed } from '../MeasurementUnit';
import { RouteStop } from '../../models/RouteStop';

const RangeParameters = z.object({
  vehicleId: z.string().trim().min(1),
  from: z.date(),
  to: z.date(),
});

type RangeAttributes = z.infer<typeof RangeParameters>;

export async function fetchInRange(
  options: RangeAttributes,
  signal?: AbortSignal,
): Promise<RoutePosition[]> {
  const params = constructURLParams(options);

  const response = await Http.request(`/api/positions?${params.toString()}`, {
    signal,
  });
  const responseJson = await response.json();

  const positions = z.array(TraccarPosition).parse(responseJson);
  return positions.map(
    (position) =>
      new RoutePosition({
        id: String(position.id),
        altitude: position.altitude,
        coordinates: new Coordinates(position.latitude, position.longitude),
        timestamps: new PositionTimestamps(
          new Date(position.fixTime),
          new Date(position.deviceTime),
          new Date(position.serverTime),
        ),
        speed: new Speed.Knots(position.speed),
        heading: new Angle.Degree(position.course),
        inMotion: position.attributes.motion,
        power: position.attributes.power,
        odometer: new Length.Meter(position.attributes.totalDistance),
        distance: new Length.Meter(position.attributes.distance),
      }),
  );
}

export async function fetchStopsInRange(
  options: RangeAttributes,
  signal?: AbortSignal,
): Promise<RouteStop[]> {
  const params = constructURLParams(options);

  const response = await Http.request(
    `/api/reports/stops?${params.toString()}`,
    { signal },
  );
  const responseJson = await response.json();

  const stops = z.array(TraccarTripStop).parse(responseJson);
  return stops.map(
    (stop) =>
      new RouteStop({
        id: stop.startTime,
        coordinates: new Coordinates(stop.latitude, stop.longitude),
        startTime: new Date(stop.startTime),
        endTime: new Date(stop.endTime),
        duration: stop.duration,
      }),
  );
}

function constructURLParams(options: RangeAttributes): URLSearchParams {
  const { vehicleId, from, to } = RangeParameters.parse(options);
  const fromAsIsoString = from.toISOString();
  const toAsIsoString = to.toISOString();
  return new URLSearchParams({
    deviceId: vehicleId,
    from: fromAsIsoString,
    to: toAsIsoString,
  });
}
