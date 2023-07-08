import { BaseVoltage } from './voltage';

export function format(voltage: BaseVoltage): string {
  const value = voltage.value().toFixed(1);
  return `${value} ${voltage.symbol()}`;
}
