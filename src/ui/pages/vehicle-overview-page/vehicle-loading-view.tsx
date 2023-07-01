import { CenteredPageLayout } from '#ui/templates/vehicle-layout';
import { VehicleLoadingIndicator } from '#ui/organisms/vehicle-loading-indicator';

export function VehicleLoadingView() {
  return (
    <CenteredPageLayout>
      <VehicleLoadingIndicator />
    </CenteredPageLayout>
  );
}
