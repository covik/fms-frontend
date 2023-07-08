import { faker } from '@faker-js/faker';
import { Position } from '.';
import { createPositionTimestamps } from './position-timestamps/factory';
import { Coordinates } from '#lib/dimension';

export function createPosition() {
  const id = faker.string.uuid();
  const timestamps = createPositionTimestamps();
  const coordinates = new Coordinates(
    faker.number.float({ min: 45, max: 46, precision: 0.0000001 }),
    faker.number.float({ min: 15, max: 16, precision: 0.0000001 }),
  );
  const altitude = faker.number.int({ min: -10, max: 1500 });

  return new Position({
    id,
    timestamps,
    coordinates,
    altitude,
  });
}
