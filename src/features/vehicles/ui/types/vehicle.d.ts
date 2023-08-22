import type { Voltage, Speed } from '#lib/measurement-unit';

export interface MinimalVehicle {
  id: string;
  name: string;
}

export interface VehicleTracker {
  uniqueId: string;
}

export interface VehicleLocation {
  latitude: number;
  longitude: number;
}

export interface VehicleIgnitionState {
  ignitionOn: boolean;
}

export interface VehicleMovementState {
  inMotion: boolean;
}

export interface VehicleCourse {
  courseInDegrees: number;
}

export interface VehicleCondition {
  condition: 'none' | 'unavailable' | 'disabled';
}

export interface VehiclePower {
  power: string;
}

export interface VehicleSpeed {
  speed: string;
}

export interface VehicleFormatters {
  formatPower: (power: Voltage.BaseVoltage) => string;
  formatSpeed: (speed: Speed.BaseSpeed) => string;
}
