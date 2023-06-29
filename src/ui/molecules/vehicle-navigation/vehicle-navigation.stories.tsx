import { withNavigation } from '#storybook/decorators';
import { VehicleNavigation } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Vehicle Navigation',
  component: VehicleNavigation,
  args: {
    vehicleId: 'irrelevant',
  },
} satisfies Meta<typeof VehicleNavigation>;
type Story = StoryObj<typeof VehicleNavigation>;

export const FirstItemActive: Story = {
  decorators: [withNavigation(0)],
};

export const SecondItemActive: Story = {
  decorators: [withNavigation(1)],
};

export const ThirdItemActive: Story = {
  decorators: [withNavigation(2)],
};
