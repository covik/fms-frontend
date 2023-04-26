import { VehiclesDigestView } from './VehiclesDigestView';
import { Truck, TruckFast } from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehiclesDigestView,
} satisfies Meta<typeof VehiclesDigestView>;

type Story = StoryObj<typeof VehiclesDigestView>;

const operationalVehicles = [
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
];

const timedOutVehicles = [
  {
    id: '3',
    title: 'ZD003EF',
    color: 'orange',
    icon: Truck,
    subtitle: 'prije 2 sata',
  },
  {
    id: '4',
    title: 'ZD004GH',
    color: 'green',
    icon: TruckFast,
    subtitle: 'prije 13 sati',
  },
];

export const OnlyOperationalVehicles: Story = {
  args: {
    operationalVehicles,
    timedOutVehicles: [],
  },
};

export const OnlyTimedOutVehicles: Story = {
  args: {
    operationalVehicles: [],
    timedOutVehicles,
  },
};

export const All: Story = {
  args: {
    operationalVehicles,
    timedOutVehicles,
  },
};
