import { VehicleNotFoundView } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Vehicle Not Found View',
  component: VehicleNotFoundView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof VehicleNotFoundView>;
type Story = StoryObj<typeof VehicleNotFoundView>;

export const Default: Story = {};
