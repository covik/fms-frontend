import { VehicleWithoutPositionView } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Vehicle Without Position View',
  component: VehicleWithoutPositionView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VehicleWithoutPositionView>;
type Story = StoryObj<typeof VehicleWithoutPositionView>;

export const Default: Story = {
  args: {
    name: 'ZD002BB',
  },
};
