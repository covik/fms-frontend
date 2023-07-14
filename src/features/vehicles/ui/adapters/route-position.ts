import type { RoutePositionData, RouteFormatters } from '../types/route';
import type { RoutePosition } from '../../models/position';

export interface PositionFormatters
  extends Pick<
    RouteFormatters,
    'formatDateTime' | 'formatLength' | 'formatSpeed' | 'formatVoltage'
  > {}

function adaptRoutePosition(
  position: RoutePosition,
  formatters: PositionFormatters,
): RoutePositionData {
  const { formatDateTime, formatLength, formatSpeed, formatVoltage } =
    formatters;

  return {
    id: position.id(),
    latitude: position.latitude(),
    longitude: position.longitude(),
    speed: formatSpeed(position.speed()),
    courseInDegrees: position.heading().value(),
    ignitionOn: position.ignitionOn(),
    inMotion: position.inMotion(),
    mileage: formatLength(position.mileage()),
    power: formatVoltage(position.power()),
    timestamp: formatDateTime(position.timestamp().fixationTime()),
  };
}

export function adaptRoutePositions(
  positions: RoutePosition[],
  formatters: PositionFormatters,
): RoutePositionData[] {
  return positions.map((position) => adaptRoutePosition(position, formatters));
}
