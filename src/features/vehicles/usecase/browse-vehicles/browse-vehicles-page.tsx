import { useCallback, useState } from 'react';
import { Snackbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../../services/vehicle-service';
import { Coordinates } from '#lib/dimension';
import { WebShare } from '#lib/web-share';
import {
  BrowseVehicles,
  VehicleRendererProvider,
  HyperlinkVehicleRenderer,
  selectors as cardSelectors,
} from '../../ui/components/browse-vehicles';
import { FluidPage, PagePadding } from '#ui/atoms/page';
import type { ShareHandler } from '../../ui/components/browse-vehicles';
import { adaptLocatedVehicles } from '../../ui/adapters/vehicle-adapter';
import { useSpeed, useVoltage } from '#core/measurement-unit';

export function BrowseVehiclesPage() {
  const { formatVoltage: formatPower } = useVoltage();
  const { formatSpeed } = useSpeed();

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    select: (vehicles) => {
      const filteredVehicles = [
        ...VehicleService.takeOnlyOperational(vehicles),
        ...VehicleService.takeOnlyUnavailable(vehicles),
      ];
      const sortedVehicles =
        VehicleService.sortAscendingByName(filteredVehicles);

      return adaptLocatedVehicles(sortedVehicles, {
        formatSpeed,
        formatPower,
      });
    },
    refetchInterval: 2000,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const shareGoogleMapsLink = useCallback<ShareHandler>(async (vehicle) => {
    try {
      const title = vehicle.name;
      const url = new Coordinates(
        vehicle.latitude,
        vehicle.longitude,
      ).toGoogleMapsUrl();
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
      <FluidPage>
        <PagePadding>
          <VehicleRendererProvider
            Renderer={HyperlinkVehicleRenderer}
            shareHandler={shareGoogleMapsLink}
          >
            <BrowseVehicles vehicles={vehicles} />
          </VehicleRendererProvider>
        </PagePadding>
      </FluidPage>
    </>
  );
}

export default BrowseVehiclesPage;

export const testingSelectors = {
  toast: 'vehicles-digest-page-toast',
  ...cardSelectors,
};
