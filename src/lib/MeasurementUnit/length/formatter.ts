import { z } from 'zod';
import { BaseLength, Kilometer, Meter } from './length';
import { convertToKilometers, convertToMeters } from './converter';

export function format(length: BaseLength, precision = 0): string {
  z.instanceof(BaseLength).parse(length);

  const valueFixed = length.value().toFixed(precision);

  return `${valueFixed} ${length.symbol()}`;
}

export function adaptiveFormat(length: BaseLength, precision = 0): string {
  z.instanceof(BaseLength).parse(length);

  let correctedLength = length;
  if (correctedLength.value() >= 1000 && length instanceof Meter)
    correctedLength = convertToKilometers(length);
  if (correctedLength.value() < 1 && length instanceof Kilometer)
    correctedLength = convertToMeters(length);

  return format(correctedLength, precision);
}
