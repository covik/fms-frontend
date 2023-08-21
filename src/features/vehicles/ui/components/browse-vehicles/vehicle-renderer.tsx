import { createContext, useContext } from 'react';
import { LocatedVehicle } from '../../../models/vehicle';
import { VehicleItem } from './vehicle-item';
import type { ReactElement, ReactNode } from 'react';

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: (shareHandler?: ShareHandler) => ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement<typeof VehicleItem>;

const defaultShareHandler: ShareHandler = () => {};
const defaultVehicleRenderer: VehicleRenderer = (Component) => Component();
const VehicleRendererContext = createContext<VehicleRenderer>(
  defaultVehicleRenderer,
);

export interface VehicleListAttributes {
  vehicles: LocatedVehicle[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  const renderVehicle = useContext(VehicleRendererContext);

  return (
    <>
      {vehicles.map((vehicle) =>
        renderVehicle(
          (shareHandler) => (
            <VehicleItem
              vehicle={vehicle}
              key={vehicle.id()}
              shareHandler={shareHandler ?? defaultShareHandler}
            />
          ),
          vehicle,
        ),
      )}
    </>
  );
}

export function VehicleRendererProvider({
  renderer,
  children,
}: {
  renderer: VehicleRenderer;
  children: ReactNode;
}) {
  return (
    <VehicleRendererContext.Provider value={renderer}>
      {children}
    </VehicleRendererContext.Provider>
  );
}
