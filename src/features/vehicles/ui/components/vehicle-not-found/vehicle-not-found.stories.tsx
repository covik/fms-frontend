import { VehicleNotFound } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Vehicle Not Found',
  component: VehicleNotFound,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof VehicleNotFound>;
type Story = StoryObj<typeof VehicleNotFound>;

export const Default: Story = {};
