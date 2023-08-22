import { VehicleItem } from './vehicle-item';
import { useVehicleRenderer } from './vehicle-renderer';
import type { LocatedVehicle } from '../../../models/vehicle';

export interface VehicleListAttributes {
  vehicles: LocatedVehicle[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  const { renderer: renderVehicle } = useVehicleRenderer();

  return (
    <>
      {vehicles.map((vehicle) =>
        renderVehicle(
          <VehicleItem vehicle={vehicle} key={vehicle.id()} />,
          vehicle,
        ),
      )}
    </>
  );
}
