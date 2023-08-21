import { LocatedVehicle } from '../../../models/vehicle';
import { VehicleItem } from './vehicle-item';
import { Fragment, ReactElement, ReactNode } from 'react';

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: (onShareRequest?: ShareHandler) => ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement;

const defaultShareHandler: ShareHandler = () => {};
const defaultVehicleRenderer: VehicleRenderer = (Component, vehicle) => (
  <Fragment key={vehicle.id()}>{Component()}</Fragment>
);

export function useRenderVehicles(
  VehicleRenderer: VehicleRenderer | undefined = defaultVehicleRenderer,
): (vehicles: LocatedVehicle[]) => ReactNode[] {
  return function renderVehicles(vehicles: LocatedVehicle[]) {
    const renderItem = (vehicle: LocatedVehicle) =>
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
      );

    return vehicles.map(renderItem);
  };
}
