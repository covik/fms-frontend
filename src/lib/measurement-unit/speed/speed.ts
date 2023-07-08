import { SpeedUnit } from '../interface';

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

export class KPH extends BaseSpeed {
  public symbol(): string {
    return 'km/h';
  }
}

export class MPH extends BaseSpeed {
  public symbol(): string {
    return 'mph';
  }
}

export class Knots extends BaseSpeed {
  public symbol(): string {
    return 'kt';
  }
}
