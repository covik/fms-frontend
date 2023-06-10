import { z } from 'zod';

export const BaseVehicleAttributesValidation = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  imei: z.string().trim().min(1),
});

export type BaseVehicleAttributes = z.infer<
  typeof BaseVehicleAttributesValidation
>;

export class BaseVehicle {
  protected readonly attributes: BaseVehicleAttributes;

  public constructor(attributes: BaseVehicleAttributes) {
    const validatedAttributes =
      BaseVehicleAttributesValidation.parse(attributes);
    this.attributes = validatedAttributes;
  }

  public id(): string {
    return this.attributes.id;
  }

  public name(): string {
    return this.attributes.name;
  }

  public imei(): string {
    return this.attributes.imei;
  }
}
