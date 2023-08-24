import { AppDrawer } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/App Drawer',
  component: AppDrawer,
} satisfies Meta<typeof AppDrawer>;
type Story = StoryObj<typeof AppDrawer>;

export const Open: Story = {
  args: {
    visible: true,
  },
};

export const Closed: Story = {
  args: {
    visible: false,
  },
};
