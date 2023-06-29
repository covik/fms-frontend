import { CenteredPageLayout } from '#ui/templates/vehicle-layout';
import { VehicleLoadingIndicator } from '#ui/organisms';

export function VehicleLoadingView() {
  return (
    <CenteredPageLayout>
      <VehicleLoadingIndicator />
    </CenteredPageLayout>
  );
}
