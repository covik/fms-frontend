import { IgnitionListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Ignition List Item',
  component: IgnitionListItem,
} satisfies Meta<typeof IgnitionListItem>;
type Story = StoryObj<typeof IgnitionListItem>;

export const Off: Story = {
  args: {
    on: false,
  },
};

export const On: Story = {
  args: {
    on: true,
  },
};
