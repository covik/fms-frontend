import {
  InvalidLatitudeException,
  InvalidLongitudeException,
} from './Exception';

export class Coordinates {
  private readonly _latitude: number;
  private readonly _longitude: number;

  public constructor(latitude: number, longitude: number) {
    if (typeof latitude !== 'number') {
      throw new InvalidLatitudeException(
        `Latitude should be a number. Got ${typeof latitude}.`,
      );
    }

    if (typeof longitude !== 'number') {
      throw new InvalidLongitudeException(
        `Longitude should be a number. Got ${typeof longitude}.`,
      );
    }

    if (latitude > 90 || latitude < -90)
      throw new InvalidLatitudeException(
        `Latitude must be between -90 and 90. Got ${latitude}.`,
      );

    if (longitude > 180 || longitude < -180)
      throw new InvalidLongitudeException(
        `Longitude must be between -180 and 180. Got ${longitude}.`,
      );

    this._latitude = latitude;
    this._longitude = longitude;
  }

  public latitude(): number {
    return this._latitude;
  }

  public longitude(): number {
    return this._longitude;
  }

  public toString(): string {
    return `${this.latitude()}, ${this.longitude()}`;
  }

  public toGoogleMapsUrl(): string {
    const coordinatesToString = this.toString().replaceAll(' ', '');
    const urlEncodedCoordinates = encodeURIComponent(coordinatesToString);

    return `https://www.google.com/maps/search/?api=1&query=${urlEncodedCoordinates}`;
  }
}
