import { BaseVehicle } from './BaseVehicle';
import { OperationalVehicle } from './Vehicle';

export function isBaseVehicle(vehicle: unknown): vehicle is BaseVehicle {
  return vehicle instanceof BaseVehicle;
}

export function isOperationalVehicle(
  vehicle: unknown,
): vehicle is OperationalVehicle {
  return vehicle instanceof OperationalVehicle;
}
