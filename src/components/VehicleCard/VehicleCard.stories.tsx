import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehicleCard } from './VehicleCard';
import { Truck, TruckFast } from 'mdi-material-ui';

export default {
  title: 'VehicleCard',
  component: VehicleCard,
} as ComponentMeta<typeof VehicleCard>;

const Template: ComponentStory<typeof VehicleCard> = (args) => (
  <VehicleCard {...args} />
);

export const Moving = Template.bind({});
Moving.args = {
  title: 'ZD000AA',
  subtitle: 'prije 2 minute',
  icon: TruckFast,
  color: 'green',
};

export const Stationary = Template.bind({});
Stationary.args = {
  title: 'ZD000AA',
  subtitle: 'prije 2 minute',
  icon: Truck,
  color: 'orange',
};
