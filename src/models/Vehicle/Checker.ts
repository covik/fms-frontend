import { BaseVehicle } from './BaseVehicle';
import { OperationalVehicle, TimedOutVehicle } from './Vehicle';

export function isBaseVehicle(vehicle: unknown): vehicle is BaseVehicle {
  return vehicle instanceof BaseVehicle;
}

export function isOperationalVehicle(
  vehicle: unknown,
): vehicle is OperationalVehicle {
  return vehicle instanceof OperationalVehicle;
}

export function isTimedOutVehicle(
  vehicle: unknown,
): vehicle is TimedOutVehicle {
  return vehicle instanceof TimedOutVehicle;
}
