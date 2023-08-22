import { createContext, useContext } from 'react';
import { LocatedVehicle } from '../../../models/vehicle';
import { VehicleItem } from './vehicle-item';
import type { ReactElement, ReactNode } from 'react';

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: (shareHandler?: ShareHandler) => ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement<typeof VehicleItem>;

const defaultVehicleRenderer: VehicleRenderer = (Component) => Component();
const VehicleRendererContext = createContext<VehicleRenderer>(
  defaultVehicleRenderer,
);

export interface VehicleRendererProviderAttributes {
  renderer: VehicleRenderer;
  children: ReactNode;
}

export function VehicleRendererProvider({
  renderer,
  children,
}: VehicleRendererProviderAttributes) {
  return (
    <VehicleRendererContext.Provider value={renderer}>
      {children}
    </VehicleRendererContext.Provider>
  );
}

export function useVehicleRenderer(): VehicleRenderer {
  return useContext(VehicleRendererContext);
}
