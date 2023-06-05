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
    shareUrl: 'http://example.com',
    meta: ['0 km/h'],
  },
  {
    id: '2',
    title: 'ZD003CD',
    color: 'green',
    icon: TruckFast,
    shareUrl: 'http://example.com',
    meta: ['30 km/h'],
  },
];

const timedOutVehicles = [
  {
    id: '3',
    title: 'ZD003EF',
    color: 'orange',
    icon: Truck,
    shareUrl: 'http://example.com',
    meta: ['0 km/h'],
  },
  {
    id: '4',
    title: 'ZD004GH',
    color: 'green',
    icon: TruckFast,
    shareUrl: 'http://example.com',
    meta: ['70 km/h'],
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
