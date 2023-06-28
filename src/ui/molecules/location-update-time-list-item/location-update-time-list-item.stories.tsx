import { LocationUpdateTimeListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Location Update Time List Item',
  component: LocationUpdateTimeListItem,
} satisfies Meta<typeof LocationUpdateTimeListItem>;
type Story = StoryObj<typeof LocationUpdateTimeListItem>;

export const Default: Story = {
  args: {
    updatedAt: 'prije 2 minute',
  },
};
