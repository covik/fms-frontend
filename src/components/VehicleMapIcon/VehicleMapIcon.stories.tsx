import { StoryObj, Meta, StoryFn } from '@storybook/react';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from './VehicleMapIcon';

export default {
  component: VehicleMapIconStationary,
} as Meta<typeof VehicleMapIconStationary>;

export const StationaryWithoutIgnition = () => (
  <VehicleMapIconStationary active={false} />
);

export const StationaryWithIgnition = () => (
  <VehicleMapIconStationary active={true} />
);

export const MovingWithIgnition = () => (
  <VehicleMapIconMoving active={true} angle={0} />
);

export const MovingWithoutIgnition = () => (
  <VehicleMapIconMoving active={false} angle={0} />
);

export const MovingWithAngle: StoryObj<typeof VehicleMapIconMoving> = {
  render: ({ angle }) => <VehicleMapIconMoving active={true} angle={angle} />,

  args: {
    angle: 270,
  },
};
