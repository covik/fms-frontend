import { z } from 'zod';
import { Coordinates } from '../../lib/Dimension';
import { PositionTimestamps } from './PositionTimestamps';

export const PositionAttributesValidation = z.object({
  id: z.string().trim().min(1),
  coordinates: z.instanceof(Coordinates),
  altitude: z.number(),
  timestamps: z.instanceof(PositionTimestamps),
});

export type PositionAttributes = z.infer<typeof PositionAttributesValidation>;

export class Position {
  protected _attributes: PositionAttributes;

  public constructor(attributes: PositionAttributes) {
    this._attributes = PositionAttributesValidation.parse(attributes);
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

  public timestamp(): PositionTimestamps {
    return this._attributes.timestamps;
  }
}
