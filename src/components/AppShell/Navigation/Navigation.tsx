import { Tabs } from '@mui/material';
import { useRouter } from '@tanstack/router';
import { RouterTab } from '../../RouterTab';
import { all as items } from './items';

export function Navigation() {
  const router = useRouter();
  const currentPath = router.state.currentLocation.pathname;
  const currentTab = getCurrentTab(currentPath);

  return (
    <>
      <Tabs variant="fullWidth" value={currentTab ?? false}>
        {items.map(({ title, icon, href }) => (
          <RouterTab
            key={href}
            value={href}
            to={href}
            label={title}
            icon={icon}
          />
        ))}
      </Tabs>
    </>
  );
}

function getCurrentTab(currentPath: string): string | undefined {
  if (currentPath === '/') return currentPath;

  const itemsWithoutRootPath = items.filter((item) => item.href !== '/');

  for (const item of itemsWithoutRootPath) {
    if (currentPath.startsWith(item.href)) return item.href;
  }

  return undefined;
}
