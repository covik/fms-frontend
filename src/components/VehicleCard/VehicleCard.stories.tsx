import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehicleCard } from './VehicleCard';
import { Truck, TruckFast } from 'mdi-material-ui';

export default {
  title: 'VehicleCard',
  component: VehicleCard,
  args: {
    title: 'ZD000AA',
    subtitle: 'prije 2 minute',
  },
  argTypes: {
    icon: {
      options: ['Truck', 'TruckFast'],
      mapping: {
        Truck,
        TruckFast,
      },
    },
  },
} as ComponentMeta<typeof VehicleCard>;

const Template: ComponentStory<typeof VehicleCard> = (args) => (
  <VehicleCard {...args} />
);

export const Moving = Template.bind({});
Moving.args = {
  icon: TruckFast,
  color: 'green',
};

export const Stationary = Template.bind({});
Stationary.args = {
  icon: Truck,
  color: 'orange',
};

export const Stopped = Template.bind({});
Stopped.args = {
  icon: Truck,
  color: 'green',
};

export const Towed = Template.bind({});
Towed.args = {
  icon: TruckFast,
  color: 'orange',
};
