import { BaseVehicle } from './BaseVehicle';
import {
  DisabledVehicle,
  OperationalVehicle,
  TimedOutVehicle,
} from './Vehicle';

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

export function isDisabledVehicle(
  vehicle: unknown,
): vehicle is DisabledVehicle {
  return vehicle instanceof DisabledVehicle;
}
