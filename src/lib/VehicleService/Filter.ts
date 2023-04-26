import { isOperationalVehicle, OperationalVehicle } from '../../models/Vehicle';

export function takeOnlyOperational(data: unknown): OperationalVehicle[] {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `Argument "data" should be array, received: ${typeof data}.`,
    );
  }

  return data.filter(isOperationalVehicle);
}
