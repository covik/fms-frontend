import { RouteBrowser } from './RouteBrowser';
import { Meta, StoryFn } from '@storybook/react';

export default {
  component: RouteBrowser,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as Meta<typeof RouteBrowser>;

const Template: StoryFn<typeof RouteBrowser> = () => <RouteBrowser />;

export const Default = {
  render: Template,
};
