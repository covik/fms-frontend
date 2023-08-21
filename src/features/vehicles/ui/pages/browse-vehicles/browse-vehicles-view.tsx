import { Fragment } from 'react';
import { Truck, TruckFast } from 'mdi-material-ui';
import { useLength, useSpeed, useVoltage } from '#core/measurement-unit';
import { VehiclesLoadingView } from './vehicles-loading-view';
import { NoVehicles } from './no-vehicles';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../../components/vehicle-sections';
import { VehicleCard } from '../../components/vehicle-card';
import type { ReactElement } from 'react';
import type {
  LocatedVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../../models/vehicle';

const defaultShareHandler: ShareHandler = () => {};
const defaultVehicleRenderer: VehicleRenderer = (Component, vehicle) => (
  <Fragment key={vehicle.id()}>{Component}</Fragment>
);

export interface BrowseVehiclesViewAttributes {
  operationalVehicles: OperationalVehicle[];
  unavailableVehicles: UnavailableVehicle[];
  onShareRequest?: ShareHandler;
  vehicleRenderer?: VehicleRenderer;
  loading?: boolean;
}

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement;

export function BrowseVehiclesView({
  operationalVehicles = [],
  unavailableVehicles = [],
  onShareRequest = defaultShareHandler,
  vehicleRenderer = defaultVehicleRenderer,
  loading = false,
}: BrowseVehiclesViewAttributes) {
  function renderVehicles(vehicles: LocatedVehicle[]) {
    return vehicles.map((vehicle) =>
      vehicleRenderer(
        <VehicleItem vehicle={vehicle} shareHandler={onShareRequest} />,
        vehicle,
      ),
    );
  }

  if (loading) return <VehiclesLoadingView />;

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

interface VehicleItemAttributes {
  vehicle: LocatedVehicle;
  shareHandler: ShareHandler;
}

function VehicleItem({ vehicle, shareHandler }: VehicleItemAttributes) {
  const { formatLengthProgressive } = useLength();
  const { formatSpeed } = useSpeed();
  const { formatVoltage } = useVoltage();

  return (
    <VehicleCard
      title={vehicle.name()}
      icon={vehicle.isInMotion() ? TruckFast : Truck}
      color={vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange'}
      meta={[
        formatSpeed(vehicle.speed()),
        formatLengthProgressive(vehicle.mileage()),
        formatVoltage(vehicle.power()),
      ]}
      onShare={(e) => {
        e.preventDefault();
        shareHandler(vehicle);
      }}
    />
  );
}
