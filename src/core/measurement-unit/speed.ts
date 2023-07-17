import { Speed } from '#lib/measurement-unit';

export interface SpeedAPI {
  formatSpeed: (value: Speed.BaseSpeed) => string;
}

export function useSpeed(): SpeedAPI {
  return {
    formatSpeed: (value) => {
      const inUserUnit = Speed.convert(value).toKph(); // hardcoded until need arises
      return Speed.format(inUserUnit);
    },
  };
}
