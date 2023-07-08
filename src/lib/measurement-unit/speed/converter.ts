import { BaseSpeed, Knots, KPH, MPH } from './speed';

interface AvailableConverters {
  toKph: () => KPH;
  toMph: () => MPH;
  toKnots: () => Knots;
}

export function convert(value: BaseSpeed): AvailableConverters {
  return {
    toKph: () => {
      if (value instanceof KPH) return value;
      if (value instanceof MPH) return new KPH(value.value() * 1.609);
      if (value instanceof Knots) return new KPH(value.value() * 1.852);

      return new KPH(0);
    },
    toMph: () => {
      if (value instanceof MPH) return value;
      if (value instanceof KPH) return new MPH(value.value() / 1.609);
      if (value instanceof Knots) return new MPH(value.value() * 1.151);

      return new MPH(0);
    },
    toKnots: () => {
      if (value instanceof Knots) return value;
      if (value instanceof KPH) return new Knots(value.value() / 1.852);
      if (value instanceof MPH) return new Knots(value.value() / 1.151);

      return new Knots(0);
    },
  };
}
