import type { CSSProperties, ReactNode } from 'react';

const size = 32;

interface IconBackgroundAttributes {
  color: CSSProperties['color'];
  children: ReactNode;
}

function IconBackground({ color, children }: IconBackgroundAttributes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
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

export function FinishIcon() {
  const red = '#d00004';

  return (
    <IconBackground color={red}>
      <path
        fill={'#d00004'}
        d="M10.52,13c0-1.57,0-3.14,0-4.71a.58.58,0,0,1,.27-.52,4.05,4.05,0,0,1,3.85-.58c.76.25,1.5.58,2.24.87a6.2,6.2,0,0,0,1.6.45A3.09,3.09,0,0,0,20.63,8l.07-.05a.47.47,0,0,1,.53-.08.48.48,0,0,1,.25.48q0,2.32,0,4.64c0,.69,0,1.37,0,2.06a.57.57,0,0,1-.26.51,4,4,0,0,1-3.77.61c-.7-.22-1.39-.52-2.07-.79a7.71,7.71,0,0,0-1.72-.54,3,3,0,0,0-2.16.5.23.23,0,0,0-.07.17c0,.79,0,1.57,0,2.36a.45.45,0,0,1-.64.44.45.45,0,0,1-.28-.44q0-.62,0-1.24Q10.52,14.81,10.52,13ZM14.4,11h-.06a3.61,3.61,0,0,0-2.8.26.18.18,0,0,0-.11.19c0,.92,0,1.84,0,2.77,0,0,0,.07,0,.12a4,4,0,0,1,3-.26c0-1,0-2,0-3.06.18.06.37.11.55.19L17,12c.2.08.41.14.63.22,0-.95,0-1.86,0-2.78a.13.13,0,0,0-.08-.09c-.14-.05-.29-.08-.43-.14l-1.89-.76-.79-.3Zm3.21,4.27a3.19,3.19,0,0,0,2.86-.29.2.2,0,0,0,.11-.19c0-.91,0-1.82,0-2.72,0,0,0-.08,0-.14a3.61,3.61,0,0,1-3,.3Z"
      />
    </IconBackground>
  );
}

export function StartIcon() {
  const green = '#00ab36';

  return (
    <IconBackground color={green}>
      <path
        fill={green}
        d="M14.47,19V14.41h3.06V19h3.82V12.88h2.29L16,6,8.35,12.88h2.29V19Z"
      />
    </IconBackground>
  );
}

export function StopIcon() {
  const orange = '#ed6c02';

  return (
    <IconBackground color={orange}>
      <path
        fill={orange}
        d="M17.4,11.72H14.91V8.61H17.4a1.56,1.56,0,1,1,0,3.11M17.24,5.5H11.8v14h3.11V14.83h2.33a4.67,4.67,0,1,0,0-9.33Z"
      />
    </IconBackground>
  );
}
