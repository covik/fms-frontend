import { createContext, useContext, useMemo } from 'react';
import type { LocatedVehicle } from '../../../models/vehicle';
import type { FC, ReactElement, ReactNode } from 'react';

type VehicleItemRenderer = FC<ItemAttributes>;

export interface VehicleRendererAPI {
  Item: VehicleItemRenderer;
  shareHandler: ShareHandler;
}

export interface ItemAttributes {
  vehicle: LocatedVehicle;
  children: ReactElement;
}

export type ShareHandler = (vehicle: LocatedVehicle) => void;

const VehicleRendererContext = createContext<VehicleRendererAPI>({
  Item: DefaultItem,
  shareHandler: () => {},
});

export interface VehicleRendererProviderAttributes {
  Item?: VehicleItemRenderer;
  shareHandler?: ShareHandler;
  children: ReactNode;
}

export function VehicleRendererProvider({
  Item,
  shareHandler,
  children,
}: VehicleRendererProviderAttributes) {
  const parent = useVehicleRenderer();
  const ActualItem = Item ?? parent.Item;
  const actualShareHandler = shareHandler ?? parent.shareHandler;

  const api: VehicleRendererAPI = useMemo(
    () => ({
      Item: ActualItem,
      shareHandler: actualShareHandler,
    }),
    [ActualItem, actualShareHandler],
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

function DefaultItem({ children }: ItemAttributes) {
  return children;
}
