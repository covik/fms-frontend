import { VehicleListItemLoading } from './vehicle-list';
import { LoadingSection } from './vehicle-sections';

export function VehiclesLoading() {
  return (
    <LoadingSection>
      <VehicleListItemLoading />
      <VehicleListItemLoading />
      <VehicleListItemLoading />
      <VehicleListItemLoading />
    </LoadingSection>
  );
}
