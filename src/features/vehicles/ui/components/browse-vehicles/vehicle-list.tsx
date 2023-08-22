import { VehicleListItem } from './vehicle-list-item';
import { useVehicleRenderer } from './vehicle-renderer';
import type { LocatedVehicle } from '../../../models/vehicle';

export interface VehicleListAttributes {
  vehicles: LocatedVehicle[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  const { Renderer } = useVehicleRenderer();

  return (
    <>
      {vehicles.map((vehicle) => (
        <Renderer vehicle={vehicle} key={vehicle.id()}>
          <VehicleListItem vehicle={vehicle} />
        </Renderer>
      ))}
    </>
  );
}
