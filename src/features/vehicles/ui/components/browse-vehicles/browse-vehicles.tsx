import { VehiclesLoading } from './vehicles-loading';
import { NoVehicles } from './no-vehicles';
import {
  SectionOperationalVehicles,
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

  // popraviti sakrivanje kategorija bez vozila
  // dodat filtere
  return (
    <VehicleSections>
      <SectionOperationalVehicles>
        <VehicleList vehicles={activeVehicles} />
      </SectionOperationalVehicles>

      <SectionUnavailableVehicles>
        <VehicleList vehicles={unavailableVehicles} />
      </SectionUnavailableVehicles>
    </VehicleSections>
  );
}
