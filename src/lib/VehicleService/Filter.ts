import {
  isOperationalVehicle,
  isTimedOutVehicle,
  OperationalVehicle,
  TimedOutVehicle,
} from '../../models/Vehicle';

export function takeOnlyOperational(data: unknown): OperationalVehicle[] {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `Argument "data" should be array, received: ${typeof data}.`,
    );
  }

  return data.filter(isOperationalVehicle);
}

export function takeOnlyTimedOut(data: unknown): TimedOutVehicle[] {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `Argument "data" should be array, received: ${typeof data}.`,
    );
  }

  return data.filter(isTimedOutVehicle);
}
