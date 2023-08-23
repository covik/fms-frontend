import { Link } from '@tanstack/router';
import type { ConcreteRendererProps } from '../types';

export function HyperlinkRenderer({
  children,
  ...props
}: ConcreteRendererProps) {
  const { label, icon, ...linkProps } = props;

  return (
    <Link
      {...linkProps}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {children(false)}
    </Link>
  );
}
