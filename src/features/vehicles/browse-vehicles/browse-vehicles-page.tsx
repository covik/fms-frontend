import { useCallback, useMemo, useState } from 'react';
import { Snackbar } from '@mui/material';
import { Link } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import { WebShare } from '#lib/web-share';
import { BrowseVehiclesView } from '../ui/pages/browse-vehicles';
import { testingSelectors as cardSelectors } from '../ui/components/vehicle-card';
import type {
  ShareHandler,
  VehicleRenderer,
} from '../ui/pages/browse-vehicles';

export function BrowseVehiclesPage() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    refetchInterval: 2000,
  });

  const rawData = query.data;
  const vehicles = rawData ?? [];

  const sortedVehicles = useMemo(
    () => VehicleService.sortAscendingByName(vehicles),
    [vehicles],
  );

  const operationalVehicles = useMemo(
    () => VehicleService.takeOnlyOperational(sortedVehicles),
    [sortedVehicles],
  );

  const unavailableVehicles = useMemo(
    () => VehicleService.takeOnlyUnavailable(sortedVehicles),
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

  const linkVehicle = useCallback<VehicleRenderer>(
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
      <BrowseVehiclesView
        loading={rawData === undefined}
        operationalVehicles={operationalVehicles}
        unavailableVehicles={unavailableVehicles}
        onShareRequest={shareGoogleMapsLink}
        vehicleRenderer={linkVehicle}
      />
    </>
  );
}

export default BrowseVehiclesPage;

export const testingSelectors = {
  toast: 'vehicles-digest-page-toast',
  ...cardSelectors,
};
