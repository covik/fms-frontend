import { Meta, StoryFn } from '@storybook/react';
import { LivePreview } from './LivePreview';

export default {
  component: LivePreview,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as Meta<typeof LivePreview>;

const Template: StoryFn<typeof LivePreview> = () => <LivePreview />;

export const Default = {
  render: Template,
};
