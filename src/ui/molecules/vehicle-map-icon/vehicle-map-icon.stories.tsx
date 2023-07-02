import { VehicleMapIcon } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Vehicle Map Icon',
  component: VehicleMapIcon,
} satisfies Meta<typeof VehicleMapIcon>;

type Story = StoryObj<typeof VehicleMapIcon>;

export const MovingWithIgnition: Story = {
  args: {
    ignitionOn: true,
    moving: true,
  },
};

export const MovingWithIgnitionPlusAngle: Story = {
  args: {
    ...MovingWithIgnition.args,
    angleInDegrees: 65,
  },
};

export const MovingWithoutIgnition: Story = {
  args: {
    ignitionOn: false,
    moving: true,
  },
};

export const StationaryWithoutIgnition: Story = {
  args: {
    ignitionOn: false,
    moving: false,
  },
};

export const StationaryWithIgnition: Story = {
  args: {
    ignitionOn: true,
    moving: false,
  },
};
