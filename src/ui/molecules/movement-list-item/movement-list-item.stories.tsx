import { MovementListItem } from './movement-list-item';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Movement List Item',
  component: MovementListItem,
} satisfies Meta<typeof MovementListItem>;
type Story = StoryObj<typeof MovementListItem>;

export const Stationary: Story = {
  args: {
    moving: false,
    speed: '0 km/h',
  },
};

export const Moving: Story = {
  args: {
    moving: true,
    speed: '100 km/h',
  },
};
