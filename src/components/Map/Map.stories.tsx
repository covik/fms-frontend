import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Map } from './Map';

export default {
  title: 'Map',
  component: Map,
} as ComponentMeta<typeof Map>;

const croatia = {
  x: 44.698832,
  y: 16.373162,
};

const Template: ComponentStory<typeof Map> = ({ x, y, z, ...args }) => (
  <Map x={croatia.x} y={croatia.y} z={6} {...args} />
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
