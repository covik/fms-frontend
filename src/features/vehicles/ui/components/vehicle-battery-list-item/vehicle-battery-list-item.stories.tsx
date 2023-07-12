import { VehicleBatteryListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Vehicle Battery List Item',
  component: VehicleBatteryListItem,
} satisfies Meta<typeof VehicleBatteryListItem>;
type Story = StoryObj<typeof VehicleBatteryListItem>;

export const Default: Story = {
  args: {
    voltage: '12.6 V',
  },
};
