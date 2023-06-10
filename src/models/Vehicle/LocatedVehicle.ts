import { z } from 'zod';
import { BaseVehicle, BaseVehicleAttributesValidation } from './BaseVehicle';
import { Speed, Angle, Length } from '../../lib/MeasurementUnit';
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
  });

export type LocatedVehicleAttributes = z.infer<
  typeof LocatedVehicleAttributesValidation
>;

export abstract class LocatedVehicle extends BaseVehicle {
  protected readonly attributes: LocatedVehicleAttributes;

  public constructor(attributes: LocatedVehicleAttributes) {
    const validatedAttributes =
      LocatedVehicleAttributesValidation.parse(attributes);

    super(validatedAttributes);
    this.attributes = validatedAttributes;
  }

  public position(): Position {
    return this.attributes.position;
  }

  public course(): Angle.BaseAngle {
    return this.attributes.course;
  }

  public speed(): Speed.BaseSpeed {
    return this.attributes.speed;
  }

  public isOnline(): boolean {
    return this.attributes.online;
  }

  public hasIgnitionTurnedOn(): boolean {
    return this.attributes.ignitionOn;
  }

  public isInMotion(): boolean {
    return this.attributes.inMotion;
  }

  public lastUpdatedAt(): Date {
    return this.position().timestamp().fixationTime();
  }

  public mileage(): Length.BaseLength {
    return this.attributes.mileage;
  }
}
