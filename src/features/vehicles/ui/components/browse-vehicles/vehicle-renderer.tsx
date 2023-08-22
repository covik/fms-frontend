import { createContext, useContext, useMemo } from 'react';
import { LocatedVehicle } from '../../../models/vehicle';
import type { VehicleItem } from './vehicle-item';
import type { ReactElement, ReactNode } from 'react';

export interface VehicleRendererAPI {
  renderer: VehicleRenderer;
  shareHandler: ShareHandler;
}

export type ShareHandler = (vehicle: LocatedVehicle) => void;
export type VehicleRenderer = (
  Component: ReturnType<typeof VehicleItem>,
  vehicle: LocatedVehicle,
) => ReactElement<typeof VehicleItem>;

const VehicleRendererContext = createContext<VehicleRendererAPI>({
  renderer: (Component) => Component,
  shareHandler: () => {},
});

export interface VehicleRendererProviderAttributes {
  renderer?: VehicleRenderer;
  shareHandler?: ShareHandler;
  children: ReactNode;
}

export function VehicleRendererProvider({
  renderer,
  shareHandler,
  children,
}: VehicleRendererProviderAttributes) {
  const parent = useVehicleRenderer();
  const actualRenderer = renderer ?? parent.renderer;
  const actualShareHandler = shareHandler ?? parent.shareHandler;

  const api: VehicleRendererAPI = useMemo(
    () => ({
      renderer: actualRenderer,
      shareHandler: actualShareHandler,
    }),
    [actualRenderer, actualShareHandler],
  );

  return (
    <VehicleRendererContext.Provider value={api}>
      {children}
    </VehicleRendererContext.Provider>
  );
}

export function useVehicleRenderer(): VehicleRendererAPI {
  return useContext(VehicleRendererContext);
}
