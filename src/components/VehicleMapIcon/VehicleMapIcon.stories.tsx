import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from './VehicleMapIcon';
import type { StoryObj, Meta } from '@storybook/react';

export default {
  component: VehicleMapIconStationary,
} satisfies Meta<typeof VehicleMapIconStationary>;

type StoryStationary = StoryObj<typeof VehicleMapIconStationary>;
type StoryMoving = StoryObj<typeof VehicleMapIconMoving>;

export const StationaryWithoutIgnition: StoryStationary = {
  render: () => <VehicleMapIconStationary active={false} />,
};

export const StationaryWithIgnition: StoryStationary = {
  render: () => <VehicleMapIconStationary active={true} />,
};

export const MovingWithIgnition: StoryMoving = {
  render: () => <VehicleMapIconMoving active={true} angle={0} />,
};

export const MovingWithoutIgnition: StoryMoving = {
  render: () => <VehicleMapIconMoving active={false} angle={0} />,
};

export const MovingWithAngle: StoryMoving = {
  render: ({ angle }) => <VehicleMapIconMoving active={true} angle={angle} />,

  args: {
    angle: 270,
  },
};
