import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../../services/vehicle-service';
import { adaptLocatedVehicles } from '../../ui/adapters/vehicle-adapter';
import { MultipleVehiclesTracking } from '../../ui/pages/multiple-vehicles-tracking';
import type { Vehicle } from '../../ui/pages/multiple-vehicles-tracking';

const today = new Date();

export function MultipleVehiclesTrackingPage() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    select: (vehicles) => {
      const operational = VehicleService.takeOnlyOperational(vehicles);
      const unavailable = VehicleService.takeOnlyUnavailable(vehicles);

      const sortedOperational = VehicleService.sortAscendingByName(operational);
      const sortedUnavailable = VehicleService.sortAscendingByName(unavailable);
      return [...sortedOperational, ...sortedUnavailable];
    },
    refetchInterval: 2000,
  });

  const rawVehicles = query.data;

  const adaptedVehicles = useMemo(
    () => (rawVehicles ? adaptLocatedVehicles(rawVehicles) : rawVehicles),
    [rawVehicles],
  );

  const [selectedVehicleId, setSelectedVehicleId] = useState<
    Vehicle['id'] | undefined
  >(undefined);

  function selectOrUnselectVehicle(vehicleId: Vehicle['id']) {
    setSelectedVehicleId((currentSelection) =>
      currentSelection === vehicleId ? undefined : vehicleId,
    );
  }

  return (
    <MultipleVehiclesTracking
      vehicles={adaptedVehicles}
      routeDate={today}
      selectedVehicleId={selectedVehicleId ?? ''}
      onSelectionChange={selectOrUnselectVehicle}
      dataRefreshInProgress={query.isRefetching}
    />
  );
}

export default MultipleVehiclesTrackingPage;
