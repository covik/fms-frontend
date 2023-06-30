import { VehicleMapIcon } from '#ui/atoms';
import { VehicleMapMarker } from './VehicleMapMarker';
import { AppMap, MapSettingsProvider } from '../Map';
import { Coordinates } from '../../lib/Dimension';
import type { Meta, StoryObj } from '@storybook/react';

const center = new Coordinates(44.111175964131334, 15.247462805177106);

export default {
  component: VehicleMapMarker,
  decorators: [
    (Story) => (
      <MapSettingsProvider center={center} zoom={18}>
        <AppMap sx={{ width: '400px', height: '400px' }}>
          <Story />
        </AppMap>
      </MapSettingsProvider>
    ),
  ],
} satisfies Meta<typeof VehicleMapMarker>;

type Story = StoryObj<typeof VehicleMapMarker>;

export const MovingWithIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIcon ignitionOn={true} moving={true} angleInDegrees={80} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithoutIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIcon ignitionOn={false} moving={false} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIcon ignitionOn={true} moving={false} />
    </VehicleMapMarker>
  ),
};
