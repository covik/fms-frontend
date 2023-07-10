import { useMemo } from 'react';
import { isToday } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import type { Length, Speed } from '#lib/measurement-unit';
import type { RoutePosition } from '../models/position';
import type { RouteStop } from '../models/route-stop';
import type { RouteSummary } from '../models/route-summary';

export interface SummaryData {
  totalDuration: number;
  drivingDuration: number;
  stopDuration: number;
  distance: Length.BaseLength;
  startOdometer: Length.BaseLength;
  endOdometer: Length.BaseLength;
  averageSpeed: Speed.BaseSpeed;
  maxSpeed: Speed.BaseSpeed;
}

interface QueryParameters {
  vehicleId: string;
  from: Date;
  to: Date;
}

export function useRoutePositions({
  vehicleId,
  from,
  to,
}: QueryParameters): RoutePosition[] | undefined {
  const query = useQuery({
    queryKey: ['vehicles', vehicleId, 'routes', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchInRange({ vehicleId, from, to }, signal),
    staleTime: determineStaleTime(from, to),
  });
  return query.data;
}

export function useRouteStops({
  vehicleId,
  from,
  to,
}: QueryParameters): RouteStop[] | undefined {
  const query = useQuery({
    queryKey: ['vehicles', vehicleId, 'stops', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchStopsInRange(
        { vehicleId, from, to },
        signal,
      ),
    staleTime: determineStaleTime(from, to),
  });
  return query.data;
}

export function useRouteSummary({
  vehicleId,
  from,
  to,
}: QueryParameters): SummaryData | NoSummary | undefined {
  const stops = useRouteStops({ vehicleId, from, to });

  const { data: summary } = useQuery({
    queryKey: ['vehicles', vehicleId, 'summary', from, to],
    queryFn: async ({ signal }) => {
      try {
        return await VehicleService.RouteService.fetchSummaryInRange(
          { vehicleId, from, to },
          signal,
        );
      } catch (e) {
        if (e instanceof VehicleService.NoRouteSummary) return new NoSummary();
        throw e;
      }
    },
    staleTime: determineStaleTime(from, to),
  });

  return useMemo(() => {
    if (summary instanceof NoSummary) return summary;

    if (summary === undefined || stops === undefined) return undefined;

    return calculateFullSummary(summary, stops);
  }, [summary, stops]);
}

export class NoSummary {}

function determineStaleTime(from: Date, to: Date) {
  return isToday(from) || isToday(to) ? 60 * 1000 : Infinity;
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
