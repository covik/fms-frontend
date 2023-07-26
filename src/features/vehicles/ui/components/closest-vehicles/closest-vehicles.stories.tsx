import { withMap } from '#storybook/decorators';
import { ClosestVehicles } from './closest-vehicles';
import * as VehicleListStories from './closest-vehicle-list.stories';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Closest Vehicles',
  component: ClosestVehicles,
  decorators: [withMap()],
  argTypes: {
    navigation: {
      options: ['car', 'truck'],
      control: { type: 'select' },
    },
  },
  args: {
    ...VehicleListStories.Default.args,
    navigation: 'car',
    open: true,
  },
} satisfies Meta<typeof ClosestVehicles>;
type Story = StoryObj<typeof ClosestVehicles>;

export const Default: Story = {};

export const Hidden: Story = {
  args: {
    open: false,
  },
};

export const NoVehicles: Story = {
  args: {
    vehicles: [],
  },
};

export const TruckNavigation: Story = {
  args: {
    navigation: 'truck',
  },
};
