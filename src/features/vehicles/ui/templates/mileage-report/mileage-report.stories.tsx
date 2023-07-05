import { ContentPlaceholder, TitlePlaceholder } from '#storybook/placeholders';
import { PageTitle } from '#ui/atoms/page-title';
import {
  PageLayout,
  ContentContainer,
  PageContent,
  CalendarContainer,
  PageHeader,
} from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Templates/Mileage Report',
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
      <PageHeader>
        <TitlePlaceholder>
          <PageTitle>Title</PageTitle>
        </TitlePlaceholder>
      </PageHeader>
      <ContentContainer>
        <CalendarContainer>
          <ContentPlaceholder style={{ width: '300px' }}>
            Sidebar content which exceeds two hundred and fifty pixels max
            width.
          </ContentPlaceholder>
          <ContentPlaceholder style={{ marginTop: '2px' }}>
            Sidebar content that's properly engineered.
          </ContentPlaceholder>
        </CalendarContainer>

        <PageContent>
          <ContentPlaceholder>Content</ContentPlaceholder>
        </PageContent>
      </ContentContainer>
    </PageLayout>
  ),
};
