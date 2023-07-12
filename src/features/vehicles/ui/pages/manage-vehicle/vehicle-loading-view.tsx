import { CenteredPageLayout } from '../../templates/single-vehicle-tracking';
import { VehicleLoadingIndicator } from '../../components/vehicle-loading-indicator';

export function VehicleLoadingView() {
  return (
    <CenteredPageLayout>
      <VehicleLoadingIndicator />
    </CenteredPageLayout>
  );
}
