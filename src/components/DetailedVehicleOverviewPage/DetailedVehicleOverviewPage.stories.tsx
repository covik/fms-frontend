import { Meta, StoryFn } from '@storybook/react';
import { DetailedVehicleOverviewPage } from './DetailedVehicleOverviewPage';

export default {
  component: DetailedVehicleOverviewPage,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} as Meta<typeof DetailedVehicleOverviewPage>;

export const LiveUpdates = {};

export const Routes = {
  args: {
    activeTab: 'routes',
  },
};
