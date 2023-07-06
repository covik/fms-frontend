import { z } from 'zod';
import { Length } from '#lib/MeasurementUnit';

export const MileageSummarySchema = z.object({
  vehicleId: z.string().trim().min(1),
  vehicleName: z.string().trim().min(1),
  mileage: z.instanceof(Length.BaseLength),
  odometer: z.instanceof(Length.BaseLength),
});

export type MileageSummaryAttributes = z.infer<typeof MileageSummarySchema>;

export class MileageSummary {
  private _vehicleId: string;
  private _vehicleName: string;
  private _mileage: Length.BaseLength;
  private _odometer: Length.BaseLength;

  public constructor(attributes: MileageSummaryAttributes) {
    const validatedAttributes = MileageSummarySchema.parse(attributes);
    this._vehicleId = validatedAttributes.vehicleId;
    this._vehicleName = validatedAttributes.vehicleName;
    this._mileage = validatedAttributes.mileage;
    this._odometer = validatedAttributes.odometer;
  }

  public vehicleId(): string {
    return this._vehicleId;
  }

  public vehicleName(): string {
    return this._vehicleName;
  }

  public mileage(): Length.BaseLength {
    return this._mileage;
  }

  public odometer(): Length.BaseLength {
    return this._odometer;
  }
}
