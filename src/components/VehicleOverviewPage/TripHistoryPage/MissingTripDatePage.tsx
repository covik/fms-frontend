import { Navigate, useParams } from '@tanstack/router';

export function MissingTripDatePage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/trips' });

  return (
    <Navigate
      to={`/vehicles/$vehicleId/trips/$date`}
      params={{ vehicleId, date: new Date() }}
      replace={true}
    />
  );
}
