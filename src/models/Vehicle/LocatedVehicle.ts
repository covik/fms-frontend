import { z } from 'zod';
import { BaseVehicle, BaseVehicleAttributesValidation } from './BaseVehicle';
import { Speed, Angle, Length, Voltage } from '../../lib/MeasurementUnit';
import { Position } from '../Position';

export const LocatedVehicleAttributesValidation =
  BaseVehicleAttributesValidation.extend({
    position: z.instanceof(Position),
    course: z.instanceof(Angle.BaseAngle),
    speed: z.instanceof(Speed.BaseSpeed),
    online: z.boolean(),
    ignitionOn: z.boolean(),
    inMotion: z.boolean(),
    mileage: z.instanceof(Length.BaseLength),
    power: z.instanceof(Voltage.BaseVoltage),
  });

export type LocatedVehicleAttributes = z.infer<
  typeof LocatedVehicleAttributesValidation
>;

export abstract class LocatedVehicle extends BaseVehicle {
  private readonly _position: Position;
  private readonly _course: Angle.BaseAngle;
  private readonly _speed: Speed.BaseSpeed;
  private readonly _online: boolean;
  private readonly _ignitionOn: boolean;
  private readonly _inMotion: boolean;
  private readonly _mileage: Length.BaseLength;
  private readonly _power: Voltage.BaseVoltage;

  public constructor(attributes: LocatedVehicleAttributes) {
    const {
      position,
      course,
      speed,
      online,
      ignitionOn,
      inMotion,
      mileage,
      power,
      ...baseAttributes
    } = LocatedVehicleAttributesValidation.parse(attributes);

    super(baseAttributes);

    this._position = position;
    this._course = course;
    this._speed = speed;
    this._online = online;
    this._ignitionOn = ignitionOn;
    this._inMotion = inMotion;
    this._mileage = mileage;
    this._power = power;
  }

  public position(): Position {
    return this._position;
  }

  public course(): Angle.BaseAngle {
    return this._course;
  }

  public speed(): Speed.BaseSpeed {
    return this._speed;
  }

  public isOnline(): boolean {
    return this._online;
  }

  public hasIgnitionTurnedOn(): boolean {
    return this._ignitionOn;
  }

  public isInMotion(): boolean {
    return this._inMotion;
  }

  public lastUpdatedAt(): Date {
    return this.position().timestamp().fixationTime();
  }

  public mileage(): Length.BaseLength {
    return this._mileage;
  }

  public power(): Voltage.BaseVoltage {
    return this._power;
  }
}
