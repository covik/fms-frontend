import { Voltage } from '#lib/measurement-unit';

export interface VoltageAPI {
  formatVoltage: (value: Voltage.BaseVoltage) => string;
}

export function useVoltage(): VoltageAPI {
  return {
    formatVoltage: (value) => Voltage.format(value),
  };
}
