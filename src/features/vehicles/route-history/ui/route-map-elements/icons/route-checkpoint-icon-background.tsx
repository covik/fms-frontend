import { ReactNode } from 'react';

export const routeCheckpointIconSize = 32;
export const routeCheckpointIconRadius = 16;

export interface RouteCheckpointIconBackgroundAttributes {
  children: ReactNode;
}

export function RouteCheckpointIconBackground({
  children,
}: RouteCheckpointIconBackgroundAttributes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${routeCheckpointIconSize} ${routeCheckpointIconSize}`}
      width={routeCheckpointIconSize}
      height={routeCheckpointIconSize}
    >
      {children}
    </svg>
  );
}
