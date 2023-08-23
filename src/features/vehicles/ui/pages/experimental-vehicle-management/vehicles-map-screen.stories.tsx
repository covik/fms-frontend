import { faker } from '@faker-js/faker';
import { VehiclesMapScreen } from './vehicles-map-screen';
import { adaptLocatedVehicles } from '../../adapters/vehicle-adapter';
import {
  createOperationalVehicle,
  createUnavailableVehicle,
} from '../../../models/vehicle/factory';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Vehicles Map Experimental Screen',
  component: VehiclesMapScreen,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    refreshingData: false,
  },
} satisfies Meta<typeof VehiclesMapScreen>;
type Story = StoryObj<typeof VehiclesMapScreen>;

const formatters: Parameters<typeof adaptLocatedVehicles>[1] = {
  formatSpeed: (speed) => `${Math.round(speed.value())} ${speed.symbol()}`,
  formatPower: (power) => `${power.value().toFixed(1)} ${power.symbol()}`,
};

faker.seed(7);
const activeVehicles = adaptLocatedVehicles(
  new Array(25).fill(undefined).map(() => createOperationalVehicle({ faker })),
  formatters,
);
const unavailableVehicles = adaptLocatedVehicles(
  new Array(25).fill(undefined).map(() => createUnavailableVehicle({ faker })),
  formatters,
);

export const Default: Story = {
  args: {
    vehicles: [
      activeVehicles[0],
      activeVehicles[2],
      unavailableVehicles[0],
      unavailableVehicles[1],
    ],
  },
};

export const ManyVehicles: Story = {
  args: {
    vehicles: [...activeVehicles, ...unavailableVehicles],
  },
};

export const Empty: Story = {
  args: {
    vehicles: [],
  },
};

export const Loading: Story = {
  args: {
    vehicles: undefined,
  },
};

export const Refreshing: Story = {
  args: {
    ...Default.args,
    refreshingData: true,
  },
};

/**
 * If initial data is not loaded yet,
 * there is no point in showing refresh indicator
 */
export const RefreshingNoData: Story = {
  args: {
    ...Loading.args,
    refreshingData: true,
  },
  parameters: {},
};
