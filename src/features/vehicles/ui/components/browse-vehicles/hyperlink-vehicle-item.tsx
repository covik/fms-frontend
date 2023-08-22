import { Link } from '@tanstack/router';
import type { ItemAttributes } from './vehicle-item-renderer';

export function HyperlinkVehicleItem({ children, vehicle }: ItemAttributes) {
  return (
    <Link
      to={'/vehicles/$vehicleId'}
      params={{ vehicleId: vehicle.id() }}
      style={{ display: 'block', textDecoration: 'none' }}
      key={vehicle.id()}
    >
      {children}
    </Link>
  );
}
