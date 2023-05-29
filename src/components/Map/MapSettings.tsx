import { createContext, useContext, useMemo } from 'react';
import { Coordinates } from '../../lib/Dimension';
import type { ReactNode } from 'react';

const defaultSettings = {
  center: new Coordinates(44.698832, 16.373162),
  zoom: 7,
};

const MapSettingsContext = createContext<MapSettings>(defaultSettings);

export interface MapSettings {
  center: Coordinates;
  zoom: number;
}

export function useMapSettings(): MapSettings {
  return useContext(MapSettingsContext);
}

type MapSettingsAttributes = Partial<MapSettings> & {
  children: ReactNode;
};

export function MapSettingsProvider(props: MapSettingsAttributes) {
  const {
    center = defaultSettings.center,
    zoom = defaultSettings.zoom,
    children,
  } = props;

  const value = useMemo(
    () => ({
      center,
      zoom,
    }),
    [center, zoom],
  );

  return (
    <MapSettingsContext.Provider value={value}>
      {children}
    </MapSettingsContext.Provider>
  );
}
