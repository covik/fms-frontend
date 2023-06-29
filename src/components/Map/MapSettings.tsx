import { createContext, useContext, useMemo } from 'react';
import { Coordinates } from '../../lib/Dimension';
import type { ReactNode } from 'react';

const MapSettingsContext = createContext<MapSettings>({
  center: new Coordinates(44.698832, 16.373162),
  zoom: 7,
});

export interface MapSettings {
  center: Coordinates;
  zoom: number;
}

export function useMapSettings(): MapSettings {
  return useContext(MapSettingsContext);
}

export interface MapSettingsAttributes extends Partial<MapSettings> {
  children: ReactNode;
}

export function MapSettingsProvider(props: MapSettingsAttributes) {
  const { center: currentCenter, zoom: currentZoom } = useMapSettings();
  const { center = currentCenter, zoom = currentZoom, children } = props;

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
