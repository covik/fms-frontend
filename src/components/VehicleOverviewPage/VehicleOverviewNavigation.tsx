import { styled } from '@mui/material';
import { PageNavigation } from '#ui/molecules';
import type { NavigationItems } from '#ui/molecules';

export function createItems(vehicleId: string): NavigationItems {
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

export const VehicleOverviewNavigation = styled(PageNavigation)(
  ({ theme }) => ({
    marginBottom: theme.spacing(2),
  }),
);
VehicleOverviewNavigation.displayName = 'VehicleOverviewNavigation';
