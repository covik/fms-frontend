import { AppShell } from '#foundation/ui/app-shell';
import type { Decorator } from '@storybook/react';

export function withAppShell(): Decorator {
  return (Story) => (
    <AppShell>
      <Story />
    </AppShell>
  );
}
