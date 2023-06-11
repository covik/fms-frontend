import {
  isOperationalVehicle,
  isUnavailableVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../models/Vehicle';

export function takeOnlyOperational(data: unknown): OperationalVehicle[] {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `Argument "data" should be array, received: ${typeof data}.`,
    );
  }

  return data.filter(isOperationalVehicle);
}

export function takeOnlyTimedOut(data: unknown): UnavailableVehicle[] {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `Argument "data" should be array, received: ${typeof data}.`,
    );
  }

  return data.filter(isUnavailableVehicle);
}
