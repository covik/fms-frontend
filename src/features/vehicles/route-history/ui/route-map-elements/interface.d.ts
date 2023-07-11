import type { RoutePosition } from '../../../models/position';
import type { RouteStop } from '../../../models/route-stop';

export interface RoutePositionData {
  id: string;
  latitude: number;
  longitude: number;
  ignitionOn: boolean;
  inMotion: boolean;
  speed: string;
  courseInDegrees: number;
  mileage: string;
  power: string;
  timestamp: string;
}

export interface RouteStopData {
  id: string;
  latitude: number;
  longitude: number;
  duration: string;
}

type RoutePositionInstance = InstanceType<typeof RoutePosition>;
type TimestampInstance = ReturnType<RoutePositionInstance['timestamp']>;

export interface PositionUnitConverters {
  formatDateTime(unit: ReturnType<TimestampInstance['fixationTime']>): string;
  formatMileage(unit: ReturnType<RoutePositionInstance['mileage']>): string;
  formatSpeed(unit: ReturnType<RoutePositionInstance['speed']>): string;
  formatVoltage(unit: ReturnType<RoutePositionInstance['power']>): string;
}

type RouteStopInstance = InstanceType<typeof RouteStop>;

export interface StopUnitConverters {
  formatDuration(unit: ReturnType<RouteStopInstance['duration']>): string;
}
