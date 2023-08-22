import { VehicleItem } from './vehicle-item';
import { useVehicleRenderer } from './vehicle-item-renderer';
import type { LocatedVehicle } from '../../../models/vehicle';

export interface VehicleListAttributes {
  vehicles: LocatedVehicle[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  const { Item } = useVehicleRenderer();

  return (
    <>
      {vehicles.map((vehicle) => (
        <Item vehicle={vehicle} key={vehicle.id()}>
          <VehicleItem vehicle={vehicle} />
        </Item>
      ))}
    </>
  );
}
