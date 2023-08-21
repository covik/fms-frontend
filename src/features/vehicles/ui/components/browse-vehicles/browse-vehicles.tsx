import { Fragment } from 'react';
import { Truck, TruckFast } from 'mdi-material-ui';
import { useLength, useSpeed, useVoltage } from '#core/measurement-unit';
import { VehiclesLoading } from './vehicles-loading';
import { NoVehicles } from './no-vehicles';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../vehicle-sections';
import { VehicleItem } from './vehicle-item';
import type { ReactElement } from 'react';
import type {
  LocatedVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../../models/vehicle';

const defaultShareHandler: ShareHandler = () => {};
const defaultVehicleRenderer: VehicleRenderer = (Component, vehicle) => (
  <Fragment key={vehicle.id()}>{Component()}</Fragment>
);

export interface BrowseVehiclesAttributes {
  operationalVehicles: OperationalVehicle[];
  unavailableVehicles: UnavailableVehicle[];
  VehicleItem?: VehicleRenderer;
  loading?: boolean;
}

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: (onShareRequest?: ShareHandler) => ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement;

export function BrowseVehicles({
  operationalVehicles = [],
  unavailableVehicles = [],
  VehicleItem: VehicleRenderer = defaultVehicleRenderer,
  loading = false,
}: BrowseVehiclesAttributes) {
  function renderVehicles(vehicles: LocatedVehicle[]) {
    return vehicles.map((vehicle) =>
      VehicleRenderer(
        (onShareRequest) => (
          <VehicleItem
            vehicle={vehicle}
            shareHandler={() =>
              (onShareRequest ?? defaultShareHandler)(vehicle)
            }
          />
        ),
        vehicle,
      ),
    );
  }

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
