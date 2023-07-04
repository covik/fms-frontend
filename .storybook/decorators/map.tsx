import type { Decorator } from '@storybook/react';
import type { MapSettingsAttributes } from '#core/map/MapSettings';
import { MapSettingsProvider } from '#core/map/MapSettings';
import { AppMap } from '#core/map';

interface Attributes extends Omit<MapSettingsAttributes, 'children'> {}

export function withMap(attributes: Attributes): Decorator {
  return (Story) => (
    <MapSettingsProvider {...attributes}>
      <AppMap sx={{ height: '400px' }}>
        <Story />
      </AppMap>
    </MapSettingsProvider>
  );
}
