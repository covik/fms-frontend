import { z } from 'zod';

const id = z.number().gte(1);
const datetime = z.string().datetime({ offset: true });

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
  lastUpdate: datetime,
  positionId: z.number().gte(1).nullable(),
  groupId: z.number().gte(0),
  phone: z.string(),
  model: z.string(),
  contact: z.string(),
  category: z.string().nullable(),
  geofenceIds: z.array(z.number().gte(1)),
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
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
  altitude: z.number(),
  speed: z.number().gte(0),
  course: z.number().min(0).max(360),
  address: z.string().nullable(),
  accuracy: z.number(),
  network: z.unknown(),
  attributes: z.object({
    motion: z.boolean(),
    ignition: z.boolean(),
  }),
});

export type TraccarUserInterface = z.infer<typeof TraccarUser>;
export type TraccarDeviceInterface = z.infer<typeof TraccarDevice>;
export type TraccarPositionInterface = z.infer<typeof TraccarPosition>;
