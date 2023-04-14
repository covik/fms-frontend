import { BaseLength } from './BaseLength';

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
