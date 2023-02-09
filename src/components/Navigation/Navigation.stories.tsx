import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navigation } from './Navigation';

export default {
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const Rail = Template.bind({});

export const Bar = Template.bind({});
Bar.args = {
  bar: true,
};
