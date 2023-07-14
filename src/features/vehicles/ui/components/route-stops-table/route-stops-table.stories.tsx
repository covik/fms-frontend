import { RouteStopsTable } from '.';
import stops from '../../../fixtures/view/route-stops';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Route Stops Table',
  component: RouteStopsTable,
} satisfies Meta<typeof RouteStopsTable>;
type Story = StoryObj<typeof RouteStopsTable>;

export const Default: Story = {
  args: {
    stops,
  },
};

export const Loading: Story = {
  args: {
    stops: undefined,
  },
};

export const Empty: Story = {
  args: {
    stops: [],
  },
};
