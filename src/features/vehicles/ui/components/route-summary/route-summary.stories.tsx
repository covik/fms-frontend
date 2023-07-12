import { composeStories } from '@storybook/react';
import { NoRouteSummaryData, RouteSummary } from '.';
import * as RouteDurationSummaryStories from '../route-duration-summary/route-duration-summary.stories';
import * as RouteDistanceSummaryStores from '../route-distance-summary/route-distance-summary.stories';
import * as RouteSpeedSummaryStories from '../route-speed-summary/route-speed-summary.stories';
import type { Meta, StoryObj } from '@storybook/react';

const RouteDurationSummary = composeStories(RouteDurationSummaryStories);
const RouteDistanceSummary = composeStories(RouteDistanceSummaryStores);
const RouteSpeedSummary = composeStories(RouteSpeedSummaryStories);

export default {
  title: 'Organisms/Route Summary',
  component: RouteSummary,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof RouteSummary>;
type Story = StoryObj<typeof RouteSummary>;

export const Default: Story = {
  render: () => (
    <RouteSummary>
      <RouteDurationSummary.Collapsed />
      <RouteDistanceSummary.Collapsed />
      <RouteSpeedSummary.Collapsed />
    </RouteSummary>
  ),
};

export const Loading: Story = {
  render: () => (
    <RouteSummary>
      <RouteDurationSummary.CollapsedAndLoading />
      <RouteDistanceSummary.CollapsedAndLoading />
      <RouteSpeedSummary.CollapsedAndLoading />
    </RouteSummary>
  ),
};

export const NoData: Story = {
  render: () => (
    <RouteSummary>
      <NoRouteSummaryData />
    </RouteSummary>
  ),
};
