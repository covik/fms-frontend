import { VehicleList } from './VehicleList';
import { VehicleCard } from '../VehicleCard';
import * as VehicleCardStories from '../VehicleCard/VehicleCard.stories';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VehicleList,
} satisfies Meta<typeof VehicleList>;

type Story = StoryObj<typeof VehicleList>;
type CardProps = Required<Required<typeof VehicleCardStories.Moving>['args']>;

export const Default: Story = {
  render: () => (
    <VehicleList>
      <VehicleCard {...(VehicleCardStories.Moving.args as CardProps)} />
      <VehicleCard {...(VehicleCardStories.Stationary.args as CardProps)} />
      <VehicleCard {...(VehicleCardStories.Stopped.args as CardProps)} />
      <VehicleCard {...(VehicleCardStories.Towed.args as CardProps)} />
    </VehicleList>
  ),
};
