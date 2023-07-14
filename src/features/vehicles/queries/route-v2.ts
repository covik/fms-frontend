import type {
  RoutePositionData,
  RouteStopData,
  RouteSummaryData,
} from '../ui/types/route';
import type { Length, Speed, Voltage } from '#lib/measurement-unit';
import { useQuery } from '@tanstack/react-query';
import { isToday } from 'date-fns';
import { VehicleService } from '../services/vehicle-service';
import { RouteSummary } from '../models/route-summary';
import { RouteStop } from '../models/route-stop';
import { useMemo } from 'react';
import { adaptRoutePositions } from '../ui/adapters/route-position';
import { adaptRouteStops } from '../ui/adapters/route-stop';
import { adaptRouteSummary } from '../ui/adapters/route-summary';

export interface QueryParameters {
  vehicleId: string;
  from: Date;
  to: Date;
  isEnabled?: boolean;
}

export interface VehicleRoute {
  positions: RoutePositionData[];
  stops: RouteStopData[];
  summary: RouteSummaryData | null;
}

export interface SummaryModel {
  totalDuration: number;
  drivingDuration: number;
  stopDuration: number;
  distance: Length.BaseLength;
  startOdometer: Length.BaseLength;
  endOdometer: Length.BaseLength;
  averageSpeed: Speed.BaseSpeed;
  maxSpeed: Speed.BaseSpeed;
}

export interface UnitFormatters {
  formatDateTime: (date: Date) => string;
  formatDuration: (durationInSeconds: number) => string;
  formatLength: (length: Length.BaseLength) => string;
  formatSpeed: (speed: Speed.BaseSpeed) => string;
  formatTime: (time: Date) => string;
  formatVoltage: (voltage: Voltage.BaseVoltage) => string;
}

export function useVehicleRoute(
  parameters: QueryParameters,
  formatters: UnitFormatters,
): VehicleRoute | undefined {
  const { vehicleId, from, to, isEnabled = true } = parameters;
  const staleTime = isToday(from) || isToday(to) ? 60 * 1000 : Infinity;

  /*const query = useQueries({
    queries: [
      {
        queryKey: ['vehicles', vehicleId, 'routes', from, to],
        // @ts-expect-error
        queryFn: ({ signal }) =>
          VehicleService.RouteService.fetchInRange(
            {
              vehicleId,
              from,
              to,
            },
            signal,
          ),
        staleTime,
      },
      {
        queryKey: ['vehicles', vehicleId, 'stops', from, to],
        // @ts-expect-error
        queryFn: ({ signal }) =>
          VehicleService.RouteService.fetchStopsInRange(
            {
              vehicleId,
              from,
              to,
            },
            signal,
          ),
        staleTime,
      },
      {
        queryKey: ['vehicles', vehicleId, 'summary', from, to],
        // @ts-expect-error
        queryFn: async ({ signal }) => {
          try {
            return await VehicleService.RouteService.fetchSummaryInRange(
              {
                vehicleId,
                from,
                to,
              },
              signal,
            );
          } catch (e) {
            if (e instanceof VehicleService.NoRouteSummary) return null;
            throw e;
          }
        },
        staleTime,
      },
    ],
  });*/
  const positionsQuery = useQuery({
    queryKey: ['vehicles', vehicleId, 'routes', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchInRange({ vehicleId, from, to }, signal),
    staleTime,
    enabled: isEnabled,
  });

  const stopsQuery = useQuery({
    queryKey: ['vehicles', vehicleId, 'stops', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchStopsInRange(
        { vehicleId, from, to },
        signal,
      ),
    staleTime,
    enabled: isEnabled,
  });

  const summaryQuery = useQuery({
    queryKey: ['vehicles', vehicleId, 'summary', from, to],
    queryFn: async ({ signal }) => {
      try {
        return await VehicleService.RouteService.fetchSummaryInRange(
          { vehicleId, from, to },
          signal,
        );
      } catch (e) {
        if (e instanceof VehicleService.NoRouteSummary) return null;
        throw e;
      }
    },
    staleTime,
    enabled: isEnabled,
  });

  const positions = positionsQuery.data;
  const stops = stopsQuery.data;
  const partialSummary = summaryQuery.data;

  const summary = useMemo(() => {
    if (partialSummary === null) return null;
    if (partialSummary === undefined || stops === undefined) return undefined;

    return calculateFullSummary(partialSummary, stops);
  }, [partialSummary, stops]);

  return useMemo(() => {
    if (positions === undefined || stops === undefined || summary === undefined)
      return undefined;

    const adaptedPositions = adaptRoutePositions(positions, formatters);
    const adaptedStops = adaptRouteStops(stops, formatters);
    const adaptedSummary =
      summary !== null ? adaptRouteSummary(summary, formatters) : summary;

    return {
      positions: adaptedPositions,
      stops: adaptedStops,
      summary: adaptedSummary,
    };
  }, [positions, stops, summary]);
}

function calculateFullSummary(
  summary: RouteSummary,
  stops: RouteStop[],
): SummaryModel {
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
