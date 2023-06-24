import { AppNavigation } from './AppNavigation';
import { all } from './items';
import { NavigationProvider, TabRender } from '../Navigation';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AppNavigation,
  render: (args) => (
    <NavigationProvider items={all} activeItem={undefined}>
      <AppNavigation {...args} />
    </NavigationProvider>
  ),
  args: {
    itemRenderer: TabRender,
  },
  argTypes: {
    itemRenderer: {
      table: {
        disable: true,
      },
    },
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

export const HorizontalWithActiveItem: Story = {
  ...Horizontal,
  render: (args) => (
    <NavigationProvider items={all} activeItem={all[1]}>
      <AppNavigation {...args} />
    </NavigationProvider>
  ),
};

export const VerticalWithActiveItem: Story = {
  ...HorizontalWithActiveItem,
  ...Vertical,
};
