import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Map } from './Map';

const croatia = {
  x: 44.698832,
  y: 16.373162,
};

export default {
  title: 'Map',
  component: Map,
  args: {
    x: croatia.x,
    y: croatia.y,
    z: 6,
  },
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = ({ x, y, z, ...args }) => (
  <Map x={x} y={y} z={z} {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  width: '400px',
  height: '400px',
};

export const WithoutControls = Template.bind({});
WithoutControls.args = {
  ...Basic.args,
  noControls: true,
};

export const WithoutLabels = Template.bind({});
WithoutLabels.args = {
  ...Basic.args,
  noLabels: true,
};
