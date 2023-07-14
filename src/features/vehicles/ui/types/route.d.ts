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
