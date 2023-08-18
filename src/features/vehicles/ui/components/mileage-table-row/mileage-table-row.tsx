import { Box, Skeleton, styled } from '@mui/material';
import type { CSSProperties } from 'react';

const barHeight = '5px';
const Bar = styled(Box)({
  height: '5px',
  borderRadius: barHeight,
});

const StyledSkeleton = styled(Skeleton)({
  display: 'inline-block',
});

const breakpoint = 'md';

const ZebraRow = styled(Box)(({ theme }) => ({
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledRow = styled(ZebraRow)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridTemplateRows: 'auto',
  gridTemplateAreas: `"name mileage odometer" "bar bar bar"`,
  fontSize: theme.typography.body2.fontSize,

  [theme.breakpoints.up(breakpoint)]: {
    gridTemplateColumns: 'repeat(3,105px) auto',
    gridTemplateAreas: `"name mileage odometer bar"`,
  },
}));

const HeaderRow = styled(StyledRow)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}));

const Column = styled('div')(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
}));

const NameColumn = styled(Column)({
  gridArea: 'name',
  textAlign: 'left',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const MileageColumn = styled(Column)({
  gridArea: 'mileage',
  textAlign: 'right',
});

const OdometerColumn = styled(Column)({
  gridArea: 'odometer',
  textAlign: 'right',
});

const BarColumn = styled(Column)({
  gridArea: 'bar',
  display: 'flex',
  alignItems: 'center',
});

export interface MileageTableRowAttributes {
  name: string;
  mileage: string;
  odometer: string;
  barColor: CSSProperties['color'];
  barWidthPercentage: number;
}

export function MileageTableRow({
  name,
  mileage,
  odometer,
  barColor,
  barWidthPercentage,
}: MileageTableRowAttributes) {
  return (
    <StyledRow>
      <NameColumn>{name}</NameColumn>
      <MileageColumn>{mileage}</MileageColumn>
      <OdometerColumn>{odometer}</OdometerColumn>
      <BarColumn>
        <Bar
          sx={{
            backgroundColor: barColor,
            width: `${barWidthPercentage}%`,
          }}
        />
      </BarColumn>
    </StyledRow>
  );
}

export function MileageTableRowLoading() {
  const fontSize = '20px';
  const textSkeleton = (
    <StyledSkeleton variant={'text'} width={'65px'} height={fontSize} />
  );

  return (
    <StyledRow>
      <NameColumn>{textSkeleton}</NameColumn>
      <MileageColumn>{textSkeleton}</MileageColumn>
      <OdometerColumn>{textSkeleton}</OdometerColumn>
      <BarColumn>
        <StyledSkeleton variant={'rounded'} width={'100%'} height={barHeight} />
      </BarColumn>
    </StyledRow>
  );
}

export function MileageTableRowNoData() {
  return (
    <ZebraRow textAlign={'center'}>
      <Column>Nema podataka</Column>
    </ZebraRow>
  );
}

export function MileageTableHeaderRow() {
  return (
    <HeaderRow>
      <NameColumn>Vozilo</NameColumn>
      <MileageColumn>Kilometri</MileageColumn>
      <OdometerColumn>Brojčanik</OdometerColumn>
    </HeaderRow>
  );
}
