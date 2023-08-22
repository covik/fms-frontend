import { createContext, useContext, useMemo } from 'react';
import { DefaultVehicleRenderer } from './default-vehicle-renderer';
import type { LocatedVehicle } from '../../../../models/vehicle';
import type { FC, ReactElement, ReactNode } from 'react';

type VehicleRenderer = FC<VehicleRendererAttributes>;

export interface VehicleRendererAPI {
  Renderer: VehicleRenderer;
  shareHandler: ShareHandler;
}

export interface VehicleRendererAttributes {
  vehicle: LocatedVehicle;
  children: ReactElement;
}

export type ShareHandler = (vehicle: LocatedVehicle) => void;

const VehicleRendererContext = createContext<VehicleRendererAPI>({
  Renderer: DefaultVehicleRenderer,
  shareHandler: () => {},
});

export interface VehicleRendererProviderAttributes {
  Renderer?: VehicleRenderer;
  shareHandler?: ShareHandler;
  children: ReactNode;
}

export function VehicleRendererProvider({
  Renderer,
  shareHandler,
  children,
}: VehicleRendererProviderAttributes) {
  const parent = useVehicleRenderer();
  const ActualRenderer = Renderer ?? parent.Renderer;
  const actualShareHandler = shareHandler ?? parent.shareHandler;

  const api: VehicleRendererAPI = useMemo(
    () => ({
      Renderer: ActualRenderer,
      shareHandler: actualShareHandler,
    }),
    [ActualRenderer, actualShareHandler],
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
