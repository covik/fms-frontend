import { FullHeightContentPlaceholder } from '#storybook/placeholders';
import { PageLayout } from '.';
import { Grid, GridContent, GridSidebar } from '../single-vehicle-tracking';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Templates/Multiple Vehicles Tracking',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageLayout>;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <Grid>
        <GridSidebar>
          <FullHeightContentPlaceholder>Sidebar</FullHeightContentPlaceholder>
        </GridSidebar>

        <GridContent>
          <FullHeightContentPlaceholder>Content</FullHeightContentPlaceholder>
        </GridContent>
      </Grid>
    </PageLayout>
  ),
};
