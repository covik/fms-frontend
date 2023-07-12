import { withMap } from '#storybook/decorators';
import { RouteStops } from './route-stops';
import { mapSettings } from './storybook-shared-settings';
import stops from '../../../fixtures/view/route-stops';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Stops',
  component: RouteStops,
  decorators: [withMap(mapSettings)],
  args: {
    stops,
  },
} satisfies Meta<typeof RouteStops>;
type Story = StoryObj<typeof RouteStops>;

export const Default: Story = {};
