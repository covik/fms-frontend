import type { Vehicle as BaseVehicle } from '../../components/browse-vehicles';
import type { VehicleCourse } from '../../types/vehicle';

export interface Vehicle extends BaseVehicle, VehicleCourse {}
export interface Vehicles extends Array<Vehicle> {}
