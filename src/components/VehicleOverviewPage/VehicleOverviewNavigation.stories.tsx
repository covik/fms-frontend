import {
  createItems,
  VehicleOverviewNavigation,
} from './VehicleOverviewNavigation';
import { NavigationProvider, TabRender } from '../Navigation';
import type { Meta, StoryObj } from '@storybook/react';

const items = createItems('irrelevant-vehicle-id');

export default {
  component: VehicleOverviewNavigation,
  args: {
    itemRenderer: TabRender,
  },
  argTypes: {
    itemRenderer: {
      table: { disable: true },
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof VehicleOverviewNavigation>;
type Story = StoryObj<typeof VehicleOverviewNavigation>;

export const FirstItemActive: Story = {
  render: (args) => (
    <NavigationProvider items={items} activeItem={items[0]}>
      <VehicleOverviewNavigation {...args} />
    </NavigationProvider>
  ),
};

export const SecondItemActive: Story = {
  render: (args) => (
    <NavigationProvider items={items} activeItem={items[1]}>
      <VehicleOverviewNavigation {...args} />
    </NavigationProvider>
  ),
};

export const ThirdItemActive: Story = {
  render: (args) => (
    <NavigationProvider items={items} activeItem={items[2]}>
      <VehicleOverviewNavigation {...args} />
    </NavigationProvider>
  ),
};
