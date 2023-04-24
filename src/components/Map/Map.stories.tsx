import { Meta, StoryFn } from '@storybook/react';
import { Map } from './Map';

const croatia = {
  x: 44.698832,
  y: 16.373162,
};

export default {
  component: Map,
  args: {
    x: croatia.x,
    y: croatia.y,
    z: 6,
  },
} as Meta<typeof Map>;

const Template: StoryFn<typeof Map> = ({ x, y, z, ...args }) => (
  <Map x={x} y={y} z={z} {...args} />
);

export const Basic = {
  render: Template,

  args: {
    width: '400px',
    height: '400px',
  },
};

export const WithoutControls = {
  render: Template,

  args: {
    ...Basic.args,
    noControls: true,
  },
};

export const WithoutLabels = {
  render: Template,

  args: {
    ...Basic.args,
    noLabels: true,
  },
};
