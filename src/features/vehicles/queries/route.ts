import { isToday } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import type { UseQueryResult } from '@tanstack/react-query';
import type { RoutePosition } from '../models/position';
import type { RouteStop } from '../models/route-stop';
import type { RouteSummary } from '../models/route-summary';

interface QueryParameters {
  vehicleId: string;
  from: Date;
  to: Date;
}

export function useRoutePositions({
  vehicleId,
  from,
  to,
}: QueryParameters): UseQueryResult<RoutePosition[]> {
  return useQuery({
    queryKey: ['vehicles', vehicleId, 'routes', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchInRange({ vehicleId, from, to }, signal),
    staleTime: determineStaleTime(from, to),
  });
}

export function useRouteStops({
  vehicleId,
  from,
  to,
}: QueryParameters): UseQueryResult<RouteStop[]> {
  return useQuery({
    queryKey: ['vehicles', vehicleId, 'stops', from, to],
    queryFn: ({ signal }) =>
      VehicleService.RouteService.fetchStopsInRange(
        { vehicleId, from, to },
        signal,
      ),
    staleTime: determineStaleTime(from, to),
  });
}

export function useRouteSummary({
  vehicleId,
  from,
  to,
}: QueryParameters): UseQueryResult<RouteSummary | NoSummary> {
  return useQuery({
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
}

export class NoSummary {}

function determineStaleTime(from: Date, to: Date) {
  return isToday(from) || isToday(to) ? 60 * 1000 : Infinity;
}
