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
} satisfies Meta<typeof VehiclesMapScreen>;
type Story = StoryObj<typeof VehiclesMapScreen>;

faker.seed(7);
const activeVehicles = new Array(25)
  .fill(undefined)
  .map(() => createOperationalVehicle({ faker }));
const unavailableVehicles = new Array(5)
  .fill(undefined)
  .map(() => createUnavailableVehicle({ faker }));

export const Default: Story = {
  args: {
    operationalVehicles: [activeVehicles[0], activeVehicles[2]],
    unavailableVehicles: [unavailableVehicles[0], unavailableVehicles[1]],
  },
};

export const ManyVehicles: Story = {
  args: {
    operationalVehicles: activeVehicles,
    unavailableVehicles: unavailableVehicles,
  },
};

export const Empty: Story = {
  args: {
    operationalVehicles: [],
    unavailableVehicles: [],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
