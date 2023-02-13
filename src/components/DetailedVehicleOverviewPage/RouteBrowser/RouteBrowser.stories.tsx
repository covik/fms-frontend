import { RouteBrowser } from './RouteBrowser';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: RouteBrowser,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as ComponentMeta<typeof RouteBrowser>;

const Template: ComponentStory<typeof RouteBrowser> = () => <RouteBrowser />;

export const Default = Template.bind({});
