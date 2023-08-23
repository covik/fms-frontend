import type { NavigationImplementationRendererAttributes } from './types';

export function DefaultRenderer({
  children,
}: NavigationImplementationRendererAttributes) {
  return children(false);
}
