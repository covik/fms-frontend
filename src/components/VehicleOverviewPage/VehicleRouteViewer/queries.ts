import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '#lib/VehicleService';
import type { UseQueryResult } from '@tanstack/react-query';
import type { RoutePosition } from '../../../models/Position';
import type { RouteStop } from '../../../models/RouteStop';
import { RouteSummary } from '../../../models/RouteSummary';

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
      Vehicle.Route.fetchInRange({ vehicleId, from, to }, signal),
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
      Vehicle.Route.fetchStopsInRange({ vehicleId, from, to }, signal),
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
        return await Vehicle.Route.fetchSummaryInRange(
          { vehicleId, from, to },
          signal,
        );
      } catch (e) {
        if (e instanceof Vehicle.NoRouteSummary) return new NoSummary();
        throw e;
      }
    },
  });
}

export class NoSummary {}
