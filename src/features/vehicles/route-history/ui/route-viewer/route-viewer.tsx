import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { useDateTime } from '#core/time';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
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
} from '../../../ui/components/grid';
import { RouteMap } from './route-map';
import {
  NoRouteSummaryData,
  RouteDistanceSummary,
  RouteDurationSummary,
  RouteSpeedSummary,
  RouteSummary,
} from '../../../ui/components/route-summary';
import { RouteStopsTable } from './route-stops-table';
import {
  adaptRoutePositionModel,
  adaptRouteStopModel,
} from '../route-map-elements';
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
  const { formatDateTime, formatDuration } = useDateTime();
  const routePositions = useRoutePositions({ vehicleId, from, to });
  const routeStops = useRouteStops({ vehicleId, from, to });
  const routeSummary = useRouteSummary({ vehicleId, from, to });

  const summary = adaptSummary(routeSummary, formatDuration);

  const positions = useMemo(
    () =>
      routePositions
        ? routePositions.map((position) =>
            adaptRoutePositionModel(position, {
              formatDateTime,
              formatMileage: formatLength,
              formatSpeed,
              formatVoltage,
            }),
          )
        : routePositions,
    [routePositions],
  );

  const stops = useMemo(
    () =>
      routeStops
        ? routeStops.map((stop) =>
            adaptRouteStopModel(stop, { formatDuration }),
          )
        : routeStops,
    [routeStops],
  );

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
        <RouteMap checkpoints={positions ?? []} stops={stops ?? []} />
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
    distance: formatLength(summary.distance),
    startOdometer: formatLength(summary.startOdometer),
    endOdometer: formatLength(summary.endOdometer),
    maxSpeed: formatSpeed(summary.maxSpeed),
    averageSpeed: formatSpeed(summary.averageSpeed),
  };
}

function formatLength(unit: Length.BaseLength): string {
  return Length.adaptiveFormat(unit, 1);
}

function formatSpeed(unit: Speed.BaseSpeed): string {
  return Speed.format(Speed.convert(unit).toKph());
}

function formatVoltage(unit: Voltage.BaseVoltage): string {
  return Voltage.format(unit);
}
