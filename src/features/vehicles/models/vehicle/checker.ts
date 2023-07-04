import { BaseVehicle } from './base-vehicle';
import {
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from './vehicle';

export function isBaseVehicle(vehicle: unknown): vehicle is BaseVehicle {
  return vehicle instanceof BaseVehicle;
}

export function isOperationalVehicle(
  vehicle: unknown,
): vehicle is OperationalVehicle {
  return vehicle instanceof OperationalVehicle;
}

export function isUnavailableVehicle(
  vehicle: unknown,
): vehicle is UnavailableVehicle {
  return vehicle instanceof UnavailableVehicle;
}

export function isDisabledVehicle(
  vehicle: unknown,
): vehicle is DisabledVehicle {
  return vehicle instanceof DisabledVehicle;
}

export function isVehicleWithoutPosition(
  vehicle: unknown,
): vehicle is NoPositionVehicle {
  return vehicle instanceof NoPositionVehicle;
}
