import { Stack } from '@mui/material';
import { Tile, TileNoContent, TileRawContent } from '#ui/molecules/tile';
import {
  NoSummary,
  useRoutePositions,
  useRouteStops,
  useRouteSummary,
} from '../../../queries';
import {
  Grid,
  GridContent,
  GridSidebarTiles,
} from '../../../ui/molecules/grid';
import { RouteMap } from './route-map';
import { RouteStopsTable } from './route-stops-table';
import { RouteSummaryList } from './route-summary-list';
import type { ReactNode } from 'react';

export interface RouteViewerAttributes {
  vehicleId: string;
  from: Date;
  to: Date;
  children?: ReactNode;
}

export function RouteViewer({
  vehicleId,
  from,
  to,
  children = null,
}: RouteViewerAttributes) {
  const routePositions = useRoutePositions({ vehicleId, from, to });
  const routeStops = useRouteStops({ vehicleId, from, to });
  const routeSummary = useRouteSummary({ vehicleId, from, to });

  const spacing = 1;
  return (
    <Grid>
      <GridSidebarTiles>
        <Stack spacing={spacing}>
          {children}
          <Tile label={'Sažetak'}>
            {routeSummary instanceof NoSummary ? (
              <TileNoContent>Nema informacija</TileNoContent>
            ) : (
              <RouteSummaryList details={routeSummary} />
            )}
          </Tile>
          <Tile label={'Zaustavljanje'}>
            {routeStops && routeStops.length === 0 ? (
              <TileNoContent>Nema zaustavljanja</TileNoContent>
            ) : (
              <TileRawContent>
                <RouteStopsTable stops={routeStops} />
              </TileRawContent>
            )}
          </Tile>
        </Stack>
      </GridSidebarTiles>
      <GridContent>
        <RouteMap routes={routePositions ?? []} stops={routeStops ?? []} />
      </GridContent>
    </Grid>
  );
}
