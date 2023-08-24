import { useCallback, useState } from 'react';

export function useDrawer() {
  const [visible, toggleDrawer] = useState(false);
  const openDrawer = useCallback(() => toggleDrawer(true), []);

  return {
    visible,
    openDrawer,
    toggleDrawer,
  };
}
