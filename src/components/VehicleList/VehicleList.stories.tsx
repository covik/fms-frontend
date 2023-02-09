import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VehicleList } from './VehicleList';
import * as VehicleCardStories from '../VehicleCard/VehicleCard.stories';
import { CardAttributes } from '../VehicleCard';

export default {
  component: VehicleList,
} as ComponentMeta<typeof VehicleList>;

const Template: ComponentStory<typeof VehicleList> = (args) => (
  <VehicleList {...args} />
);

const MovingArgs = VehicleCardStories.Moving.args as CardAttributes;
const StoppedArgs = VehicleCardStories.Stopped.args as CardAttributes;
const StationaryArgs = VehicleCardStories.Stationary.args as CardAttributes;

export const Default = Template.bind({});
Default.args = {
  vehicles: [
    {
      id: '1',
      title: 'ZD001AA',
      subtitle: MovingArgs.subtitle,
      icon: MovingArgs.icon,
      color: MovingArgs.color,
    },
    {
      id: '2',
      title: 'ZD002AA',
      subtitle: StoppedArgs.subtitle,
      icon: StoppedArgs.icon,
      color: StoppedArgs.color,
    },
    {
      id: '3',
      title: 'ZD003AA',
      subtitle: StationaryArgs.subtitle,
      icon: StationaryArgs.icon,
      color: StationaryArgs.color,
    },
  ],
};
