import { Outlet, useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import { LocatedVehicle } from '../models/vehicle';
import {
  VehicleCommonInterface,
  VehicleLoadingView,
  VehicleWithoutPositionView,
} from '../ui/pages/manage-vehicle';

export function ManageVehicleRootPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });

  const { error, data: vehicle } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new VehicleService.NotFoundException();
      }

      return vehicle;
    },
  });

  if (error instanceof VehicleService.NotFoundException)
    return <div>Vozilo nije pronađeno</div>;
  if (vehicle === undefined) return <VehicleLoadingView />;

  if (!(vehicle instanceof LocatedVehicle))
    return <VehicleWithoutPositionView name={vehicle.name()} />;

  return (
    <VehicleCommonInterface name={vehicle.name()} id={vehicle.id()}>
      <Outlet />
    </VehicleCommonInterface>
  );
}

export default ManageVehicleRootPage;
