import { VehicleStateBlock } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Vehicle State Block',
  component: VehicleStateBlock,
} satisfies Meta<typeof VehicleStateBlock>;
type Story = StoryObj<typeof VehicleStateBlock>;

export const MovingWithIgnition: Story = {
  args: {
    ignitionOn: true,
    mileage: '45000 km',
    moving: true,
    voltage: '13.8 V',
    speed: '55 km/h',
  },
};

export const StationaryWithIgnition: Story = {
  args: {
    ignitionOn: true,
    mileage: '45000 km',
    moving: false,
    voltage: '13.8 V',
    speed: '0 km/h',
  },
};

export const StationaryNoIgnition: Story = {
  args: {
    ignitionOn: false,
    mileage: '45000 km',
    moving: false,
    voltage: '12.1 V',
    speed: '0 km/h',
  },
};

export const MovingNoIgnition: Story = {
  args: {
    ignitionOn: false,
    mileage: '45000 km',
    moving: true,
    voltage: '12.1 V',
    speed: '7 km/h',
  },
};
