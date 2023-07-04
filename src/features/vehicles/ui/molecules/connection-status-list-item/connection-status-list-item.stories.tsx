import { ConnectionStatusListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Connection Status List Item',
  component: ConnectionStatusListItem,
} satisfies Meta<typeof ConnectionStatusListItem>;
type Story = StoryObj<typeof ConnectionStatusListItem>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Interrupted: Story = {
  args: {
    active: false,
  },
};
