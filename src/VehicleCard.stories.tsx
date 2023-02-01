import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehicleCard } from './VehicleCard';

export default {
  title: 'VehicleCard',
  component: VehicleCard,
} as ComponentMeta<typeof VehicleCard>;

const Template: ComponentStory<typeof VehicleCard> = (args) => (
  <VehicleCard {...args} />
);

export const Moving = Template.bind({});
Moving.args = {
  name: 'ZD000AA',
  ignition: true,
  movement: 'moving',
};
