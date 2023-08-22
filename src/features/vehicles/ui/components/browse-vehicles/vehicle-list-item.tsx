import { VehicleCard } from '../vehicle-card';
import { Truck, TruckFast } from 'mdi-material-ui';
import { useVehicleRenderer } from './vehicle-renderer';
import type { Vehicle } from './types';

export interface VehicleListItemAttributes {
  vehicle: Vehicle;
}

export function VehicleListItem({ vehicle }: VehicleListItemAttributes) {
  const { shareHandler } = useVehicleRenderer();

  return (
    <VehicleCard
      title={vehicle.name}
      icon={vehicle.inMotion ? TruckFast : Truck}
      color={vehicle.ignitionOn ? 'green' : 'orange'}
      meta={[vehicle.speed, vehicle.power]}
      onShare={(e) => {
        e.preventDefault();
        shareHandler(vehicle);
      }}
    />
  );
}
