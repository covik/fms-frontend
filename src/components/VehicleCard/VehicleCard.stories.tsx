import { VehicleCard } from './VehicleCard';
import { Truck, TruckFast } from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehicleCard,
  argTypes: {
    icon: {
      options: ['Truck', 'TruckFast'],
      mapping: {
        Truck,
        TruckFast,
      },
    },
  },
} satisfies Meta<typeof VehicleCard>;

type Story = StoryObj<typeof VehicleCard>;

const title = 'ZD000AA';

export const Moving: Story = {
  args: {
    title,
    icon: TruckFast,
    color: 'green',
    meta: ['90 km/h', '28.2 V', '351 453 km'],
  },
};

export const Stationary: Story = {
  args: {
    title,
    icon: Truck,
    color: 'orange',
    meta: ['0 km/h', '12.2 V', '351 453 km'],
  },
};

export const Stopped: Story = {
  args: {
    title,
    icon: Truck,
    color: 'green',
    meta: ['0 km/h', '28.2 V', '351 453 km'],
  },
};

export const Towed: Story = {
  args: {
    title,
    icon: TruckFast,
    color: 'orange',
    meta: ['65 km/h', '12.2 V', '351 453 km'],
  },
};

export const NoShareButton: Story = {
  args: {
    ...Moving.args,
    onShare: undefined,
  },
};
