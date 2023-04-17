import { InvalidPositionAttribute } from './Exception';
import { Coordinates } from '../../lib/Dimension';

export interface PositionAttributes {
  id: string;
  coordinates: Coordinates;
  altitude: number;
}

export class Position {
  private _attributes: PositionAttributes;

  public constructor(attributes: PositionAttributes) {
    if (Object.keys(attributes).length === 0) {
      throw new InvalidPositionAttribute(
        'Zero properties passed to constructor.',
      );
    }

    if (!Object.prototype.hasOwnProperty.call(attributes, 'id')) {
      throw new InvalidPositionAttribute(
        'Property "id" is not passed to constructor.',
      );
    }

    if (!Object.prototype.hasOwnProperty.call(attributes, 'coordinates')) {
      throw new InvalidPositionAttribute(
        'Property "coordinates" is not passed to constructor.',
      );
    }

    if (!Object.prototype.hasOwnProperty.call(attributes, 'altitude')) {
      throw new InvalidPositionAttribute(
        'Property "altitude" is not passed to constructor.',
      );
    }

    if (attributes.id.trim() === '') {
      throw new InvalidPositionAttribute(
        'Property "id" must not be empty string.',
      );
    }

    if (!(attributes.coordinates instanceof Coordinates)) {
      throw new InvalidPositionAttribute(
        `Property "coordinates" must be Coordinates object. Got ${typeof attributes.coordinates}.`,
      );
    }

    this._attributes = attributes;
  }

  public id(): string {
    return this._attributes.id;
  }

  public coordinates(): Coordinates {
    return this._attributes.coordinates;
  }

  public latitude(): number {
    return this._attributes.coordinates.latitude();
  }

  public longitude(): number {
    return this._attributes.coordinates.longitude();
  }

  public altitude(): number {
    return this._attributes.altitude;
  }
}
