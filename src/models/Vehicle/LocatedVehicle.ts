import { BaseVehicle } from './BaseVehicle';
import { Speed, Angle } from '../../lib/MeasurementUnit';
import { Position } from '../Position';
import { InvalidVehicleAttribute } from './Exception';
import type { BaseVehicleAttributes } from './BaseVehicle';

export interface LocatedVehicleAttributes extends BaseVehicleAttributes {
  position: Position;
  course: Angle.BaseAngle;
  speed: Speed.BaseSpeed;
  online: boolean;
  ignitionOn: boolean;
  inMotion: boolean;
}

export abstract class LocatedVehicle extends BaseVehicle {
  public constructor(protected attributes: LocatedVehicleAttributes) {
    const requiredAttributes = [
      'position',
      'course',
      'speed',
      'online',
      'ignitionOn',
      'inMotion',
    ];

    requiredAttributes.forEach((attribute) => {
      if (!Object.prototype.hasOwnProperty.call(attributes, attribute)) {
        throw new InvalidVehicleAttribute(
          `Property "${attribute}" not passed to constructor.`,
        );
      }
    });

    if (!(attributes.position instanceof Position)) {
      throw new InvalidVehicleAttribute(
        `Property "position" must be Position object. Got ${typeof attributes.position}.`,
      );
    }

    if (!(attributes.course instanceof Angle.BaseAngle)) {
      throw new InvalidVehicleAttribute(
        `Property "course" must be BaseAngle object. Got ${typeof attributes.course}.`,
      );
    }

    if (!(attributes.speed instanceof Speed.BaseSpeed)) {
      throw new InvalidVehicleAttribute(
        `Property "speed" must be BaseSpeed object. Got ${typeof attributes.speed}.`,
      );
    }

    if (typeof attributes.online !== 'boolean') {
      throw new InvalidVehicleAttribute(
        `Property "online" must be boolean. Got ${typeof attributes.online}.`,
      );
    }

    if (typeof attributes.ignitionOn !== 'boolean') {
      throw new InvalidVehicleAttribute(
        `Property "ignitionOn" must be boolean. Got ${typeof attributes.ignitionOn}.`,
      );
    }

    if (typeof attributes.inMotion !== 'boolean') {
      throw new InvalidVehicleAttribute(
        `Property "inMotion" must be boolean. Got ${typeof attributes.inMotion}.`,
      );
    }

    super(attributes);
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
}
