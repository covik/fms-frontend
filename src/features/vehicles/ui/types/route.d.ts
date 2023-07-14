import type { Length, Speed, Voltage } from '#lib/measurement-unit';

export interface RouteData {
  positions: RoutePositionData[];
  stops: RouteStopData[];
  summary: RouteSummaryData | null;
}

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
  startTime: string;
  endTime: string;
}

export interface RouteSummaryData {
  totalDuration: string;
  drivingDuration: string;
  stopDuration: string;
  distance: string;
  startOdometer: string;
  endOdometer: string;
  maxSpeed: string;
  averageSpeed: string;
}

export interface RouteFormatters {
  formatDateTime: (date: Date) => string;
  formatDuration: (durationInSeconds: number) => string;
  formatLength: (length: Length.BaseLength) => string;
  formatSpeed: (speed: Speed.BaseSpeed) => string;
  formatTime: (time: Date) => string;
  formatVoltage: (voltage: Voltage.BaseVoltage) => string;
}
