import { LengthUnit } from '../Interface';

export abstract class BaseLength implements LengthUnit {
  private readonly _value: number;

  public constructor(value: number) {
    this._value = value;
  }

  public value(): number {
    return this._value;
  }

  public abstract symbol(): string;
}

export class Meter extends BaseLength {
  public symbol(): string {
    return 'm';
  }
}

export class Kilometer extends BaseLength {
  public symbol(): string {
    return 'km';
  }
}
