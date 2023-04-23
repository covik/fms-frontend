import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VehicleCard } from './VehicleCard';
import { Truck, TruckFast } from 'mdi-material-ui';

export default {
  component: VehicleCard,
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
  <VehicleCard {...args} title={'ZD000AA'} />
);

export const Moving = Template.bind({});
Moving.args = {
  subtitle: 'prije manje od minute',
  icon: TruckFast,
  color: 'green',
};

export const Stationary = Template.bind({});
Stationary.args = {
  subtitle: 'prije 55 minuta',
  icon: Truck,
  color: 'orange',
};

export const Stopped = Template.bind({});
Stopped.args = {
  subtitle: 'prije 5 minuta',
  icon: Truck,
  color: 'green',
};

export const Towed = Template.bind({});
Towed.args = {
  subtitle: 'prije manje od minute',
  icon: TruckFast,
  color: 'orange',
};
