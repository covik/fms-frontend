import { VehiclesDigestView } from './Views';
import { OperationalVehicle, UnavailableVehicle } from '../../models/Vehicle';
import { locatedVehicleAttributes } from '../../../cypress/fixtures/base-and-located-vehicle-attributes';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehiclesDigestView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VehiclesDigestView>;

type Story = StoryObj<typeof VehiclesDigestView>;

const operationalVehicles = [
  new OperationalVehicle(locatedVehicleAttributes),
  new OperationalVehicle(locatedVehicleAttributes),
];

const unavailableVehicles = [
  new UnavailableVehicle(locatedVehicleAttributes),
  new UnavailableVehicle(locatedVehicleAttributes),
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
