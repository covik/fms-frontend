import { DisabledVehicle, UnavailableVehicle } from '../../models/vehicle';
import type {
  VehicleCondition,
  MinimalVehicle,
  VehicleIgnitionState,
  VehicleLocation,
  VehicleMovementState,
  VehicleTracker,
  VehicleCourse,
  VehiclePower,
  VehicleSpeed,
  VehicleFormatters,
} from '../types/vehicle';
import type { LocatedVehicle } from '../../models/vehicle';

interface Vehicle
  extends MinimalVehicle,
    VehicleTracker,
    VehicleLocation,
    VehicleIgnitionState,
    VehicleMovementState,
    VehicleCourse,
    VehicleCondition,
    VehiclePower,
    VehicleSpeed {}

function adaptLocatedVehicleModel(
  vehicle: LocatedVehicle,
  formatters: VehicleFormatters,
): Vehicle {
  let condition: VehicleCondition['condition'] = 'none';
  if (vehicle instanceof UnavailableVehicle) condition = 'unavailable';
  else if (vehicle instanceof DisabledVehicle) condition = 'disabled';

  const { formatPower, formatSpeed } = formatters;

  return {
    id: vehicle.id(),
    name: vehicle.name(),
    uniqueId: vehicle.imei(),
    latitude: vehicle.position().latitude(),
    longitude: vehicle.position().longitude(),
    ignitionOn: vehicle.hasIgnitionTurnedOn(),
    inMotion: vehicle.isInMotion(),
    courseInDegrees: vehicle.course().value(),
    power: formatPower(vehicle.power()),
    speed: formatSpeed(vehicle.speed()),
    condition,
  };
}
export function adaptLocatedVehicles(
  vehicles: LocatedVehicle[],
  formatters: VehicleFormatters,
): Vehicle[] {
  return vehicles.map((vehicle) =>
    adaptLocatedVehicleModel(vehicle, formatters),
  );
}
