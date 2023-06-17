import { BaseLength, Kilometer, Meter } from './Length';
import { UnsupportedConversionUnit } from './Exception';

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
