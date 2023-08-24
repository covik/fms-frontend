import { Navigate, useParams } from '#core/router';

export function MissingRouteDateRedirect() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/history' });

  return (
    <Navigate
      to={`/vehicles/$vehicleId/history/$date`}
      params={{ vehicleId, date: new Date() }}
      replace={true}
    />
  );
}
