import { Link } from '@tanstack/router';
import type { VehicleRendererAttributes } from './vehicle-renderer-context';

export function HyperlinkVehicleRenderer({
  children,
  vehicle,
}: VehicleRendererAttributes) {
  return (
    <Link
      to={'/vehicles/$vehicleId'}
      params={{ vehicleId: vehicle.id }}
      style={{ display: 'block', textDecoration: 'none' }}
      key={vehicle.id}
    >
      {children}
    </Link>
  );
}
