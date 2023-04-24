import { LoginView } from './LoginView';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginView>;

type Story = StoryObj<typeof LoginView>;

export const Initial: Story = {
  args: {
    state: 'initial',
  },
};

export const Submitting: Story = {
  args: {
    state: 'submitting',
  },
};

export const ValidationError: Story = {
  args: {
    state: 'validation-error',
    emailError: 'Email je obavezan',
    passwordError: 'Lozinka je obavezna',
  },
};

export const WrongCredentials: Story = {
  args: {
    state: 'wrong-credentials',
  },
};

export const UnexpectedError: Story = {
  args: {
    state: 'unexpected-error',
  },
};
