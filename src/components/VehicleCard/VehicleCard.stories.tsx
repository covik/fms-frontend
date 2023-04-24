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
    subtitle: 'prije manje od minute',
    icon: TruckFast,
    color: 'green',
  },
};

export const Stationary: Story = {
  args: {
    title,
    subtitle: 'prije 55 minuta',
    icon: Truck,
    color: 'orange',
  },
};

export const Stopped: Story = {
  args: {
    title,
    subtitle: 'prije 5 minuta',
    icon: Truck,
    color: 'green',
  },
};

export const Towed: Story = {
  args: {
    title,
    subtitle: 'prije manje od minute',
    icon: TruckFast,
    color: 'orange',
  },
};
