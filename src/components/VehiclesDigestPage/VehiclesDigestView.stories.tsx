import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { VehiclesDigestView } from './VehiclesDigestView';
import { Truck, TruckFast } from 'mdi-material-ui';

export default {
  component: VehiclesDigestView,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof VehiclesDigestView>;

export const Default = {
  args: {
    vehicles: [
      {
        id: '1',
        title: 'ZD002AB',
        color: 'orange',
        icon: Truck,
        subtitle: 'prije 15 minuta',
      },
      {
        id: '2',
        title: 'ZD003CD',
        color: 'green',
        icon: TruckFast,
        subtitle: 'prije 30 sekundi',
      },
    ],
  },
};
