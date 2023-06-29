import { withNavigation } from '#storybook/decorators';
import { AppNavigation, all } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Navigation',
  component: AppNavigation,
  args: {
    items: all,
  },
  decorators: [withNavigation(0)],
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
