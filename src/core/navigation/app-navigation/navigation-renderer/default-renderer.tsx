import type { PrivateRendererAttributes } from './types';

export function DefaultRenderer({ children }: PrivateRendererAttributes) {
  return children(false);
}
