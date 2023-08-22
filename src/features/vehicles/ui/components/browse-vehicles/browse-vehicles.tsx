import { VehiclesLoading } from './vehicles-loading';
import { NoVehicles } from './no-vehicles';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../vehicle-sections';
import { VehicleList } from './vehicle-list';
import type {
  OperationalVehicle,
  UnavailableVehicle,
} from '../../../models/vehicle';

export interface BrowseVehiclesAttributes {
  operationalVehicles: OperationalVehicle[];
  unavailableVehicles: UnavailableVehicle[];
  loading?: boolean;
}

export function BrowseVehicles({
  operationalVehicles = [],
  unavailableVehicles = [],
  loading = false,
}: BrowseVehiclesAttributes) {
  if (loading) return <VehiclesLoading />;

  if (operationalVehicles.length === 0 && unavailableVehicles.length === 0)
    return <NoVehicles />;

  // refaktorat izvan LocatedVehicle
  // popraviti sakrivanje kategorija bez vozila
  // dodat filtere
  return (
    <VehicleSections>
      <SectionOperationalVehicles>
        <VehicleList vehicles={operationalVehicles} />
      </SectionOperationalVehicles>

      <SectionUnavailableVehicles>
        <VehicleList vehicles={unavailableVehicles} />
      </SectionUnavailableVehicles>
    </VehicleSections>
  );
}
