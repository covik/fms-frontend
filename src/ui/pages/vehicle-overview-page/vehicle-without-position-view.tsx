import { PageTitle } from '#ui/atoms';
import { VehicleWarning } from '#ui/molecules';
import { PageContent, PageLayout } from '#ui/templates/vehicle-layout';

export interface VehicleWithoutPositionViewAttributes {
  name: string;
}

export function VehicleWithoutPositionView({
  name,
}: VehicleWithoutPositionViewAttributes) {
  return (
    <PageLayout>
      <PageTitle>{name}</PageTitle>

      <PageContent>
        <VehicleWarning type={'no-position'} />
      </PageContent>
    </PageLayout>
  );
}
