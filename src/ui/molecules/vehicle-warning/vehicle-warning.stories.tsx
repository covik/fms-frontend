import { VehicleWarning } from './vehicle-warning';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Vehicle Warning',
  component: VehicleWarning,
} satisfies Meta<typeof VehicleWarning>;
type Story = StoryObj<typeof VehicleWarning>;

export const Unavailable: Story = {
  args: {
    type: 'unavailable',
  },
};

export const Disabled: Story = {
  args: {
    type: 'disabled',
  },
};

export const NoPosition: Story = {
  args: {
    type: 'no-position',
  },
};
