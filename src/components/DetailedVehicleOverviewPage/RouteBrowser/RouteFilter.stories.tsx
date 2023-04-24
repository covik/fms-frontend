import { RouteFilter } from './RouteFilter';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: RouteFilter,
} satisfies Meta<typeof RouteFilter>;

type Story = StoryObj<typeof RouteFilter>;

export const Today: Story = {
  args: {
    view: 'today',
  },
};

export const Yesterday: Story = {
  args: {
    view: 'yesterday',
  },
};

export const Custom: Story = {
  args: {
    view: 'custom',
  },
};
