import { faker } from '@faker-js/faker';
import { VehiclesDigestView } from './Views';
import {
  createOperationalVehicle,
  createUnavailableVehicle,
} from '../../models/Vehicle/factory';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehiclesDigestView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VehiclesDigestView>;

type Story = StoryObj<typeof VehiclesDigestView>;

faker.seed(7);

const operationalVehicles = [
  createOperationalVehicle({ faker }),
  createOperationalVehicle({ faker }),
];

const unavailableVehicles = [
  createUnavailableVehicle({ faker }),
  createUnavailableVehicle({ faker }),
];

export const All: Story = {
  args: {
    operationalVehicles,
    unavailableVehicles,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    operationalVehicles: [],
    unavailableVehicles: [],
  },
};

export const OnlyOperationalVehicles: Story = {
  args: {
    operationalVehicles,
    unavailableVehicles: [],
  },
};

export const OnlyUnavailableVehicles: Story = {
  args: {
    operationalVehicles: [],
    unavailableVehicles,
  },
};
