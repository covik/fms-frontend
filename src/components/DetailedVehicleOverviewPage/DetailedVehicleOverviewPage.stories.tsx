import { DetailedVehicleOverviewPage } from './DetailedVehicleOverviewPage';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: DetailedVehicleOverviewPage,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DetailedVehicleOverviewPage>;

type Story = StoryObj<typeof DetailedVehicleOverviewPage>;

export const LiveUpdates: Story = {
  args: {
    activeTab: 'live-updates',
  },
};

export const Routes: Story = {
  args: {
    activeTab: 'routes',
  },
};
