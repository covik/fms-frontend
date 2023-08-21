import { VehiclesLoading } from './vehicles-loading';
import { NoVehicles } from './no-vehicles';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../vehicle-sections';
import { useRenderVehicles } from './vehicle-renderer';
import type {
  OperationalVehicle,
  UnavailableVehicle,
} from '../../../models/vehicle';
import type { VehicleRenderer } from './vehicle-renderer';

export interface BrowseVehiclesAttributes {
  operationalVehicles: OperationalVehicle[];
  unavailableVehicles: UnavailableVehicle[];
  VehicleItem?: VehicleRenderer;
  loading?: boolean;
}

export function BrowseVehicles({
  operationalVehicles = [],
  unavailableVehicles = [],
  VehicleItem: VehicleRenderer = undefined,
  loading = false,
}: BrowseVehiclesAttributes) {
  const renderVehicles = useRenderVehicles(VehicleRenderer);

  if (loading) return <VehiclesLoading />;

  if (operationalVehicles.length === 0 && unavailableVehicles.length === 0)
    return <NoVehicles />;

  return (
    <VehicleSections>
      <SectionOperationalVehicles>
        {renderVehicles(operationalVehicles)}
      </SectionOperationalVehicles>

      <SectionUnavailableVehicles>
        {renderVehicles(unavailableVehicles)}
      </SectionUnavailableVehicles>
    </VehicleSections>
  );
}
