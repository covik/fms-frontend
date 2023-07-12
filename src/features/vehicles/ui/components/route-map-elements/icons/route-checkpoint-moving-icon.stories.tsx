import { RouteCheckpointMovingIcon } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Route Checkpoint Moving Icon',
  component: RouteCheckpointMovingIcon,
} satisfies Meta<typeof RouteCheckpointMovingIcon>;
type Story = StoryObj<typeof RouteCheckpointMovingIcon>;

export const Default: Story = {
  args: {
    color: '#00000',
    rotation: 0,
  },
};
