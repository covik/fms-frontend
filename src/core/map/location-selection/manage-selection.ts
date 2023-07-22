import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Coordinates } from '#lib/dimension';

export type SelectedLocation = Coordinates | undefined;

export interface SelectionAPI {
  selectedLocation: SelectedLocation;
  selectLocation: (coordinates: Coordinates) => void;
  clearLocation: () => void;
}

export function useLocationSelection(): SelectionAPI {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation>(undefined);
  const clearLocation = useCallback(() => setSelectedLocation(undefined), []);
  const selectLocation = useCallback((coordinates: Coordinates) => {
    flushSync(() => clearLocation());
    setSelectedLocation(coordinates);
  }, []);

  return {
    selectedLocation,
    selectLocation,
    clearLocation,
  };
}
