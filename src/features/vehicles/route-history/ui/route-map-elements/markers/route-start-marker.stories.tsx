import { withMap } from '#storybook/decorators';
import { RouteStartMarker } from './index';
import { Coordinates } from '#lib/dimension';
import type { Meta, StoryObj } from '@storybook/react';

const center = new Coordinates(44.0712546, 15.3360298);

export default {
  title: 'Molecules/Route Start Marker',
  component: RouteStartMarker,
  decorators: [withMap({ center, zoom: 15 })],
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  args: {
    coordinates: center,
  },
} satisfies Meta<typeof RouteStartMarker>;
type Story = StoryObj<typeof RouteStartMarker>;

export const Default: Story = {};
