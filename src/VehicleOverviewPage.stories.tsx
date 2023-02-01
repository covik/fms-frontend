import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { VehicleOverviewPage } from './VehicleOverviewPage';

export default {
  title: 'VehicleOverviewPage',
  component: VehicleOverviewPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VehicleOverviewPage>;

const Template: ComponentStory<typeof VehicleOverviewPage> = () => (
  <VehicleOverviewPage />
);

export const Default = Template.bind({});
