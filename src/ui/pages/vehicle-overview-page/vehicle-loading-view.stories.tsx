import { VehicleLoadingView } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Vehicle Overview/Loading View',
  component: VehicleLoadingView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof VehicleLoadingView>;
type Story = StoryObj<typeof VehicleLoadingView>;

export const Default: Story = {};
