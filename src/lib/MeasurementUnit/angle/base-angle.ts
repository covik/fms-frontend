import { AngleUnit } from '../interface';

export abstract class BaseAngle implements AngleUnit {
  private readonly _value: number;

  public constructor(value: number) {
    this._value = value;
  }

  public value(): number {
    return this._value;
  }

  public abstract symbol(): string;
}
