import { Stack } from '@mui/material';
import { useDateTime } from '#core/time';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
import { Tile, TileNoContent, TileRawContent } from '#ui/molecules/tile';
import { useRouteStops, useVehicleRoute } from '../../../queries';
import { Grid, GridContent, GridSidebarTiles } from '../grid';
import { RouteMap } from './route-map';
import {
  NoRouteSummaryData,
  RouteDistanceSummary,
  RouteDurationSummary,
  RouteSpeedSummary,
  RouteSummary,
} from '../route-summary';
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
  const { formatDateTime, formatDuration, formatTime } = useDateTime();

  const { positions, stops, summary } = useVehicleRoute(
    { vehicleId, from, to },
    {
      formatDateTime,
      formatDuration,
      formatLength,
      formatSpeed,
      formatTime,
      formatVoltage,
    },
  ) ?? { positions: undefined, stops: undefined, summary: undefined };
  const legacyRouteStops = useRouteStops({ vehicleId, from, to });

  const spacing = 1;
  return (
    <Grid>
      <GridSidebarTiles>
        <Stack spacing={spacing}>
          {children}
          <RouteSummary>
            {summary === null ? (
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
            {legacyRouteStops && legacyRouteStops.length === 0 ? (
              <TileNoContent>Nema zaustavljanja</TileNoContent>
            ) : (
              <TileRawContent>
                <RouteStopsTable stops={legacyRouteStops} />
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

function formatLength(unit: Length.BaseLength): string {
  return Length.adaptiveFormat(unit, 1);
}

function formatSpeed(unit: Speed.BaseSpeed): string {
  return Speed.format(Speed.convert(unit).toKph());
}

function formatVoltage(unit: Voltage.BaseVoltage): string {
  return Voltage.format(unit);
}
