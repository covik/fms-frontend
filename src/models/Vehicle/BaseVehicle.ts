import { InvalidVehicleAttribute } from './Exception';

export interface BaseVehicleAttributes {
  id: string;
  name: string;
  imei: string;
}

const possibleAttributes = ['id', 'name', 'imei'];

export class BaseVehicle {
  public constructor(protected readonly attributes: BaseVehicleAttributes) {
    if (Object.keys(attributes).length === 0)
      throw new InvalidVehicleAttribute(
        'Zero properties passed to constructor.',
      );

    possibleAttributes.forEach((property) => {
      if (!Object.prototype.hasOwnProperty.call(attributes, property)) {
        throw new InvalidVehicleAttribute(
          `Property "${property}" not passed to constructor.`,
        );
      }
    });

    for (const [property, value] of Object.entries(attributes)) {
      if (String(value).trim() === '')
        throw new InvalidVehicleAttribute(
          `Property "${property}" must not be empty string.`,
        );
    }
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
