import { SpeedUnit } from '../Interface';

export abstract class BaseSpeed implements SpeedUnit {
  private readonly _value: number;

  public constructor(value: number) {
    this._value = value;
  }

  public value(): number {
    return this._value;
  }

  public abstract symbol(): string;
}
