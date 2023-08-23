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

/**
 * A default state assumes there is not data.
 * While the data fetches in the background, skeleton loaders are shown.
 */
export const Default: Story = {
  args: {
    vehicles: undefined,
  },
};

/**
 * Renders all possible categories.
 */
export const AllCategories = {
  args: {
    vehicles: [
      activeVehicles[0],
      activeVehicles[2],
      unavailableVehicles[0],
      unavailableVehicles[1],
    ],
  },
};

/**
 * Renders single category (active vehicles).
 */
export const SingleCategory = {
  args: {
    vehicles: [
      activeVehicles[0],
      activeVehicles[1],
      activeVehicles[2],
      activeVehicles[3],
    ],
  },
};

/**
 * Shows how UI looks like when there is a lot of vehicles.
 *
 * On desktop, the sidebar should be scrollable but the whole page should not be,
 * this prevents Google Maps saying you need to hold Ctrl in order to zoom in the map.
 *
 * On mobile, control panel should be expanded to 95% of the screen.
 */
export const ManyVehicles: Story = {
  args: {
    vehicles: [...activeVehicles, ...unavailableVehicles],
  },
};

/**
 * What renders when the data loads but there is no vehicles.
 */
export const Empty: Story = {
  args: {
    vehicles: [],
  },
};

/**
 * Show a loading spinner on the map if the data is being refreshed in the background.
 */
export const Refreshing: Story = {
  args: {
    ...AllCategories.args,
    refreshingData: true,
  },
};

/**
 * If initial data is not loaded yet,
 * there is no point in showing refresh indicator
 */
export const RefreshingNoData: Story = {
  args: {
    ...Default.args,
    refreshingData: true,
  },
  parameters: {},
};
