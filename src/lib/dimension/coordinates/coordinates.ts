import {
  InvalidLatitudeException,
  InvalidLongitudeException,
} from './exception';

export class Coordinates {
  static GOOGLE_MAPS_URL = 'https://www.google.com/maps';

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

    if (latitude > 90 || latitude < -90 || isNaN(latitude))
      throw new InvalidLatitudeException(
        `Latitude must be between -90 and 90. Got ${latitude}.`,
      );

    if (longitude > 180 || longitude < -180 || isNaN(longitude))
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

  public toString(precision = 7): string {
    const latitude = this.latitude().toFixed(precision);
    const longitude = this.longitude().toFixed(precision);

    return `${latitude}, ${longitude}`;
  }

  public toGoogleMapsUrl(): string {
    const coordinatesToString = this.toString().replaceAll(' ', '');

    const urlParams = new URLSearchParams({
      api: '1',
      query: coordinatesToString,
    });

    return `${Coordinates.GOOGLE_MAPS_URL}/search/?${urlParams.toString()}`;
  }

  public toGoogleStreetViewUrl(heading?: number | undefined): string {
    const coordinatesToString = this.toString().replaceAll(' ', '');

    const urlParams = new URLSearchParams({
      api: '1',
      map_action: 'pano',
      viewpoint: coordinatesToString,
      ...(typeof heading === 'number' ? { heading: heading.toString() } : {}),
    });

    return `${Coordinates.GOOGLE_MAPS_URL}/@?${urlParams.toString()}`;
  }
}
