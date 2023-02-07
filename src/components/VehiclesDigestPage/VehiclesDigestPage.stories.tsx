import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehiclesDigestPage } from './VehiclesDigestPage';
import * as VehicleListStories from '../VehicleList/VehicleList.stories';

export default {
  title: 'VehiclesDigestPage',
  component: VehiclesDigestPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VehiclesDigestPage>;

const Template: ComponentStory<typeof VehiclesDigestPage> = (args) => (
  <VehiclesDigestPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vehicles: VehicleListStories.Default.args?.vehicles,
};
