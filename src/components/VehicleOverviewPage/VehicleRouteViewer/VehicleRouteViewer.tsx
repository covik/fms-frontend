import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { Tile, TileNoContent, TileRawContent } from '#ui/molecules/tile';
import {
  NoSummary,
  useRoutePositions,
  useRouteStops,
  useRouteSummary,
} from './queries';
import { Grid, GridContent, GridSidebarTiles } from '../Grid';
import { RouteMap } from './RouteMap';
import { RouteStopsTable } from './RouteStopsTable';
import { RouteSummaryList } from './RouteSummaryList';
import type { ReactNode } from 'react';
import type { RouteSummary } from '../../../models/RouteSummary';
import type { RouteStop } from '../../../models/RouteStop';
import type { SummaryData } from './RouteSummaryList';

export interface VehicleRouteViewerAttributes {
  vehicleId: string;
  from: Date;
  to: Date;
  children?: ReactNode;
}

export function VehicleRouteViewer({
  vehicleId,
  from,
  to,
  children = null,
}: VehicleRouteViewerAttributes) {
  const positionsQuery = useRoutePositions({ vehicleId, from, to });
  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery]);

  const stopsQuery = useRouteStops({ vehicleId, from, to });
  const stops = useMemo(() => stopsQuery.data ?? [], [stopsQuery]);

  const summaryQuery = useRouteSummary({ vehicleId, from, to });
  const summaryData: SummaryData | NoSummary | undefined = useMemo(() => {
    if (summaryQuery.data instanceof NoSummary) return summaryQuery.data;

    if (summaryQuery.data === undefined || stopsQuery.data === undefined)
      return undefined;

    return calculateFullSummary(summaryQuery.data, stops);
  }, [summaryQuery.data, stopsQuery.data]);

  const spacing = 1;
  return (
    <Grid>
      <GridSidebarTiles>
        <Stack spacing={spacing}>
          {children}
          <Tile label={'Sažetak'}>
            {summaryData instanceof NoSummary ? (
              <TileNoContent>Nema informacija</TileNoContent>
            ) : (
              <RouteSummaryList details={summaryData} />
            )}
          </Tile>
          <Tile label={'Zaustavljanje'}>
            {stopsQuery.data && stopsQuery.data.length === 0 ? (
              <TileNoContent>Nema zaustavljanja</TileNoContent>
            ) : (
              <TileRawContent>
                <RouteStopsTable stops={stopsQuery.data} />
              </TileRawContent>
            )}
          </Tile>
        </Stack>
      </GridSidebarTiles>
      <GridContent>
        <RouteMap routes={positions} stops={stops} />
      </GridContent>
    </Grid>
  );
}

function calculateFullSummary(
  summary: RouteSummary,
  stops: RouteStop[],
): SummaryData {
  const totalDuration = summary.durationInSeconds();
  const { drivingDuration, stopDuration } =
    summary.drivingAndStopDuration(stops);
  const distance = summary.distance();
  const startOdometer = summary.startOdometer();
  const endOdometer = summary.endOdometer();
  const averageSpeed = summary.averageSpeed();
  const maxSpeed = summary.maxSpeed();

  return {
    totalDuration,
    drivingDuration,
    stopDuration,
    distance,
    startOdometer,
    endOdometer,
    averageSpeed,
    maxSpeed,
  };
}
