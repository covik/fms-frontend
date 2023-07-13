import { composeStories } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { withCalendar } from '#storybook/decorators';
import { MultipleVehiclesTracking } from '.';
import { adaptLocatedVehicles } from '../../adapters/vehicle-adapter';
import {
  createOperationalVehicle,
  createUnavailableVehicle,
} from '../../../models/vehicle/factory';
import * as CombinedRouteStories from '../../components/route-map-elements/combined-route.stories';
import type { Meta, StoryObj } from '@storybook/react';

faker.seed(7);
const vehicles = adaptLocatedVehicles([
  createOperationalVehicle({ faker }),
  createOperationalVehicle({ faker }),
  createUnavailableVehicle({ faker }),
]);
const { Default: RouteStory } = composeStories(CombinedRouteStories);

export default {
  title: 'Pages/Multiple Vehicles Tracking',
  component: MultipleVehiclesTracking,
  decorators: [withCalendar()],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    vehicles,
    routeDate: new Date(),
  },
  argTypes: {
    selectedVehicleId: {
      control: { type: 'select' },
      options: vehicles.map((vehicle) => vehicle.name),
      mapping: Object.fromEntries(
        vehicles.map((vehicle) => [vehicle.name, vehicle.id]),
      ),
    },
  },
} satisfies Meta<typeof MultipleVehiclesTracking>;
type Story = StoryObj<typeof MultipleVehiclesTracking>;

export const Default: Story = {};

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

export const RefreshingData: Story = {
  args: {
    dataRefreshInProgress: true,
  },
};

export const VehicleSelected: Story = {
  args: {
    selectedVehicleId: vehicles[1].id,
  },
};

export const WithRoute: Story = {
  args: {
    ...VehicleSelected.args,
    routeSummary: {
      totalDuration: '9h 10m',
      drivingDuration: '8h 10m',
      stopDuration: '1h',
      distance: '700 km',
      startOdometer: '45000 km',
      endOdometer: '45700 km',
      averageSpeed: '40 km/h',
      maxSpeed: '80 km/h',
    },
    routePositions: RouteStory.args.checkpoints,
  },
};

export const WithRouteAndStops: Story = {
  args: {
    ...WithRoute.args,
    routeStops: RouteStory.args.stops,
  },
};

export const OnlyStops: Story = {
  args: {
    ...WithRouteAndStops.args,
    routePositions: [],
    // @ts-expect-error
    routeSummary: {
      ...WithRouteAndStops.args?.routeSummary,
      drivingDuration: '0s',
      totalDuration: '',
    },
  },
};

export const NoRouteData: Story = {
  args: {
    ...VehicleSelected.args,
    routeSummary: null,
    routeStops: [],
    routePositions: [],
  },
};
