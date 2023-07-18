import { Degree } from './degree';

export const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
export type DirectionsUnion = (typeof directions)[number];

export function formatCardinalDirection(degree: Degree) {
  let angle = degree.value();
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
}
