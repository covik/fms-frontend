import { radius, VehicleMapIconBackground } from './icon-background';

const colors = {
  orange: {
    strokeColor: '#d78200',
    fillColor: '#ff9a00',
  },
  green: {
    strokeColor: '#00a706',
    fillColor: '#00cc07',
  },
};

export interface VehicleMapIconAttributes {
  ignitionOn: boolean;
  moving: boolean;
  angleInDegrees?: number | undefined;
}

export function VehicleMapIcon({
  ignitionOn,
  moving,
  angleInDegrees = 0,
}: VehicleMapIconAttributes) {
  const Component = moving ? VehicleMapIconMoving : VehicleMapIconStationary;
  return <Component active={ignitionOn} angle={angleInDegrees} />;
}

interface VehicleMapIconStationaryAttributes {
  active: boolean;
}

function VehicleMapIconStationary({
  active,
}: VehicleMapIconStationaryAttributes) {
  const stopIndicatorSize = 12;
  const stopIndicatorCenter = radius - stopIndicatorSize / 2;
  const { orange, green } = colors;
  const { fillColor, strokeColor } = active ? green : orange;

  return (
    <VehicleMapIconBackground>
      <rect
        data-cy="stop-indicator"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        width={stopIndicatorSize}
        height={stopIndicatorSize}
        x={stopIndicatorCenter}
        y={stopIndicatorCenter}
      />
    </VehicleMapIconBackground>
  );
}

interface VehicleMapIconMovingAttributes {
  active: boolean;
  angle: number;
}

function VehicleMapIconMoving({
  active,
  angle,
}: VehicleMapIconMovingAttributes) {
  const { orange, green } = colors;
  const { fillColor, strokeColor } = active ? green : orange;

  return (
    <VehicleMapIconBackground rotation={angle}>
      <path
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        d="M20 20.725a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20.725z"
        transform="translate(4, 3)"
        rotate={angle}
      />
    </VehicleMapIconBackground>
  );
}
