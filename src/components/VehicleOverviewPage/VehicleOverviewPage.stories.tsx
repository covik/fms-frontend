import { VehicleOverviewView } from './VehicleOverviewView';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehicleOverviewView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VehicleOverviewView>;

type Story = StoryObj<typeof VehicleOverviewView>;

const title = 'ZD001AA';

export const LiveUpdates: Story = {
  args: {
    activeTab: 'live-updates',
    title,
  },
};

export const Routes: Story = {
  args: {
    activeTab: 'routes',
    title,
  },
};
