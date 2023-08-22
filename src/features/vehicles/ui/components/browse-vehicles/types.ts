import {
  MinimalVehicle,
  VehicleCondition,
  VehicleIgnitionState,
  VehicleLocation,
  VehicleMovementState,
  VehiclePower,
  VehicleSpeed,
} from '../../types/vehicle';

export interface Vehicle
  extends MinimalVehicle,
    VehicleLocation,
    VehicleCondition,
    VehicleIgnitionState,
    VehicleMovementState,
    VehiclePower,
    VehicleSpeed {}
