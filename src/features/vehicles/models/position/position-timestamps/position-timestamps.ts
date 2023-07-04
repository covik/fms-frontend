import { differenceInSeconds } from 'date-fns';
import { InvalidPositionTimestampException } from './exception';

export class PositionTimestamps {
  private readonly _fixTime: Date;
  private readonly _deviceTime: Date;
  private readonly _serverTime: Date;

  public constructor(fixTime: Date, deviceTime: Date, serverTime: Date) {
    // TODO: validate each Date is correct
    // TODO: validate fixTime >= deviceTime, deviceTime >= serverTime

    if (!(fixTime instanceof Date)) {
      throw new InvalidPositionTimestampException(
        'Attribute "fixTime" should be Date object.',
      );
    }

    if (!(deviceTime instanceof Date)) {
      throw new InvalidPositionTimestampException(
        'Attribute "deviceTime" should be Date object.',
      );
    }

    if (!(serverTime instanceof Date)) {
      throw new InvalidPositionTimestampException(
        'Attribute "serverTime" should be Date object.',
      );
    }

    this._fixTime = fixTime;
    this._deviceTime = deviceTime;
    this._serverTime = serverTime;
  }

  public fixationTime(): Date {
    return this._fixTime;
  }

  public deviceTime(): Date {
    return this._deviceTime;
  }

  public serverTime(): Date {
    return this._serverTime;
  }

  public latencyInSeconds(): number {
    return differenceInSeconds(this.serverTime(), this.fixationTime());
  }
}
