import { BaseSpeed } from '.';

export function format(unit: BaseSpeed) {
  const symbol = unit.symbol();
  const value = unit.value();
  if (value === 0) return `0 ${symbol}`;

  const noDecimalsValue = Math.round(value);
  return `${noDecimalsValue} ${symbol}`;
}
