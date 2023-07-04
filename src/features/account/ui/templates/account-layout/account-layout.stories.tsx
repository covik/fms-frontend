import { PageContent, PageLayout } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '#ui/atoms/page-title';
import { ContentPlaceholder, TitlePlaceholder } from '#storybook/placeholders';

export default {
  title: 'Templates/Account Layout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof PageLayout>;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <TitlePlaceholder>
        <PageTitle>Title</PageTitle>
      </TitlePlaceholder>

      <PageContent>
        <ContentPlaceholder sx={{ height: '70px' }}>
          User Card
        </ContentPlaceholder>

        <ContentPlaceholder>Logout Button</ContentPlaceholder>
      </PageContent>
    </PageLayout>
  ),
};
