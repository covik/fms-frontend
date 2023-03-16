import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginView } from './LoginView';

export default {
  component: LoginView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoginView>;

const Template: ComponentStory<typeof LoginView> = (args) => (
  <LoginView {...args} />
);

export const Initial = Template.bind({});
Initial.args = {
  state: 'initial',
};

export const Submitting = Template.bind({});
Submitting.args = {
  state: 'submitting',
};

export const ValidationError = Template.bind({});
ValidationError.args = {
  state: 'validation-error',
  emailError: 'Email je obavezan',
  passwordError: 'Lozinka je obavezna',
};

export const WrongCredentials = Template.bind({});
WrongCredentials.args = {
  state: 'wrong-credentials',
};

export const UnexpectedError = Template.bind({});
UnexpectedError.args = {
  state: 'unexpected-error',
};
