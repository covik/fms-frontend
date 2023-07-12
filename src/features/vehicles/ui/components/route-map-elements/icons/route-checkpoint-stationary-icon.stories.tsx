import { RouteCheckpointStationaryIcon } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Route Checkpoint Stationary Icon',
  component: RouteCheckpointStationaryIcon,
} satisfies Meta<typeof RouteCheckpointStationaryIcon>;
type Story = StoryObj<typeof RouteCheckpointStationaryIcon>;

export const Default: Story = {
  args: {
    color: '#00000',
  },
};
