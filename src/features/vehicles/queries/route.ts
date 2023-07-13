import { isToday } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { VehicleService } from '../services/vehicle-service';
import type { RouteStop } from '../models/route-stop';

interface QueryParameters {
  vehicleId: string;
  from: Date;
  to: Date;
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

function determineStaleTime(from: Date, to: Date) {
  return isToday(from) || isToday(to) ? 60 * 1000 : Infinity;
}
