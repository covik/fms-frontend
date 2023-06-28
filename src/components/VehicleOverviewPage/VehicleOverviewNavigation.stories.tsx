import { withNavigation } from '#storybook/decorators';
import {
  createItems,
  VehicleOverviewNavigation,
} from './VehicleOverviewNavigation';
import type { Meta, StoryObj } from '@storybook/react';

const items = createItems('irrelevant-vehicle-id');

export default {
  component: VehicleOverviewNavigation,
  args: {
    items,
  },
} satisfies Meta<typeof VehicleOverviewNavigation>;
type Story = StoryObj<typeof VehicleOverviewNavigation>;

export const FirstItemActive: Story = {
  decorators: [withNavigation(0)],
};

export const SecondItemActive: Story = {
  decorators: [withNavigation(1)],
};

export const ThirdItemActive: Story = {
  decorators: [withNavigation(2)],
};
