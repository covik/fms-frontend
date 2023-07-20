import { GoogleMaps } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const croatia = {
  x: 44.698832,
  y: 16.373162,
};

export default {
  title: 'Organisms/Google Maps',
  component: GoogleMaps.Map,
  args: {
    x: croatia.x,
    y: croatia.y,
    z: 6,
  },
} satisfies Meta<typeof GoogleMaps.Map>;
type Story = StoryObj<typeof GoogleMaps.Map>;

export const Basic: Story = {
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
