import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navigation } from './Navigation';

export default {
  title: 'Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = () => <Navigation />;

export const Rail = Template.bind({});
