import { MovementIcon } from './movement-icon';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Movement Icon',
  component: MovementIcon,
} satisfies Meta<typeof MovementIcon>;
type Story = StoryObj<typeof MovementIcon>;

export const Off: Story = {
  args: {
    moving: false,
  },
};

export const On: Story = {
  args: {
    moving: true,
  },
};
