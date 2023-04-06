import { BaseSpeed } from './BaseSpeed';

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
