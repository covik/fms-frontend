import { Map } from './Map';
import type { Meta, StoryObj } from '@storybook/react';

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
} satisfies Meta<typeof Map>;

type Story = StoryObj<typeof Map>;

export const Basic: Story = {
  render: ({ x, y, z, ...args }) => <Map x={x} y={y} z={z} {...args} />,

  args: {
    width: '400px',
    height: '400px',
  },
};

export const WithoutControls: Story = {
  args: {
    ...Basic.args,
    noControls: true,
  },
};

export const WithoutLabels: Story = {
  args: {
    ...Basic.args,
    noLabels: true,
  },
};
