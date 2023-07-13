import { DisabledVehicle, UnavailableVehicle } from '../../models/vehicle';
import type {
  VehicleCondition,
  MinimalVehicle,
  VehicleIgnitionState,
  VehicleLocation,
  VehicleMovementState,
  VehicleTracker,
  VehicleCourse,
} from '../types/vehicle';
import type { LocatedVehicle } from '../../models/vehicle';

interface Vehicle
  extends MinimalVehicle,
    VehicleTracker,
    VehicleLocation,
    VehicleIgnitionState,
    VehicleMovementState,
    VehicleCourse,
    VehicleCondition {}

function adaptLocatedVehicleModel(vehicle: LocatedVehicle): Vehicle {
  let condition: VehicleCondition['condition'] = 'none';
  if (vehicle instanceof UnavailableVehicle) condition = 'unavailable';
  else if (vehicle instanceof DisabledVehicle) condition = 'disabled';

  return {
    id: vehicle.id(),
    name: vehicle.name(),
    uniqueId: vehicle.imei(),
    latitude: vehicle.position().latitude(),
    longitude: vehicle.position().longitude(),
    ignitionOn: vehicle.hasIgnitionTurnedOn(),
    inMotion: vehicle.isInMotion(),
    courseInDegrees: vehicle.course().value(),
    condition,
  };
}

export function adaptLocatedVehicles<
  Variant extends LocatedVehicle | LocatedVehicle[],
>(vehicles: Variant): Variant extends LocatedVehicle ? Vehicle : Vehicle[];
export function adaptLocatedVehicles(
  vehicles: LocatedVehicle | LocatedVehicle[],
): Vehicle | Vehicle[] {
  const vehicleList = Array.isArray(vehicles) ? vehicles : [vehicles];
  const adaptedVehicles: Vehicle[] = vehicleList.map(adaptLocatedVehicleModel);
  return adaptedVehicles.length === 1 ? adaptedVehicles[0] : adaptedVehicles;
}
