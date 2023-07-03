import { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { useTheme } from '@mui/material';
import { Coordinates } from '#lib/Dimension';
import { jsxToSVGDataURI } from '../../utils/react';
import type { CSSProperties, ReactElement } from 'react';

export interface MapMarkerAttributes {
  position: Coordinates;
  iconAnchorX: number;
  iconAnchorY: number;
  children: ReactElement;
  label?: string;
  labelOriginX?: number;
  labelOriginY?: number;
  labelClass?: string;
  labelColor?: CSSProperties['color'];
  labelFontWeight?: string;
  labelFontSize?: string;
  zIndex?: number;
  onClick?: () => void;
}

export function MapMarker(props: MapMarkerAttributes) {
  const {
    position,
    iconAnchorX,
    iconAnchorY,
    children,
    label,
    labelClass,
    labelColor,
    labelFontWeight,
    labelFontSize,
    labelOriginX,
    labelOriginY,
    zIndex,
    onClick,
  } = props;
  const latitude = position.latitude();
  const longitude = position.longitude();
  const theme = useTheme();

  const center = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude],
  );

  const labelOrigin: google.maps.Icon['labelOrigin'] = useMemo(() => {
    if (!labelOriginX || !labelOriginY) return undefined;

    return {
      x: labelOriginX,
      y: labelOriginY,
    } as google.maps.Point;
  }, [labelOriginX, labelOriginY]);

  const iconSVGDataUri = jsxToSVGDataURI(children);
  const icon: google.maps.Icon = useMemo(
    () => ({
      url: iconSVGDataUri,
      anchor: {
        x: iconAnchorX,
        y: iconAnchorY,
      } as google.maps.Point,
      labelOrigin,
    }),
    [iconSVGDataUri, iconAnchorX, iconAnchorY, labelOrigin],
  );

  const labelObject: google.maps.MarkerLabel | undefined = useMemo(() => {
    if (!label) return undefined;

    return {
      text: label,
      className: labelClass,
      color: labelColor,
      fontWeight: labelFontWeight,
      fontSize: labelFontSize,
      fontFamily: theme.typography.fontFamily,
    };
  }, [label, labelClass, labelColor, labelFontWeight, labelFontSize]);

  return (
    <Marker
      position={center}
      icon={icon}
      label={labelObject}
      zIndex={zIndex}
      onClick={onClick}
    />
  );
}
