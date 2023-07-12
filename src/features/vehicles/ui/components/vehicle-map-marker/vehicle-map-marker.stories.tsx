import { VehicleMapMarker } from '.';
import { VehicleMapIcon } from '../vehicle-map-icon';
import { Coordinates } from '#lib/dimension';
import { AppMap, MapSettingsProvider } from '#core/map';
import type { Meta, StoryObj } from '@storybook/react';

const center = new Coordinates(44.1111754, 15.2474628);

export default {
  title: 'Atoms/Vehicle Map Marker',
  component: VehicleMapMarker,
  args: {
    name: 'ZD000AA',
    position: center,
  },
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
  render: (args) => (
    <VehicleMapMarker {...args}>
      <VehicleMapIcon ignitionOn={true} moving={true} angleInDegrees={80} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithoutIgnition: Story = {
  render: (args) => (
    <VehicleMapMarker {...args}>
      <VehicleMapIcon ignitionOn={false} moving={false} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithIgnition: Story = {
  render: (args) => (
    <VehicleMapMarker {...args}>
      <VehicleMapIcon ignitionOn={true} moving={false} />
    </VehicleMapMarker>
  ),
};
