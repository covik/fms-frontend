import { VersionProvider } from '../../foundation';
import { AppUpdateReadyBanner } from './AppUpdateReadyBanner';
import type { Meta } from '@storybook/react';

const mockApplyUpdate = () => {
  console.log('apply update clicked (mock)');
};

export default {
  component: AppUpdateReadyBanner,
} satisfies Meta<typeof AppUpdateReadyBanner>;

export const UpdateReady = {
  render: () => (
    <VersionProvider isUpdateReady={true} applyUpdate={mockApplyUpdate}>
      <AppUpdateReadyBanner />
    </VersionProvider>
  ),
};

export const NoUpdate = {
  render: () => (
    <VersionProvider isUpdateReady={false} applyUpdate={mockApplyUpdate}>
      <AppUpdateReadyBanner />
    </VersionProvider>
  ),
};
