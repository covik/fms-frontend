import { FullHeightContentPlaceholder } from '#storybook/placeholders';
import { PageLayout } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridContent, GridSidebar } from '../vehicle-layout';

export default {
  title: 'Templates/Vehicles Live Tracking',
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
