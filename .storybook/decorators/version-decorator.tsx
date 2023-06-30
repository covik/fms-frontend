import { VersionProvider } from '#core/version';
import type { Decorator } from '@storybook/react';

const mockApplyUpdate = () => {
  console.log('apply update clicked (mock)');
};

export function withAppUpdate(updateReady: boolean): Decorator {
  return (Story) => (
    <VersionProvider isUpdateReady={updateReady} applyUpdate={mockApplyUpdate}>
      <Story />
    </VersionProvider>
  );
}
