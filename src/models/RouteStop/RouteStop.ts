import { z } from 'zod';
import { Coordinates } from '../../lib/Dimension';

const RouteStopAttributesValidation = z.object({
  id: z.string().trim().min(1),
  startTime: z.date(),
  endTime: z.date(),
  coordinates: z.instanceof(Coordinates),
  duration: z.number().nonnegative(),
});

export type RouteStopAttributes = z.infer<typeof RouteStopAttributesValidation>;

export class RouteStop {
  private _attributes: RouteStopAttributes;

  public constructor(attributes: RouteStopAttributes) {
    this._attributes = RouteStopAttributesValidation.parse(attributes);
  }

  public id(): string {
    return this._attributes.id;
  }

  public startTime(): Date {
    return this._attributes.startTime;
  }

  public endTime(): Date {
    return this._attributes.endTime;
  }

  public coordinates(): Coordinates {
    return this._attributes.coordinates;
  }

  public duration(): number {
    return this._attributes.duration;
  }
}
