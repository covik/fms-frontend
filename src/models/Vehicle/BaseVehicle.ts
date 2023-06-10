import { z } from 'zod';

export const BaseVehicleAttributesValidation = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  imei: z.string().trim().min(1),
});

export type BaseVehicleAttributes = z.infer<
  typeof BaseVehicleAttributesValidation
>;

export abstract class BaseVehicle {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _imei: string;

  public constructor(attributes: BaseVehicleAttributes) {
    const { id, name, imei } =
      BaseVehicleAttributesValidation.parse(attributes);
    this._id = id;
    this._name = name;
    this._imei = imei;
  }

  public id(): string {
    return this._id;
  }

  public name(): string {
    return this._name;
  }

  public imei(): string {
    return this._imei;
  }
}
