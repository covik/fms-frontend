import { z } from 'zod';
import { RoutePosition } from '../../models/Position';

const id = z.number().gte(1);
const datetime = z.string().datetime({ offset: true });
const latitude = z.number().gte(-90).lte(90);
const longitude = z.number().gte(-180).lte(180);
const speed = z.number().nonnegative();

export const TraccarUser = z.object({
  id,
  administrator: z.boolean(),
  disabled: z.boolean(),
  email: z.string().email(),
  name: z.string().min(1),
});

export const TraccarDevice = z.object({
  id,
  name: z.string().min(1),
  uniqueId: z.string(),
  status: z.enum(['online', 'offline', 'unknown']),
  disabled: z.boolean(),
  lastUpdate: datetime.nullable(),
  positionId: z.number().gte(0).nullable(),
  groupId: z.number().gte(0).nullable(),
  phone: z.string().nullable(),
  model: z.string().nullable(),
  contact: z.string().nullable(),
  category: z.string().nullable(),
  attributes: z.record(z.string(), z.string()),
});

export const TraccarPosition = z.object({
  id,
  deviceId: id,
  protocol: z.string(),
  deviceTime: datetime,
  fixTime: datetime,
  serverTime: datetime,
  outdated: z.boolean(),
  valid: z.boolean(),
  latitude,
  longitude,
  altitude: z.number(),
  speed,
  course: z.number().min(0).max(360),
  address: z.string().nullable(),
  accuracy: z.number(),
  network: z.unknown(),
  attributes: z.object({
    motion: z.boolean(),
    ignition: z.boolean(),
    power: z.number().nonnegative(),
    totalDistance: z.number().nonnegative(),
    distance: z.number().nonnegative(),
  }),
});

export const TraccarTrip = z.object({
  deviceId: id,
  deviceName: z.string().min(1),
  maxSpeed: speed,
  averageSpeed: speed,
  distance: z.number().gt(0),
  duration: z.number().nonnegative(),
  startPositionId: id,
  startTime: datetime,
  startLat: latitude,
  startLon: longitude,
  endPositionId: id,
  endTime: datetime,
  endLat: latitude,
  endLon: longitude,
});

export const TraccarTripStop = z.object({
  deviceId: id,
  deviceName: z.string().min(1),
  startTime: datetime,
  endTime: datetime,
  latitude,
  longitude,
  duration: z.number().nonnegative(),
  distance: z.number().min(0).max(0),
});

export const TraccarTripWithPositions = TraccarTrip.extend({
  positions: z.array(z.instanceof(RoutePosition)),
});

export const TraccarRouteSummary = z.object({
  maxSpeed: speed,
  averageSpeed: speed,
  distance: z.number().nonnegative(),
  engineHours: z.number().nonnegative(), // engineHours is actually engine milliseconds
  startTime: datetime.nullable(),
  endTime: datetime.nullable(),
  startOdometer: z.number().nonnegative(),
  endOdometer: z.number().nonnegative(),
});

export type TraccarUserInterface = z.infer<typeof TraccarUser>;
export type TraccarDeviceInterface = z.infer<typeof TraccarDevice>;
export type TraccarPositionInterface = z.infer<typeof TraccarPosition>;
export type TraccarTripInterface = z.infer<typeof TraccarTrip>;
export type TraccarTripStopInterface = z.infer<typeof TraccarTripStop>;
export type TraccarTripWithPositionsInterface = z.infer<
  typeof TraccarTripWithPositions
>;
export type TraccarRouteSummaryInterface = z.infer<typeof TraccarRouteSummary>;
