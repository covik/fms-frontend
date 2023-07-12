import { Fragment } from 'react';
import { Truck, TruckFast } from 'mdi-material-ui';
import { FluidPage, PagePadding } from '#ui/atoms/page';
import { PageTitle } from '#ui/atoms/page-title';
import { VehiclesLoadingView } from './vehicles-loading-view';
import { NoVehiclesView } from './no-vehicles-view';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../vehicle-sections';
import { VehicleCard } from '../../../ui/components/vehicle-card';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
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

export interface VehiclesDigestViewAttributes {
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
}: VehiclesDigestViewAttributes) {
  function renderVehicles(vehicles: LocatedVehicle[]) {
    return vehicles.map((vehicle) =>
      vehicleRenderer(
        <VehicleItem vehicle={vehicle} shareHandler={onShareRequest} />,
        vehicle,
      ),
    );
  }

  if (loading)
    return (
      <FluidPage>
        <PagePadding>
          <VehiclesLoadingView />
        </PagePadding>
      </FluidPage>
    );

  if (operationalVehicles.length === 0 && unavailableVehicles.length === 0)
    return (
      <FluidPage>
        <NoVehiclesView />
      </FluidPage>
    );

  return (
    <FluidPage>
      <PagePadding>
        <PageTitle>Vozila</PageTitle>

        <VehicleSections>
          <SectionOperationalVehicles>
            {renderVehicles(operationalVehicles)}
          </SectionOperationalVehicles>

          <SectionUnavailableVehicles>
            {renderVehicles(unavailableVehicles)}
          </SectionUnavailableVehicles>
        </VehicleSections>
      </PagePadding>
    </FluidPage>
  );
}

interface VehicleItemAttributes {
  vehicle: LocatedVehicle;
  shareHandler: ShareHandler;
}

function VehicleItem({ vehicle, shareHandler }: VehicleItemAttributes) {
  const speedInKph = Speed.convert(vehicle.speed()).toKph();
  const formattedSpeed = Speed.format(speedInKph);
  const formattedMileage = Length.adaptiveFormat(vehicle.mileage());
  const formattedPower = Voltage.format(vehicle.power());

  return (
    <VehicleCard
      title={vehicle.name()}
      icon={vehicle.isInMotion() ? TruckFast : Truck}
      color={vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange'}
      meta={[formattedSpeed, formattedMileage, formattedPower]}
      onShare={(e) => {
        e.preventDefault();
        shareHandler(vehicle);
      }}
    />
  );
}
