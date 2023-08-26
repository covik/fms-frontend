import { ThemeManager } from '#app';
import type { Decorator } from '@storybook/react';

export const withDesignBaseline: Decorator = (Story) => (
  <ThemeManager>
    <Story />
  </ThemeManager>
);
