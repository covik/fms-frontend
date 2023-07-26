import { faker } from '@faker-js/faker';
import { ClosestVehicleList } from './closest-vehicle-list';
import type { Vehicle } from './closest-vehicle-list';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Closest Vehicle List',
  component: ClosestVehicleList,
} satisfies Meta<typeof ClosestVehicleList>;
type Story = StoryObj<typeof ClosestVehicleList>;

faker.seed(155);

const vehicles = generateVehicles(9);

export const Default: Story = {
  args: {
    vehicles,
  },
};

export const NoVehicles: Story = {
  args: {
    vehicles: [],
  },
};

function generateVehicles(count: number): Vehicle[] {
  const rawVehicles = new Array(count).fill(undefined).map(() => {
    const distance = faker.number.int({
      min: 1,
      max: 1250,
    });
    const hours = faker.number.int({ min: 0, max: 4 });
    const minutes = faker.number.int({ min: 0, max: 60 });

    const duration = [hours, minutes].filter(Boolean);
    const [hoursText = '', minutesText = ''] = duration;
    const formattedDuration = [
      hoursText === '' ? '' : `${hoursText}h`,
      minutesText === '' ? '' : `${minutesText}m`,
    ].join(' ');

    return {
      id: faker.string.uuid(),
      name: faker.vehicle.vrm(),
      distance,
      travelTime: formattedDuration,
      selected: faker.datatype.boolean({ probability: 0.1 }),
    };
  });

  return rawVehicles
    .slice()
    .sort((a, b) => a.distance - b.distance)
    .map((vehicle) => ({
      ...vehicle,
      distance: `${vehicle.distance} km`,
    }));
}
