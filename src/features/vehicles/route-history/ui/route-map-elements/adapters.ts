import type {
  PositionUnitConverters,
  RoutePositionData,
  RouteStopData,
  StopUnitConverters,
} from './interface';
import type { RoutePosition } from '../../../models/position';
import type { RouteStop } from '../../../models/route-stop';

export function adaptRoutePositionModel(
  model: RoutePosition,
  unitConverters: PositionUnitConverters,
): RoutePositionData {
  const { formatDateTime, formatMileage, formatSpeed, formatVoltage } =
    unitConverters;

  return {
    id: model.id(),
    latitude: model.latitude(),
    longitude: model.longitude(),
    speed: formatSpeed(model.speed()),
    courseInDegrees: model.heading().value(),
    ignitionOn: model.ignitionOn(),
    inMotion: model.inMotion(),
    mileage: formatMileage(model.mileage()),
    power: formatVoltage(model.power()),
    timestamp: formatDateTime(model.timestamp().fixationTime()),
  };
}

export function adaptRouteStopModel(
  model: RouteStop,
  unitConverters: StopUnitConverters,
): RouteStopData {
  const { formatDuration } = unitConverters;

  return {
    id: model.id(),
    latitude: model.coordinates().latitude(),
    longitude: model.coordinates().longitude(),
    duration: formatDuration(model.duration()),
  };
}
