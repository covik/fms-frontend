import { VoltageUnit } from '../Interface';

export abstract class BaseVoltage implements VoltageUnit {
  private readonly _value: number;

  public constructor(value: number) {
    this._value = value;
  }

  public value(): number {
    return this._value;
  }

  public abstract symbol(): string;
}

export class Volt extends BaseVoltage {
  public symbol(): string {
    return 'V';
  }
}
