import { useVersionManager } from '../../foundation/';
import { UpdateReadyView } from './UpdateReadyView';

export function UpdateReadyBanner() {
  const { isUpdateReady, applyUpdate } = useVersionManager();

  return isUpdateReady ? <UpdateReadyView onConfirm={applyUpdate} /> : null;
}
