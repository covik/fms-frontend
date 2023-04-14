import { InvalidPositionAttribute } from './Exception';

export interface PositionAttributes {
  id: string;
  latitude: number;
  longitude: number;
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

    if (!Object.prototype.hasOwnProperty.call(attributes, 'latitude')) {
      throw new InvalidPositionAttribute(
        'Property "latitude" is not passed to constructor.',
      );
    }

    if (!Object.prototype.hasOwnProperty.call(attributes, 'longitude')) {
      throw new InvalidPositionAttribute(
        'Property "longitude" is not passed to constructor.',
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

    this._attributes = attributes;
  }

  public id(): string {
    return this._attributes.id;
  }

  public latitude(): number {
    return this._attributes.latitude;
  }

  public longitude(): number {
    return this._attributes.longitude;
  }

  public altitude(): number {
    return this._attributes.altitude;
  }
}
