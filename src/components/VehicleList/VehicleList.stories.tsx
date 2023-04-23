import { ComponentMeta } from '@storybook/react';
import { VehicleList as VehicleListComponent } from './VehicleList';
import * as VehicleCardStories from '../VehicleCard/VehicleCard.stories';

export default {
  component: VehicleListComponent,
} as ComponentMeta<typeof VehicleListComponent>;

type CardProps = Required<Required<typeof VehicleCardStories.Moving>['args']>;

export const VehicleList = () => (
  <VehicleListComponent>
    <VehicleCardStories.Moving
      {...(VehicleCardStories.Moving.args as CardProps)}
    />
    <VehicleCardStories.Stationary
      {...(VehicleCardStories.Stationary.args as CardProps)}
    />
    <VehicleCardStories.Stopped
      {...(VehicleCardStories.Stopped.args as CardProps)}
    />
    <VehicleCardStories.Towed
      {...(VehicleCardStories.Towed.args as CardProps)}
    />
  </VehicleListComponent>
);
