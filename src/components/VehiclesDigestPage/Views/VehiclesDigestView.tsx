import { Fragment } from 'react';
import { Box } from '@mui/material';
import { Truck, TruckFast } from 'mdi-material-ui';
import { VehiclesLoadingView } from './VehiclesLoadingView';
import { NoVehiclesView } from './NoVehiclesView';
import {
  SectionOperationalVehicles,
  SectionUnavailableVehicles,
  VehicleSections,
} from '../Sections';
import { VehicleCard } from '../../VehicleCard';
import { FluidPage, PageTitle } from '../../Page';
import { Length, Speed, Voltage } from '../../../lib/MeasurementUnit';
import type { ReactElement, ReactNode } from 'react';
import type {
  LocatedVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../../models/Vehicle';

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

export function VehiclesDigestView({
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
        <PageContainer>
          <VehiclesLoadingView />
        </PageContainer>
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
      <PageContainer>
        <PageTitle>Vozila</PageTitle>

        <VehicleSections>
          <SectionOperationalVehicles>
            {renderVehicles(operationalVehicles)}
          </SectionOperationalVehicles>

          <SectionUnavailableVehicles>
            {renderVehicles(unavailableVehicles)}
          </SectionUnavailableVehicles>
        </VehicleSections>
      </PageContainer>
    </FluidPage>
  );
}

function PageContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: '100%', padding: 1 }}>{children}</Box>;
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
