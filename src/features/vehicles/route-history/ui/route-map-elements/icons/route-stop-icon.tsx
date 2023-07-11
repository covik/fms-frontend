import { RouteIconBackground } from './route-icon-background';

export function RouteStopIcon() {
  const orange = '#ed6c02';

  return (
    <RouteIconBackground color={orange}>
      <path
        fill={orange}
        d="M17.4,11.72H14.91V8.61H17.4a1.56,1.56,0,1,1,0,3.11M17.24,5.5H11.8v14h3.11V14.83h2.33a4.67,4.67,0,1,0,0-9.33Z"
      />
    </RouteIconBackground>
  );
}
