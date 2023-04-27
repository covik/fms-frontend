import { VehiclesDigestView, PageContainer } from './VehiclesDigestView';
import { VehiclesDigestSkeleton } from './VehiclesDigestSkeleton';
import { Vehicle } from '../../lib/VehicleService';
import { BaseVehicle, LocatedVehicle } from '../../models/Vehicle';
import { Truck, TruckFast } from 'mdi-material-ui';
import { formatDistanceToNowStrict } from 'date-fns';
import { hr } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { WebShare } from '../../lib/WebShare';
import { Snackbar } from '@mui/material';
import { testingSelectors as cardSelectors } from '../VehicleCard';

export interface VehiclesDigestPageAttributes {
  refetchInterval?: number | false | undefined;
}

export function VehiclesDigestPage({
  refetchInterval = 2000,
}: VehiclesDigestPageAttributes) {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    refetchInterval,
  });

  if (query.data === undefined)
    return (
      <PageContainer>
        <VehiclesDigestSkeleton />
      </PageContainer>
    );

  return <VehicleView vehicles={query.data} />;
}

export const testingSelectors = {
  toast: 'vehicles-digest-page-toast',
  ...cardSelectors,
};

function VehicleView({ vehicles }: { vehicles: BaseVehicle[] }) {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  async function handleShare(title: string, url: string) {
    try {
      const usedStrategy = await WebShare.shareUrl(url, title);
      if (usedStrategy === 'clipboard') {
        setToastMessage(
          `Poveznica lokacije vozila ${title} kopirana u međuspremnik.`,
        );
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage(
        error instanceof WebShare.NoNativeSharingMechanism
          ? 'Vaša platforma ne podržava dijeljenje poveznica.'
          : 'Neočekivana greška prilikom dijeljenja poveznice.',
      );
      setShowToast(true);
    }
  }

  return (
    <>
      <Snackbar
        message={toastMessage}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        key={toastMessage}
        open={showToast}
        data-testid={testingSelectors.toast}
      />
      <VehiclesDigestView
        operationalVehicles={operationalVehiclesAdaptedToView}
        timedOutVehicles={timesOutVehiclesAdaptedToView}
        onShareRequest={handleShare}
      />
    </>
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
    shareUrl: vehicle.position().coordinates().toGoogleMapsUrl(),
  };
}
