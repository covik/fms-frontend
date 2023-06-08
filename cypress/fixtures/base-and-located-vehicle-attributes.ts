import { Position, PositionTimestamps } from '../../src/models/Position';
import { Coordinates } from '../../src/lib/Dimension';
import { Angle, Length, Speed } from '../../src/lib/MeasurementUnit';

export const baseVehicleAttrs = { id: '1234', name: 'Test', imei: '4321' };

export const locatedVehicleAttributes = {
  ...baseVehicleAttrs,
  position: new Position({
    id: '1',
    coordinates: new Coordinates(45.501, 15.224),
    altitude: 10,
    timestamps: new PositionTimestamps(
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:05Z'),
    ),
  }),
  course: new Angle.Degree(10),
  speed: new Speed.KPH(40),
  online: false,
  ignitionOn: false,
  inMotion: false,
  mileage: new Length.Kilometer(16500),
};
