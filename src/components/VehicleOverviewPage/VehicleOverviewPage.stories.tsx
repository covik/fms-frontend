import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehicleOverviewPage } from './VehicleOverviewPage';
import * as VehicleListStories from '../VehicleList/VehicleList.stories';

export default {
  title: 'VehicleOverviewPage',
  component: VehicleOverviewPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VehicleOverviewPage>;

const Template: ComponentStory<typeof VehicleOverviewPage> = (args) => (
  <VehicleOverviewPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vehicles: VehicleListStories.Default.args?.vehicles,
};
