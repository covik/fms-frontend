import { BaseVehicle } from './BaseVehicle';

export function isBaseVehicle(vehicle: unknown): vehicle is BaseVehicle {
  return vehicle instanceof BaseVehicle;
}
