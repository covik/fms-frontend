import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from './VehicleMapIcon';

export default {
  component: VehicleMapIconStationary,
} as ComponentMeta<typeof VehicleMapIconStationary>;

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

export const MovingWithAngle: ComponentStory<typeof VehicleMapIconMoving> = ({
  angle,
}) => <VehicleMapIconMoving active={true} angle={angle} />;

MovingWithAngle.args = {
  angle: 270,
};
