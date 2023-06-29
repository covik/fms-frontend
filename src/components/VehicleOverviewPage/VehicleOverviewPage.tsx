import { Outlet, useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import {
  VehicleOverviewView,
  VehicleLoadingIndicator,
} from './VehicleOverviewView';
import { LocatedVehicle } from '../../models/Vehicle';
import { VehicleNavigation, VehicleWarning } from '#ui/molecules';

export function VehicleOverviewPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });

  const { error, data: vehicle } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new Vehicle.NotFoundException();
      }

      return vehicle;
    },
  });

  if (error instanceof Vehicle.NotFoundException)
    return <div>Vozilo nije pronađeno</div>;
  if (vehicle === undefined) return <VehicleLoadingIndicator />;

  return (
    <VehicleOverviewView title={vehicle.name()}>
      {vehicle instanceof LocatedVehicle ? (
        <>
          <VehicleNavigation vehicleId={vehicleId} />
          <Outlet />
        </>
      ) : (
        <VehicleWarning type={'no-position'} />
      )}
    </VehicleOverviewView>
  );
}
