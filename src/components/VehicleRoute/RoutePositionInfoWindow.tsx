import { PositionInfoWindow } from '#ui/organisms';
import { useDateTime } from '../../foundation';
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
      mileage={Length.adaptiveFormat(position.mileage(), 1)}
      ignition={position.ignitionOn()}
      movement={position.inMotion()}
    />
  );
}
