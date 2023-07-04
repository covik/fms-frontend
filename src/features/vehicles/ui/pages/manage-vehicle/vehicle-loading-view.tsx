import { CenteredPageLayout } from '../../templates/single-vehicle-tracking';
import { VehicleLoadingIndicator } from '../../organisms/vehicle-loading-indicator';

export function VehicleLoadingView() {
  return (
    <CenteredPageLayout>
      <VehicleLoadingIndicator />
    </CenteredPageLayout>
  );
}
