import type { BaseVehicle } from '../../models/Vehicle';

export function sortAscendingByName<T extends BaseVehicle>(vehicles: T[]): T[] {
  const vehicleCopy = vehicles.slice();
  vehicleCopy.sort((vehicleA, vehicleB) =>
    vehicleA.name() > vehicleB.name() ? 1 : -1,
  );
  return vehicleCopy;
}
