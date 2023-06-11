import { addSeconds } from 'date-fns';
import { faker } from '@faker-js/faker';
import { PositionTimestamps } from '.';

export function createPositionTimestamps() {
  const fixTime = faker.date.recent();
  const deviceTime = fixTime;
  const serverTime = faker.date.between({
    from: fixTime,
    to: addSeconds(fixTime, 5),
  });

  return new PositionTimestamps(fixTime, deviceTime, serverTime);
}
