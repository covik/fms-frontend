import { PageTitle } from '#ui/atoms/page-title';
import { VehicleWarning } from '../../molecules/vehicle-warning';
import {
  PageContent,
  PageLayout,
} from '../../templates/single-vehicle-tracking';

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
