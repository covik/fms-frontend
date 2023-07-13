import { useCallback, useState } from 'react';

export function useRouteCheckpoints() {
  const [checkpointsVisible, setVisibility] = useState(false);

  const showCheckpointsOnDetailedMap = useCallback((zoom: number) => {
    setVisibility(zoom >= 15);
  }, []);

  return {
    checkpointsVisible,
    showCheckpointsOnDetailedMap,
  };
}
