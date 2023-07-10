import { RouteDistanceSummary } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Distance Summary',
  component: RouteDistanceSummary,
} satisfies Meta<typeof RouteDistanceSummary>;
type Story = StoryObj<typeof RouteDistanceSummary>;

export const Expanded: Story = {
  args: {
    initialExpanded: true,
    odometerStart: '72000 km',
    odometerEnd: '72500 km',
    total: '500 km',
  },
};

export const ExpandedAndLoading: Story = {
  args: {
    initialExpanded: true,
    odometerStart: undefined,
    odometerEnd: undefined,
    total: undefined,
  },
};

export const Collapsed: Story = {
  args: {
    ...Expanded.args,
    initialExpanded: false,
  },
};

export const CollapsedAndLoading: Story = {
  args: {
    ...ExpandedAndLoading.args,
    initialExpanded: false,
  },
};
