import { VehicleMapMarker } from './VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../VehicleMapIcon';
import { Map } from '../Map';
import type { Meta, StoryObj } from '@storybook/react';

const center = {
  lat: 44.111175964131334,
  lng: 15.247462805177106,
};

export default {
  component: VehicleMapMarker,
  decorators: [
    (Story) => (
      <Map x={center.lat} y={center.lng} z={18} width={400} height={400}>
        <Story />
      </Map>
    ),
  ],
} satisfies Meta<typeof VehicleMapMarker>;

type Story = StoryObj<typeof VehicleMapMarker>;

export const MovingWithIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIconMoving active={true} angle={80} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithoutIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIconStationary active={false} />
    </VehicleMapMarker>
  ),
};

export const StationaryWithIgnition: Story = {
  render: () => (
    <VehicleMapMarker position={center} name={'Test'}>
      <VehicleMapIconStationary active={true} />
    </VehicleMapMarker>
  ),
};
