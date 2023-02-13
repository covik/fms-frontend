import { RouteFilter } from './RouteFilter';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: RouteFilter,
} as ComponentMeta<typeof RouteFilter>;

const Template: ComponentStory<typeof RouteFilter> = (args) => (
  <RouteFilter {...args} />
);

export const Today = Template.bind({});

export const Yesterday = Template.bind({});
Yesterday.args = {
  view: 'yesterday',
};

export const Custom = Template.bind({});
Custom.args = {
  view: 'custom',
};
