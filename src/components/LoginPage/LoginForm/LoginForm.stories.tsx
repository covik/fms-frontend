import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginForm } from './LoginForm';

export default {
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Initial = Template.bind({});
Initial.args = {
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  isLoading: false,
  emailError: 'Email je obavezan',
  passwordError: 'Email je obavezan',
};
