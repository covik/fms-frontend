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

export * from '../../molecules/route-duration-summary';
export * from '../../molecules/route-distance-summary';
export * from '../../molecules/route-speed-summary';
