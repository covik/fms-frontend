import { withMap } from '#storybook/decorators';
import { RouteCheckpointMarker } from '.';
import { Coordinates } from '#lib/Dimension';
import {
  RouteCheckpointMovingIcon,
  RouteCheckpointStationaryIcon,
} from '../icons';
import type { Meta, StoryObj } from '@storybook/react';

const center = new Coordinates(44.0712546, 15.3360298);
const color = 'red';

export default {
  title: 'Molecules/Route Checkpoint Marker',
  component: RouteCheckpointMarker,
  decorators: [withMap({ center, zoom: 15 })],
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof RouteCheckpointMarker>;
type Story = StoryObj<typeof RouteCheckpointMarker>;

export const Moving: Story = {
  render: () => (
    <RouteCheckpointMarker coordinates={center}>
      <RouteCheckpointMovingIcon color={color} rotation={100} />
    </RouteCheckpointMarker>
  ),
};

export const Stationary: Story = {
  render: () => (
    <RouteCheckpointMarker coordinates={center}>
      <RouteCheckpointStationaryIcon color={color} />
    </RouteCheckpointMarker>
  ),
};
