import { z } from 'zod';
import { BaseLength } from '.';

export function format(length: BaseLength, precision = 0): string {
  z.instanceof(BaseLength).parse(length);

  const valueFixed = length.value().toFixed(precision);

  return `${valueFixed} ${length.symbol()}`;
}
