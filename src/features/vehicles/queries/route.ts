import { isToday } from 'date-fns';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import { adaptRoutePositions } from '../ui/adapters/route-position';
import { adaptRouteStops } from '../ui/adapters/route-stop';
import { adaptRouteSummary } from '../ui/adapters/route-summary';
import type { Length, Speed } from '#lib/measurement-unit';
import type { RouteData, RouteFormatters } from '../ui/types/route';

export interface QueryParameters {
  vehicleId: string;
  from: Date;
  to: Date;
  isEnabled?: boolean;
}

export function useVehicleRoute(
  parameters: QueryParameters,
  formatters: RouteFormatters,
): RouteData | undefined {
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
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchSummaryInRange(
        { vehicleId, from, to },
        signal,
      ).catch((e) => {
        if (e instanceof VehicleService.NoRouteSummary) return null;
        else throw e;
      }),
    staleTime,
    enabled: isEnabled,
  });

  const positions = positionsQuery.data;
  const stops = stopsQuery.data;
  const partialSummary = summaryQuery.data;

  const summary: RouteSummaryTransitionalModel | null | undefined =
    useMemo(() => {
      if (partialSummary === null) return null;
      if (partialSummary === undefined || stops === undefined) return undefined;

      const { drivingDuration, stopDuration } =
        partialSummary.drivingAndStopDuration(stops);

      return {
        totalDuration: partialSummary.durationInSeconds(),
        drivingDuration,
        stopDuration,
        distance: partialSummary.distance(),
        startOdometer: partialSummary.startOdometer(),
        endOdometer: partialSummary.endOdometer(),
        averageSpeed: partialSummary.averageSpeed(),
        maxSpeed: partialSummary.maxSpeed(),
      };
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

export interface RouteSummaryTransitionalModel {
  totalDuration: number;
  drivingDuration: number;
  stopDuration: number;
  distance: Length.BaseLength;
  startOdometer: Length.BaseLength;
  endOdometer: Length.BaseLength;
  averageSpeed: Speed.BaseSpeed;
  maxSpeed: Speed.BaseSpeed;
}
