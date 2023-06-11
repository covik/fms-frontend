import { Box } from '@mui/material';
import { Outlet, useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import {
  VehicleOverviewView,
  VehicleLoadingIndicator,
  WarningVehicleAwaitingInstallation,
  WarningOutdatedPositionData,
  WarningVehicleDisabled,
} from './VehicleOverviewView';
import {
  DisabledVehicle,
  LocatedVehicle,
  UnavailableVehicle,
} from '../../models/Vehicle';
import { VehicleOverviewNavigation } from './VehicleOverviewNavigation';

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
          <VehicleOverviewNavigation vehicleId={vehicleId} />
          {renderWarning(vehicle)}
          <Outlet />
        </>
      ) : (
        <WarningVehicleAwaitingInstallation />
      )}
    </VehicleOverviewView>
  );
}

function renderWarning(vehicle: LocatedVehicle) {
  const sx = { marginBottom: 1 };

  if (vehicle instanceof UnavailableVehicle)
    return (
      <Box sx={sx}>
        <WarningOutdatedPositionData />
      </Box>
    );

  if (vehicle instanceof DisabledVehicle)
    return (
      <Box sx={sx}>
        <WarningVehicleDisabled />
      </Box>
    );

  return null;
}
