import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehiclesDigestView } from './VehiclesDigestView';
import * as VehicleListStories from '../VehicleList/VehicleList.stories';

export default {
  component: VehiclesDigestView,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VehiclesDigestView>;

const Template: ComponentStory<typeof VehiclesDigestView> = (args) => (
  <VehiclesDigestView {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vehicles: VehicleListStories.Default.args?.vehicles,
};
