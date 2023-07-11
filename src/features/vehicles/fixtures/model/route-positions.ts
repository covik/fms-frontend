import { Coordinates } from '#lib/dimension';
import { Angle, Length, Speed, Voltage } from '#lib/measurement-unit';
import { PositionTimestamps, RoutePosition } from '../../models/position';
import positions from '../raw/route-positions';

export default positions.map(
  (position) =>
    new RoutePosition({
      id: String(position.id),
      altitude: position.altitude,
      coordinates: new Coordinates(position.latitude, position.longitude),
      timestamps: new PositionTimestamps(
        new Date(position.fixTime),
        new Date(position.deviceTime),
        new Date(position.serverTime),
      ),
      speed: new Speed.Knots(position.speed),
      heading: new Angle.Degree(position.course),
      ignitionOn: position.attributes.ignition,
      inMotion: position.attributes.motion,
      power: new Voltage.Volt(position.attributes.power),
      mileage: new Length.Meter(position.attributes.totalDistance),
      distance: new Length.Meter(position.attributes.distance),
    }),
);
