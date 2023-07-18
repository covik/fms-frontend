import { Angle } from '#lib/measurement-unit';

const croatianDirections: Record<Angle.DirectionsUnion, string> = {
  N: 'Sjever',
  NE: 'Sjeveroistok',
  NW: 'Sjeverozapad',
  S: 'Jug',
  SE: 'Jugoistok',
  SW: 'Jugozapad',
  W: 'Zapad',
  E: 'Istok',
};

export interface AngleAPI {
  formatCardinalDirection: (value: Angle.BaseAngle) => string;
}

export function useAngle(): AngleAPI {
  return {
    formatCardinalDirection: (value) => {
      const englishDirection = Angle.formatCardinalDirection(value);
      return croatianDirections[englishDirection];
    },
  };
}
