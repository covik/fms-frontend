import { Navigate, useParams } from '@tanstack/router';

export function RouteHistoryMissingDatePage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/history' });

  return (
    <Navigate
      to={`/vehicles/$vehicleId/history/$date`}
      params={{ vehicleId, date: new Date() }}
      replace={true}
    />
  );
}
