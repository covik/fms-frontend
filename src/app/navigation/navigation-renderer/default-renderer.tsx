import type { ConcreteRendererProps } from './types';
import { BaseRenderer } from './base-renderer';

export function DefaultRenderer({ children }: ConcreteRendererProps) {
  return <BaseRenderer selected={false}>{children}</BaseRenderer>;
}
