import { BaseVoltage } from './Voltage';

export function format(voltage: BaseVoltage): string {
  const value = voltage.value().toFixed(1);
  return `${value} ${voltage.symbol()}`;
}
