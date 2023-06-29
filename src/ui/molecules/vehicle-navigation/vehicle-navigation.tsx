import { useMemo } from 'react';
import { PageNavigation } from '#ui/molecules';
import type { NavigationItems } from '#ui/molecules';

export interface VehicleNavigationAttributes {
  vehicleId: string;
}

export function VehicleNavigation({ vehicleId }: VehicleNavigationAttributes) {
  const items = useMemo(() => createItems(vehicleId), [vehicleId]);

  return <PageNavigation items={items} />;
}

function createItems(vehicleId: string): NavigationItems {
  const params = { vehicleId };
  return [
    {
      to: `/vehicles/$vehicleId`,
      params,
      label: 'Uživo',
    },
    {
      to: `/vehicles/$vehicleId/today`,
      params,
      label: 'Danas',
    },
    {
      to: `/vehicles/$vehicleId/history`,
      params,
      label: 'Povijest',
    },
  ];
}
