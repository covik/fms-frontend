import type { Meta, StoryFn } from '@storybook/react';
import { LoginView } from './LoginView';

export default {
  component: LoginView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} as Meta<typeof LoginView>;

export const Initial = {
  args: {
    state: 'initial',
  },
};

export const Submitting = {
  args: {
    state: 'submitting',
  },
};

export const ValidationError = {
  args: {
    state: 'validation-error',
    emailError: 'Email je obavezan',
    passwordError: 'Lozinka je obavezna',
  },
};

export const WrongCredentials = {
  args: {
    state: 'wrong-credentials',
  },
};

export const UnexpectedError = {
  args: {
    state: 'unexpected-error',
  },
};
