import { useCallback, useMemo, useState } from 'react';
import { Snackbar } from '@mui/material';
import { Link } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { VehiclesDigestView } from './Views';
import { Vehicle } from '../../lib/VehicleService';
import { WebShare } from '../../lib/WebShare';
import { testingSelectors as cardSelectors } from '../VehicleCard';
import type { VehicleRenderer, ShareHandler } from './Views';

export function VehiclesDigestPage() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    refetchInterval: 2000,
  });

  const rawData = query.data;
  const vehicles = rawData ?? [];

  const sortedVehicles = useMemo(
    () => Vehicle.sortAscendingByName(vehicles),
    [vehicles],
  );

  const operationalVehicles = useMemo(
    () => Vehicle.takeOnlyOperational(sortedVehicles),
    [sortedVehicles],
  );

  const unavailableVehicles = useMemo(
    () => Vehicle.takeOnlyUnavailable(sortedVehicles),
    [sortedVehicles],
  );

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const shareGoogleMapsLink = useCallback<ShareHandler>(async (vehicle) => {
    try {
      const title = vehicle.name();
      const url = vehicle.position().coordinates().toGoogleMapsUrl();
      const usedStrategy = await WebShare.shareUrl(url, title);
      if (usedStrategy === 'clipboard') {
        setToastMessage(
          `Poveznica lokacije vozila ${title} kopirana u međuspremnik.`,
        );
        setShowToast(true);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      setToastMessage(
        error instanceof WebShare.NoNativeSharingMechanism
          ? 'Vaša platforma ne podržava dijeljenje poveznica.'
          : 'Neočekivana greška prilikom dijeljenja poveznice.',
      );
      setShowToast(true);
    }
  }, []);

  const linkToVehicleOverviewPage = useCallback<VehicleRenderer>(
    (Component, vehicle) => (
      <Link
        to={'/vehicles/$vehicleId'}
        params={{ vehicleId: vehicle.id() }}
        style={{ display: 'block', textDecoration: 'none' }}
        key={vehicle.id()}
      >
        {Component}
      </Link>
    ),
    [],
  );

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
        loading={rawData === undefined}
        operationalVehicles={operationalVehicles}
        unavailableVehicles={unavailableVehicles}
        onShareRequest={shareGoogleMapsLink}
        vehicleRenderer={linkToVehicleOverviewPage}
      />
    </>
  );
}

export const testingSelectors = {
  toast: 'vehicles-digest-page-toast',
  ...cardSelectors,
};
