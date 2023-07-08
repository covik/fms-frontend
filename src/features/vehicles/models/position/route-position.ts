import { z } from 'zod';
import { Position, PositionAttributesValidation } from './position';
import { Angle, Length, Speed, Voltage } from '#lib/measurement-unit';

export const RoutePositionAttributesValidation =
  PositionAttributesValidation.extend({
    speed: z.instanceof(Speed.BaseSpeed),
    heading: z.instanceof(Angle.BaseAngle),
    ignitionOn: z.boolean(),
    inMotion: z.boolean(),
    power: z.instanceof(Voltage.BaseVoltage),
    mileage: z.instanceof(Length.BaseLength),
    distance: z.instanceof(Length.BaseLength),
  });

export type RoutePositionAttributes = z.infer<
  typeof RoutePositionAttributesValidation
>;

export class RoutePosition extends Position {
  protected _attributes: RoutePositionAttributes;

  public constructor(attributes: RoutePositionAttributes) {
    super(attributes);
    this._attributes = RoutePositionAttributesValidation.parse(attributes);
  }

  public speed(): Speed.BaseSpeed {
    return this._attributes.speed;
  }

  public heading(): Angle.BaseAngle {
    return this._attributes.heading;
  }

  public ignitionOn(): boolean {
    return this._attributes.ignitionOn;
  }

  public inMotion(): boolean {
    return this._attributes.inMotion;
  }

  public power(): Voltage.BaseVoltage {
    return this._attributes.power;
  }

  public mileage(): Length.BaseLength {
    return this._attributes.mileage;
  }

  public distance(): Length.BaseLength {
    return this._attributes.distance;
  }
}
