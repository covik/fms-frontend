import { CoordinatesListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Coordinates List Item',
  component: CoordinatesListItem,
} satisfies Meta<typeof CoordinatesListItem>;
type Story = StoryObj<typeof CoordinatesListItem>;

export const Default: Story = {
  args: {
    coordinates: '45.1234567, 15.1234567',
  },
};
