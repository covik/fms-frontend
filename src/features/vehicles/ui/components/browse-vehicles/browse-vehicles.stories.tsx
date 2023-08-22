import { faker } from '@faker-js/faker';
import { BrowseVehicles } from './index';
import { adaptLocatedVehicles } from '../../adapters/vehicle-adapter';
import {
  createOperationalVehicle,
  createUnavailableVehicle,
} from '../../../models/vehicle/factory';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Browse Vehicles',
  component: BrowseVehicles,
} satisfies Meta<typeof BrowseVehicles>;
type Story = StoryObj<typeof BrowseVehicles>;

faker.seed(7);

const formatters: Parameters<typeof adaptLocatedVehicles>[1] = {
  formatSpeed: (speed) => `${Math.round(speed.value())} ${speed.symbol()}`,
  formatPower: (power) => `${power.value().toFixed(1)} ${power.symbol()}`,
};

const activeVehicles = adaptLocatedVehicles(
  [createOperationalVehicle({ faker }), createOperationalVehicle({ faker })],
  formatters,
);

const unavailableVehicles = adaptLocatedVehicles(
  [createUnavailableVehicle({ faker }), createUnavailableVehicle({ faker })],
  formatters,
);

export const All: Story = {
  args: {
    vehicles: [...activeVehicles, ...unavailableVehicles],
  },
};

export const Loading: Story = {
  args: {
    vehicles: undefined,
  },
};

export const Empty: Story = {
  args: {
    vehicles: [],
  },
};

export const OnlyOperationalVehicles: Story = {
  args: {
    vehicles: activeVehicles,
  },
};

export const OnlyUnavailableVehicles: Story = {
  args: {
    vehicles: unavailableVehicles,
  },
};
