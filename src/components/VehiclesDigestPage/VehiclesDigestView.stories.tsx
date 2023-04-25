import { VehiclesDigestView } from './VehiclesDigestView';
import { Truck, TruckFast } from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehiclesDigestView,
} satisfies Meta<typeof VehiclesDigestView>;

type Story = StoryObj<typeof VehiclesDigestView>;

export const Default: Story = {
  args: {
    vehicles: [
      {
        id: '1',
        title: 'ZD002AB',
        color: 'orange',
        icon: Truck,
        subtitle: 'prije 15 minuta',
      },
      {
        id: '2',
        title: 'ZD003CD',
        color: 'green',
        icon: TruckFast,
        subtitle: 'prije 30 sekundi',
      },
    ],
  },
};
