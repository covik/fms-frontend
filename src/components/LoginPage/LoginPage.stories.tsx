import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginPage } from './LoginPage';

export default {
  component: LoginPage,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = () => <LoginPage />;

export const Default = Template.bind({});
