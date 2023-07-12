import { VehicleLoadingIndicator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Vehicle Loading Indicator',
  component: VehicleLoadingIndicator,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof VehicleLoadingIndicator>;
type Story = StoryObj<typeof VehicleLoadingIndicator>;

export const Default: Story = {};
