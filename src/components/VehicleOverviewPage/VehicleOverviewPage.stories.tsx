import {
  VehicleOverviewView,
  WarningOutdatedPositionData,
  WarningVehicleAwaitingInstallation,
} from './VehicleOverviewView';
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
    title,
  },
};

export const Routes: Story = {
  args: {
    title,
  },
};

export const WarningAwaitingInstallation: Story = {
  args: {
    title,
    children: <WarningVehicleAwaitingInstallation />,
  },
};

export const WarningOutdatedInformation: Story = {
  args: {
    title,
    children: <WarningOutdatedPositionData />,
  },
};
