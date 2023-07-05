import { faker } from '@faker-js/faker';
import { withCalendar } from '#storybook/decorators';
import { MileageReport } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Mileage Report',
  component: MileageReport,
  decorators: [withCalendar()],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    positiveMileage: 10000,
    month: new Date(),
    unit: 'km',
  },
  argTypes: {
    month: {
      control: 'date',
    },
  },
} satisfies Meta<typeof MileageReport>;
type Story = StoryObj<typeof MileageReport>;

faker.seed(2);
const vehicles = generateVehicles(10);

export const Default: Story = {
  args: {
    vehicles,
  },
};

export const Loading: Story = {
  args: {
    vehicles: undefined,
  },
};

export const NoData: Story = {
  args: {
    vehicles: [],
  },
};

function generateVehicles(count: number) {
  return new Array(count).fill(undefined).map(() => ({
    id: faker.string.uuid(),
    name: faker.vehicle.vrm(),
    mileage: faker.number.int({ min: 9400, max: 12000 }),
  }));
}
