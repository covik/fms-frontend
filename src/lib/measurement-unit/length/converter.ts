import { BaseLength, Kilometer, Meter } from './length';
import { UnsupportedConversionUnit } from './exception';

export function convertToMeters(length: BaseLength): Meter {
  if (length instanceof Meter) return length;
  if (length instanceof Kilometer) return new Meter(length.value() * 1000);

  throw new UnsupportedConversionUnit();
}

export function convertToKilometers(length: BaseLength): Kilometer {
  if (length instanceof Kilometer) return length;
  if (length instanceof Meter) return new Kilometer(length.value() / 1000);

  throw new UnsupportedConversionUnit();
}
