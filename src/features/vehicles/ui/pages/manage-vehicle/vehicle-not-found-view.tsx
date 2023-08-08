import { VehicleNotFound } from '../../components/vehicle-not-found';
import { CenteredPageLayout } from '../../templates/single-vehicle-tracking';

export function VehicleNotFoundView() {
  return (
    <CenteredPageLayout>
      <VehicleNotFound />
    </CenteredPageLayout>
  );
}
