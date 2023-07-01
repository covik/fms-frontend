import { withNavigation } from '#storybook/decorators';
import {
  FullHeightContentPlaceholder,
  NavPlaceholder,
  TitlePlaceholder,
  SquareContentPlaceholder,
} from '#storybook/placeholders';
import { PageTitle } from '#ui/atoms/page-title';
import { PageNavigation } from '#ui/molecules/page-navigation';
import {
  CenteredPageLayout,
  PageContent,
  PageHeader,
  PageLayout,
  Grid,
  GridContent,
  GridSidebar,
  WarningContainer,
} from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { NavigationItems } from '#ui/molecules/navigation';

const navigationItems = [
  {
    to: '1',
    label: 'nav',
  },
  {
    to: '2',
    label: 'nav',
  },
  {
    to: '3',
    label: 'nav',
  },
] as unknown as NavigationItems;

export default {
  title: 'Templates/Vehicle Layout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
  decorators: [withNavigation(0)],
} satisfies Meta<typeof PageLayout>;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <PageHeader>
        <TitlePlaceholder>
          <PageTitle>Title</PageTitle>
        </TitlePlaceholder>

        <NavPlaceholder>
          <PageNavigation items={navigationItems}></PageNavigation>
        </NavPlaceholder>
      </PageHeader>

      <PageContent>
        <FullHeightContentPlaceholder>Content</FullHeightContentPlaceholder>
      </PageContent>
    </PageLayout>
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <PageLayout>
      <PageHeader>
        <TitlePlaceholder>
          <PageTitle>Title</PageTitle>
        </TitlePlaceholder>

        <NavPlaceholder>
          <PageNavigation items={navigationItems}></PageNavigation>
        </NavPlaceholder>
      </PageHeader>

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

export const WithSidebarMobile: Story = {
  ...WithSidebar,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithSidebarMobileLandscape: Story = {
  ...WithSidebar,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
      defaultOrientation: 'landscape',
    },
  },
};

export const WithWarning: Story = {
  render: () => (
    <PageLayout>
      <PageHeader>
        <TitlePlaceholder>
          <PageTitle>Title</PageTitle>
        </TitlePlaceholder>

        <NavPlaceholder>
          <PageNavigation items={navigationItems}></PageNavigation>
        </NavPlaceholder>
      </PageHeader>

      <PageContent>
        <WarningContainer>
          <FullHeightContentPlaceholder>Warning</FullHeightContentPlaceholder>
        </WarningContainer>

        <Grid>
          <GridSidebar>
            <FullHeightContentPlaceholder>Sidebar</FullHeightContentPlaceholder>
          </GridSidebar>

          <GridContent>
            <FullHeightContentPlaceholder>Content</FullHeightContentPlaceholder>
          </GridContent>
        </Grid>
      </PageContent>
    </PageLayout>
  ),
};

export const WithWarningMobile: Story = {
  ...WithSidebarMobile,
  ...WithWarning,
};

export const WithWarningMobileLandscape: Story = {
  ...WithSidebarMobileLandscape,
  ...WithWarning,
};

export const Centered: Story = {
  render: () => (
    <CenteredPageLayout>
      <SquareContentPlaceholder>Centered Content</SquareContentPlaceholder>
    </CenteredPageLayout>
  ),
};
