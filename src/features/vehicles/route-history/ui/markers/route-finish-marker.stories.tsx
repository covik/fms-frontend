import { withMap } from '#storybook/decorators';
import { RouteFinishMarker } from '.';
import { Coordinates } from '#lib/dimension';
import type { Meta, StoryObj } from '@storybook/react';

const center = new Coordinates(44.0712546, 15.3360298);

export default {
  title: 'Molecules/Route Finish Marker',
  component: RouteFinishMarker,
  decorators: [withMap({ center, zoom: 15 })],
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  args: {
    coordinates: center,
  },
} satisfies Meta<typeof RouteFinishMarker>;
type Story = StoryObj<typeof RouteFinishMarker>;

export const Default: Story = {};
