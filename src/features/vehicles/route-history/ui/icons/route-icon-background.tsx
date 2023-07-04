import { CSSProperties, ReactNode } from 'react';

export const routeIconSize = 32;
export const routeIconPadding = 3;

interface RouteIconBackgroundAttributes {
  color: CSSProperties['color'];
  children: ReactNode;
}

export function RouteIconBackground({
  color,
  children,
}: RouteIconBackgroundAttributes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={routeIconSize}
      height={routeIconSize}
    >
      <circle fill={'#fff'} cx="16" cy="12.5" r="9" />
      <path
        fill={color}
        d="M16,.3A12.22,12.22,0,0,1,27.91,10a11.73,11.73,0,0,1-3.39,11.3,31.23,31.23,0,0,0-6.23,8.32c-.15.3-.29.59-.43.89a2,2,0,0,1-3.72,0A27,27,0,0,0,10,23.93c-1-1.09-2-2.09-3-3.17A11.85,11.85,0,0,1,3.8,12.31,12.2,12.2,0,0,1,13.86.53C14.57.41,15.3.37,16,.3Zm0,3.25a9,9,0,1,0,9,9A9,9,0,0,0,16,3.54Z"
      />
      {children}
    </svg>
  );
}
