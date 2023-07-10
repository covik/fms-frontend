import { Stack } from '@mui/material';
import { useDateTime } from '#core/time';
import { Length, Speed } from '#lib/measurement-unit';
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
import {
  NoRouteSummaryData,
  RouteDistanceSummary,
  RouteDurationSummary,
  RouteSpeedSummary,
  RouteSummary,
} from '../../../ui/organisms/route-summary';
import { RouteStopsTable } from './route-stops-table';
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
  const { formatDuration } = useDateTime();
  const routePositions = useRoutePositions({ vehicleId, from, to });
  const routeStops = useRouteStops({ vehicleId, from, to });
  const routeSummary = useRouteSummary({ vehicleId, from, to });

  const summary = adaptSummary(routeSummary, formatDuration);

  const spacing = 1;
  return (
    <Grid>
      <GridSidebarTiles>
        <Stack spacing={spacing}>
          {children}
          <RouteSummary>
            {summary instanceof NoSummary ? (
              <NoRouteSummaryData />
            ) : (
              <>
                <RouteDurationSummary
                  driving={summary?.drivingDuration}
                  stopped={summary?.stopDuration}
                  total={summary?.totalDuration}
                />
                <RouteDistanceSummary
                  total={summary?.distance}
                  odometerStart={summary?.startOdometer}
                  odometerEnd={summary?.endOdometer}
                />
                <RouteSpeedSummary
                  average={summary?.averageSpeed}
                  max={summary?.maxSpeed}
                />
              </>
            )}
          </RouteSummary>
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

interface AdaptedSummary {
  totalDuration: string;
  drivingDuration: string;
  stopDuration: string;
  distance: string;
  startOdometer: string;
  endOdometer: string;
  maxSpeed: string;
  averageSpeed: string;
}

function adaptSummary(
  summary: ReturnType<typeof useRouteSummary>,
  formatDuration: (duration: number) => string,
): AdaptedSummary | NoSummary | undefined {
  if (summary === undefined || summary instanceof NoSummary) return summary;

  return {
    totalDuration: formatDuration(summary.totalDuration),
    drivingDuration: formatDuration(summary.drivingDuration),
    stopDuration: formatDuration(summary.stopDuration),
    distance: Length.adaptiveFormat(summary.distance, 1),
    startOdometer: Length.adaptiveFormat(summary.startOdometer, 1),
    endOdometer: Length.adaptiveFormat(summary.endOdometer, 1),
    maxSpeed: Speed.format(Speed.convert(summary.maxSpeed).toKph()),
    averageSpeed: Speed.format(Speed.convert(summary.averageSpeed).toKph()),
  };
}
