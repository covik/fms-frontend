import { RouteIconBackground } from './route-icon-background';

export function RouteStartIcon() {
  const green = '#00ab36';

  return (
    <RouteIconBackground color={green}>
      <path
        fill={green}
        d="M14.47,19V14.41h3.06V19h3.82V12.88h2.29L16,6,8.35,12.88h2.29V19Z"
      />
    </RouteIconBackground>
  );
}
