import { StoryFn, Meta } from '@storybook/react';
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
} as Meta<typeof VehicleCard>;

const Template: StoryFn<typeof VehicleCard> = (args) => (
  <VehicleCard {...args} title={'ZD000AA'} />
);

export const Moving = {
  render: Template,

  args: {
    subtitle: 'prije manje od minute',
    icon: TruckFast,
    color: 'green',
  },
};

export const Stationary = {
  render: Template,

  args: {
    subtitle: 'prije 55 minuta',
    icon: Truck,
    color: 'orange',
  },
};

export const Stopped = {
  render: Template,

  args: {
    subtitle: 'prije 5 minuta',
    icon: Truck,
    color: 'green',
  },
};

export const Towed = {
  render: Template,

  args: {
    subtitle: 'prije manje od minute',
    icon: TruckFast,
    color: 'orange',
  },
};
