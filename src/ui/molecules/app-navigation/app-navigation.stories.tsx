import { AppNavigation } from './app-navigation';
import { all } from './items';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Navigation',
  component: AppNavigation,
  args: {
    items: all,
  },
} satisfies Meta<typeof AppNavigation>;
type Story = StoryObj<typeof AppNavigation>;

export const Horizontal: Story = {
  args: {
    vertical: false,
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};
