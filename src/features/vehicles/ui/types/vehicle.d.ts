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
