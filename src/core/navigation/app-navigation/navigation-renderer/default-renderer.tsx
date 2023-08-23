import type { ConcreteRendererProps } from './types';

export function DefaultRenderer({ children }: ConcreteRendererProps) {
  return children(false);
}
