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
    shareUrl: 'http://example.com',
  },
  {
    id: '2',
    title: 'ZD003CD',
    color: 'green',
    icon: TruckFast,
    subtitle: 'prije 30 sekundi',
    shareUrl: 'http://example.com',
  },
];

const timedOutVehicles = [
  {
    id: '3',
    title: 'ZD003EF',
    color: 'orange',
    icon: Truck,
    subtitle: 'prije 2 sata',
    shareUrl: 'http://example.com',
  },
  {
    id: '4',
    title: 'ZD004GH',
    color: 'green',
    icon: TruckFast,
    subtitle: 'prije 13 sati',
    shareUrl: 'http://example.com',
  },
];

export const Empty: Story = {
  args: {
    operationalVehicles: [],
    timedOutVehicles: [],
  },
};

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
