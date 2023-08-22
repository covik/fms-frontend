import { VehicleItem } from './vehicle-item';
import { useVehicleRenderer } from './vehicle-renderer';
import type { LocatedVehicle } from '../../../models/vehicle';

const defaultShareHandler = () => {};

export interface VehicleListAttributes {
  vehicles: LocatedVehicle[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  const renderVehicle = useVehicleRenderer();

  return (
    <>
      {vehicles.map((vehicle) =>
        renderVehicle(
          (shareHandler) => (
            <VehicleItem
              vehicle={vehicle}
              key={vehicle.id()}
              shareHandler={shareHandler ?? defaultShareHandler}
            />
          ),
          vehicle,
        ),
      )}
    </>
  );
}
