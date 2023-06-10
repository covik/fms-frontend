import { VersionProvider } from '../../foundation';
import { UpdateReadyBanner } from './UpdateReadyBanner';
import type { Meta } from '@storybook/react';

const mockApplyUpdate = () => {
  console.log('apply update clicked (mock)');
};

export default {
  component: UpdateReadyBanner,
} satisfies Meta<typeof UpdateReadyBanner>;

export const UpdateReady = {
  render: () => (
    <VersionProvider isUpdateReady={true} applyUpdate={mockApplyUpdate}>
      <UpdateReadyBanner />
    </VersionProvider>
  ),
};

export const NoUpdate = {
  render: () => (
    <VersionProvider isUpdateReady={false} applyUpdate={mockApplyUpdate}>
      <UpdateReadyBanner />
    </VersionProvider>
  ),
};
