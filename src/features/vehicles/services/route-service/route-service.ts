import { z } from 'zod';
import { Http } from '#lib/http-client';
import {
  TraccarPosition,
  TraccarRouteSummary,
  TraccarTripStop,
} from '#lib/traccar';
import { Coordinates } from '#lib/dimension';
import { Angle, Length, Speed, Voltage } from '#lib/measurement-unit';
import { PositionTimestamps, RoutePosition } from '../../models/position';
import { RouteStop } from '../../models/route-stop';
import { RouteSummary } from '../../models/route-summary';

const RangeParameters = z.object({
  vehicleId: z.string().trim().min(1),
  from: z.date(),
  to: z.date(),
});

const headers = {
  Accept: 'application/json',
};

type RangeAttributes = z.infer<typeof RangeParameters>;

export async function fetchInRange(
  options: RangeAttributes,
  signal?: AbortSignal,
): Promise<RoutePosition[]> {
  const params = constructURLParams(options);

  const response = await Http.request(`/api/positions?${params.toString()}`, {
    signal,
    headers,
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
        ignitionOn: position.attributes.ignition,
        inMotion: position.attributes.motion,
        power: new Voltage.Volt(position.attributes.power),
        mileage: new Length.Meter(position.attributes.totalDistance),
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
    { signal, headers },
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
        duration: stop.duration / 1000,
      }),
  );
}

export async function fetchSummaryInRange(
  options: RangeAttributes,
  signal?: AbortSignal,
): Promise<RouteSummary | null> {
  const params = constructURLParams(options);

  const response = await Http.request(
    `/api/reports/summary?${params.toString()}`,
    { signal, headers },
  );
  const responseJson = await response.json();
  const summaryList = z.array(TraccarRouteSummary).max(1).parse(responseJson);

  if (summaryList.length === 0) return null;

  const summary = summaryList[0];

  return new RouteSummary({
    startTime: new Date(summary.startTime),
    endTime: new Date(summary.endTime),
    startOdometer: new Length.Meter(summary.startOdometer),
    endOdometer: new Length.Meter(summary.endOdometer),
    distance: new Length.Meter(summary.distance),
    engineSeconds: summary.engineHours / 1000,
    averageSpeed: new Speed.Knots(summary.averageSpeed),
    maxSpeed: new Speed.Knots(summary.maxSpeed),
  });
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
