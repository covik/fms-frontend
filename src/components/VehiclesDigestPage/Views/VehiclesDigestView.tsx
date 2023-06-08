import { Fragment } from 'react';
import { Box } from '@mui/material';
import { Truck, TruckFast } from 'mdi-material-ui';
import { VehiclesLoadingView } from './VehiclesLoadingView';
import { NoVehiclesView } from './NoVehiclesView';
import {
  SectionOperationalVehicles,
  SectionTimedOutVehicles,
  VehicleSections,
} from '../Sections';
import { VehicleCard } from '../../VehicleCard';
import { PageTitle } from '../../PageTitle';
import { Speed } from '../../../lib/MeasurementUnit';
import type { ReactElement, ReactNode } from 'react';
import type {
  LocatedVehicle,
  OperationalVehicle,
  TimedOutVehicle,
} from '../../../models/Vehicle';

const defaultShareHandler: ShareHandler = () => {};
const defaultVehicleRenderer: VehicleRenderer = (Component, vehicle) => (
  <Fragment key={vehicle.id()}>{Component}</Fragment>
);

export interface VehiclesDigestViewAttributes {
  operationalVehicles: OperationalVehicle[];
  timedOutVehicles: TimedOutVehicle[];
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
  timedOutVehicles = [],
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
      <PageContainer>
        <VehiclesLoadingView />
      </PageContainer>
    );

  if (operationalVehicles.length === 0 && timedOutVehicles.length === 0)
    return <NoVehiclesView />;

  return (
    <PageContainer>
      <PageTitle>Vozila</PageTitle>

      <VehicleSections>
        <SectionOperationalVehicles>
          {renderVehicles(operationalVehicles)}
        </SectionOperationalVehicles>

        <SectionTimedOutVehicles>
          {renderVehicles(timedOutVehicles)}
        </SectionTimedOutVehicles>
      </VehicleSections>
    </PageContainer>
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

  return (
    <VehicleCard
      title={vehicle.name()}
      icon={vehicle.isInMotion() ? TruckFast : Truck}
      color={vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange'}
      meta={[formattedSpeed]}
      onShare={(e) => {
        e.preventDefault();
        shareHandler(vehicle);
      }}
    />
  );
}
