import { withNavigation } from '#storybook/decorators';
import { SingleVehicleTracking } from '.';
import { VehicleCommonInterface } from '../manage-vehicle';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Single Vehicle Tracking',
  component: SingleVehicleTracking,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withNavigation(0)],
  argTypes: {
    warning: {
      control: { type: 'select' },
      options: ['None', 'Unavailable', 'Disabled'],
      mapping: {
        None: undefined,
        Unavailable: 'unavailable',
        Disabled: 'disabled',
      },
    },
  },
  render: (args) => (
    <VehicleCommonInterface id={'irrelevant'} name={args.name}>
      <SingleVehicleTracking {...args} />
    </VehicleCommonInterface>
  ),
} satisfies Meta<typeof SingleVehicleTracking>;
type Story = StoryObj<typeof SingleVehicleTracking>;

export const Normal: Story = {
  args: {
    name: 'ZD000AA',
    latitude: 45.123456,
    longitude: 15.123456,
    courseInDegrees: 65,
    ignitionOn: true,
    moving: true,
    mileage: '79000.1 km',
    speed: '52 km/h',
    voltage: '14.1 V',
    updatedAt: 'prije 20 sekundi',
    humanReadableCourse: 'Sjeveroistok',
    altitude: '27 m',
    online: true,
    latency: '4s',
  },
};

export const Unavailable: Story = {
  args: {
    ...Normal.args,
    warning: 'unavailable',
  },
};

export const Disabled: Story = {
  args: {
    ...Normal.args,
    warning: 'disabled',
  },
};
