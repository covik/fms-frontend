import { VehiclesDigestView, PageContainer } from './VehiclesDigestView';
import { VehiclesDigestSkeleton } from './VehiclesDigestSkeleton';
import { Vehicle } from '../../lib/VehicleService';
import { OperationalVehicle } from '../../models/Vehicle';
import { Truck, TruckFast } from 'mdi-material-ui';
import { formatDistanceToNowStrict } from 'date-fns';
import { hr } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function VehiclesDigestPage() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: async ({ signal }) => {
      const vehicles = await Vehicle.fetchAll(signal);
      return vehicles.filter(
        (vehicle): vehicle is OperationalVehicle =>
          vehicle instanceof OperationalVehicle,
      );
    },
    refetchInterval: 2000,
  });

  if (query.data === undefined)
    return (
      <PageContainer>
        <VehiclesDigestSkeleton />
      </PageContainer>
    );

  return <OperationalVehiclesList vehicles={query.data} />;
}

function OperationalVehiclesList({
  vehicles,
}: {
  vehicles: OperationalVehicle[];
}) {
  const sortedVehicles = useMemo(() => {
    const vehicleCopy = vehicles.slice();
    vehicleCopy.sort((vehicleA, vehicleB) =>
      vehicleA.name() > vehicleB.name() ? 1 : -1,
    );
    return vehicleCopy;
  }, [vehicles]);

  const vehiclesAdaptedToView = useMemo(
    () =>
      sortedVehicles.map((vehicle) => ({
        id: vehicle.id(),
        title: vehicle.name(),
        color: vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange',
        icon: vehicle.isInMotion() ? TruckFast : Truck,
        subtitle: formatDistanceToNowStrict(vehicle.lastUpdatedAt(), {
          addSuffix: true,
          locale: hr,
        }),
      })),
    [sortedVehicles],
  );

  return (
    <VehiclesDigestView
      operationalVehicles={vehiclesAdaptedToView}
      timedOutVehicles={[]}
    />
  );
}
