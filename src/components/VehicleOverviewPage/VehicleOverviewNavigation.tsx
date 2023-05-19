import { styled, Tabs } from '@mui/material';
import { RouterTab } from '../RouterTab';
import { useRouter } from '@tanstack/router';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTab-root': {
    '&': {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      minHeight: 'auto',
      minWidth: 'auto',
    },

    '&:not(.Mui-selected)': {
      color: theme.palette.text.primary,
    },
  },
}));

export interface VehicleOverviewNavigationAttributes {
  vehicleId: string;
}

export function VehicleOverviewNavigation({
  vehicleId,
}: VehicleOverviewNavigationAttributes) {
  const router = useRouter();
  const currentPath = router.state.currentLocation.pathname;
  const items = [
    { href: `/vehicles/${vehicleId}/trips` },
    { href: `/vehicles/${vehicleId}` },
  ];
  const currentTab = getCurrentTab(items, currentPath);

  return (
    <StyledTabs
      value={currentTab ?? false}
      sx={{ minHeight: '34px', marginBottom: 2 }}
    >
      <RouterTab
        value={`/vehicles/${vehicleId}`}
        to={'/vehicles/$vehicleId'}
        params={{ vehicleId }}
        label={'Uživo'}
      />
      <RouterTab
        value={`/vehicles/${vehicleId}/trips`}
        to={'/vehicles/$vehicleId/trips'}
        params={{ vehicleId }}
        label={'Povijest'}
      />
    </StyledTabs>
  );
}

function getCurrentTab(
  items: { href: string }[],
  currentPath: string,
): string | undefined {
  for (const item of items) {
    if (currentPath.startsWith(item.href)) return item.href;
  }

  return undefined;
}
