import { PageTitle, PageTitleSkeleton } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Page Title',
  component: PageTitle,
} satisfies Meta<typeof PageTitle>;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    children: 'Home',
  },
};

export const Skeleton = {
  render: () => <PageTitleSkeleton />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
