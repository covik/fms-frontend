import { VehiclesDigestView, PageContainer } from './VehiclesDigestView';
import { VehiclesDigestSkeleton } from './VehiclesDigestSkeleton';
import { Vehicle } from '../../lib/VehicleService';
import { BaseVehicle, LocatedVehicle } from '../../models/Vehicle';
import { Truck, TruckFast } from 'mdi-material-ui';
import { formatDistanceToNowStrict } from 'date-fns';
import { hr } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function VehiclesDigestPage() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    refetchInterval: 2000,
  });

  if (query.data === undefined)
    return (
      <PageContainer>
        <VehiclesDigestSkeleton />
      </PageContainer>
    );

  return <VehicleView vehicles={query.data} />;
}

function VehicleView({ vehicles }: { vehicles: BaseVehicle[] }) {
  const sortedVehicles = useMemo(() => {
    const vehicleCopy = vehicles.slice();
    vehicleCopy.sort((vehicleA, vehicleB) =>
      vehicleA.name() > vehicleB.name() ? 1 : -1,
    );
    return vehicleCopy;
  }, [vehicles]);

  const operationalVehicles = useMemo(
    () => Vehicle.takeOnlyOperational(sortedVehicles),
    [sortedVehicles],
  );

  const timedOutVehicles = useMemo(
    () => Vehicle.takeOnlyTimedOut(sortedVehicles),
    [sortedVehicles],
  );

  const operationalVehiclesAdaptedToView = useMemo(
    () => operationalVehicles.map(adaptLocatedVehicleToView),
    [operationalVehicles],
  );

  const timesOutVehiclesAdaptedToView = useMemo(
    () => timedOutVehicles.map(adaptLocatedVehicleToView),
    [timedOutVehicles],
  );

  return (
    <VehiclesDigestView
      operationalVehicles={operationalVehiclesAdaptedToView}
      timedOutVehicles={timesOutVehiclesAdaptedToView}
    />
  );
}

function adaptLocatedVehicleToView(vehicle: LocatedVehicle) {
  return {
    id: vehicle.id(),
    title: vehicle.name(),
    color: vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange',
    icon: vehicle.isInMotion() ? TruckFast : Truck,
    subtitle: formatDistanceToNowStrict(vehicle.lastUpdatedAt(), {
      addSuffix: true,
      locale: hr,
    }),
  };
}
