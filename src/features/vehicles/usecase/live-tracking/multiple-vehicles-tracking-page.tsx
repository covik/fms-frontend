import { endOfDay, startOfDay } from 'date-fns';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDateTime } from '#core/time';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
import { VehicleService } from '../../services/vehicle-service';
import { adaptLocatedVehicles } from '../../ui/adapters/vehicle-adapter';
import { MultipleVehiclesTracking } from '../../ui/pages/multiple-vehicles-tracking';
import { useVehicleRoute } from '../../queries';
import type { Vehicle } from '../../ui/pages/multiple-vehicles-tracking';

export function MultipleVehiclesTrackingPage() {
  const { formatDateTime, formatDuration, formatTime } = useDateTime();

  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    select: (vehicles) => {
      const operational = VehicleService.takeOnlyOperational(vehicles);
      const unavailable = VehicleService.takeOnlyUnavailable(vehicles);

      const sortedOperational = VehicleService.sortAscendingByName(operational);
      const sortedUnavailable = VehicleService.sortAscendingByName(unavailable);
      return adaptLocatedVehicles([...sortedOperational, ...sortedUnavailable]);
    },
    refetchInterval: 2000,
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState<
    Vehicle['id'] | undefined
  >(undefined);

  function selectOrUnselectVehicle(vehicleId: Vehicle['id']) {
    setSelectedVehicleId((currentSelection) =>
      currentSelection === vehicleId ? undefined : vehicleId,
    );
  }

  const [routeDate, setRouteDate] = useState(new Date());

  const route = useVehicleRoute(
    {
      vehicleId: selectedVehicleId ?? '',
      from: startOfDay(routeDate),
      to: endOfDay(routeDate),
      isEnabled: selectedVehicleId !== undefined,
    },
    {
      formatDateTime,
      formatDuration,
      formatLength,
      formatSpeed,
      formatTime,
      formatVoltage,
    },
  );

  return (
    <MultipleVehiclesTracking
      vehicles={query.data}
      routeDate={routeDate}
      onRouteDateChange={setRouteDate}
      routePositions={route?.positions ?? []}
      routeStops={route?.stops ?? []}
      routeSummary={route?.summary}
      selectedVehicleId={selectedVehicleId ?? ''}
      onSelectionChange={selectOrUnselectVehicle}
      dataRefreshInProgress={query.isRefetching}
    />
  );
}

export default MultipleVehiclesTrackingPage;

function formatLength(unit: Length.BaseLength): string {
  return Length.adaptiveFormat(unit, 1);
}

function formatSpeed(unit: Speed.BaseSpeed): string {
  return Speed.format(Speed.convert(unit).toKph());
}

function formatVoltage(unit: Voltage.BaseVoltage): string {
  return Voltage.format(unit);
}
