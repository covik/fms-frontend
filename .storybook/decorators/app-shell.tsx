import { AppShell } from 'src/app/app-shell';
import type { Decorator } from '@storybook/react';

export function withAppShell(): Decorator {
  return (Story) => (
    <AppShell>
      <Story />
    </AppShell>
  );
}
