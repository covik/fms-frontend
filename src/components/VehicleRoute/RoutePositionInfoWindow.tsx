import { useDateTime } from '../../foundation';
import { PositionInfoWindow } from '../PositionInfoWindow';
import { Length, Speed, Voltage } from '../../lib/MeasurementUnit';
import type { RoutePosition } from '../../models/Position';

interface RoutePositionInfoWindowAttributes {
  position: RoutePosition;
}

export function RoutePositionInfoWindow({
  position,
}: RoutePositionInfoWindowAttributes) {
  const { formatDateTime } = useDateTime();

  return (
    <PositionInfoWindow
      coordinates={position.coordinates()}
      date={formatDateTime(position.timestamp().fixationTime())}
      speed={Speed.format(Speed.convert(position.speed()).toKph())}
      voltage={Voltage.format(position.power())}
      mileage={Length.adaptiveFormat(position.mileage())}
      ignitionColor={position.ignitionOn() ? 'green' : 'orange'}
      movementColor={position.inMotion() ? 'green' : 'orange'}
    />
  );
}
