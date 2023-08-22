import { Box, Chip, Paper, Stack, styled, svgIconClasses } from '@mui/material';
import { selectors } from '../selectors';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

const ComponentName = VehicleCard.name;

const VehicleCardRoot = styled(Paper, {
  name: ComponentName,
  slot: 'Root',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'max-content max-content',
  gridTemplateAreas: '"header" "content"',
  gap: theme.spacing(1 / 2),
  padding: theme.spacing(1),
}));

const CardHeader = styled(Box, {
  name: ComponentName,
  slot: 'Header',
})(({ theme }) => ({
  gridArea: 'header',

  display: 'grid',
  gridTemplateColumns: 'max-content 1fr max-content',
  gridTemplateAreas: '"icon title action"',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const CardContent = styled(Box, {
  name: ComponentName,
  slot: 'Content',
})(({ theme }) => ({
  gridArea: 'content',
}));

const CardTitle = styled(Box, {
  name: ComponentName,
  slot: 'Title',
})(({ theme }) => ({
  gridArea: 'title',

  color: 'inherit',
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const CardIcon = styled(Box, {
  name: ComponentName,
  slot: 'Icon',
})(({ theme }) => ({
  gridArea: 'icon',

  fontSize: theme.typography.h4.fontSize,

  [`& .${svgIconClasses.root}`]: {
    fontSize: 'inherit !important',
    display: 'block',
  },
}));

const CardAction = styled(Box, {
  name: ComponentName,
  slot: 'Action',
})(() => ({
  gridArea: 'action',

  [`& .${svgIconClasses.root}`]: {
    display: 'block',
  },
}));

export interface VehicleCardAttributes {
  children: ReactNode;
}

export function VehicleCard({ children }: VehicleCardAttributes) {
  if (!children) return null;

  return (
    <VehicleCardRoot data-testid={selectors.card}>{children}</VehicleCardRoot>
  );
}

export interface VehicleCardHeaderAttributes {
  children: ReactNode;
  color: CSSProperties['color'];
}

export function VehicleCardHeader({
  children,
  color,
}: VehicleCardHeaderAttributes) {
  return <CardHeader color={color}>{children}</CardHeader>;
}

export interface VehicleCardTitleAttributes {
  children: ReactElement | string;
}

export function VehicleCardTitle({ children }: VehicleCardTitleAttributes) {
  return <CardTitle>{children}</CardTitle>;
}

export interface VehicleCardIconAttributes {
  children: ReactElement;
}

export function VehicleCardIcon({ children }: VehicleCardIconAttributes) {
  return <CardIcon>{children}</CardIcon>;
}

export interface VehicleCardActionAttributes {
  children: ReactElement;
}

export function VehicleCardAction({ children }: VehicleCardActionAttributes) {
  return <CardAction>{children}</CardAction>;
}

export interface VehicleCardContentAttributes {
  children: ReactNode;
}

export function VehicleCardContent({ children }: VehicleCardContentAttributes) {
  return <CardContent>{children}</CardContent>;
}

export interface VehicleCardTagsAttributes {
  children: ReactNode;
}

export function VehicleCardTags({ children }: VehicleCardTagsAttributes) {
  return (
    <Stack spacing={1} direction={'row'}>
      {children}
    </Stack>
  );
}

export interface VehicleCardTagAttributes {
  children: string | ReactNode;
}

export function VehicleCardTag({ children }: VehicleCardTagAttributes) {
  return (
    <Chip
      label={children}
      size={'small'}
      clickable={false}
      sx={(theme) => ({
        color: theme.palette.text.secondary,
        cursor: 'inherit',
      })}
    />
  );
}
