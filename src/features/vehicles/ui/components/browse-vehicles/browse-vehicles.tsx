import { VehiclesLoading } from './vehicles-loading';
import { NoVehicles } from './no-vehicles';
import {
  SectionActiveVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from './vehicle-sections';
import { VehicleList } from './vehicle-list';
import type { Vehicle } from './types';

export interface BrowseVehiclesAttributes<TVehicle extends Vehicle = Vehicle> {
  vehicles: TVehicle[] | undefined;
}

export function BrowseVehicles({ vehicles }: BrowseVehiclesAttributes) {
  if (vehicles === undefined) return <VehiclesLoading />;
  if (vehicles.length === 0) return <NoVehicles />;

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.condition === 'none',
  );
  const unavailableVehicles = vehicles.filter(
    (vehicle) => vehicle.condition === 'unavailable',
  );

  const categories = [
    ['active', SectionActiveVehicles, activeVehicles],
    ['unavailable', SectionUnavailableVehicles, unavailableVehicles],
  ] as const;

  const nonEmptyCategories = categories.filter(
    ([, , vehicles]) => vehicles.length > 0,
  );

  // dodat filtere
  return (
    <VehicleSections>
      {nonEmptyCategories.map(([id, Section, vehicles]) => (
        <Section key={id}>
          <VehicleList vehicles={vehicles} />
        </Section>
      ))}
    </VehicleSections>
  );
}
