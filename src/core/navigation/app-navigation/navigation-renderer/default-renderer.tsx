import type { NavigationRendererAttributes } from './types';

export function DefaultRenderer({ children }: NavigationRendererAttributes) {
  return children(false);
}
