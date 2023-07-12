import { Tile, TileNoContent } from '#ui/molecules/tile';
import type { ReactNode } from 'react';

export interface RouteSummaryAttributes {
  children: ReactNode;
}

export function RouteSummary({ children }: RouteSummaryAttributes) {
  return <Tile label={'Sažetak'}>{children}</Tile>;
}

export function NoRouteSummaryData() {
  return <TileNoContent>Nema informacija</TileNoContent>;
}

export * from '../route-duration-summary';
export * from '../route-distance-summary';
export * from '../route-speed-summary';
