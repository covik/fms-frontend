import { Length } from '#lib/measurement-unit';
import { useMeasurementUnit } from './context';

export interface LengthAPI {
  formatLength: (value: Length.BaseLength) => string;
  formatLengthProgressive: (value: Length.BaseLength) => string;
}

export function useLength(): LengthAPI {
  const { precision } = useMeasurementUnit();

  return {
    formatLength: (value) => Length.format(value, precision),
    formatLengthProgressive: (value) => Length.adaptiveFormat(value, precision),
  };
}
