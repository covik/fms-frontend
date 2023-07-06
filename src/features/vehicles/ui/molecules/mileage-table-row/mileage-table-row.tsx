import {
  Box,
  Skeleton,
  styled,
  TableCell,
  TableRow,
  tableCellClasses,
} from '@mui/material';
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

const ZebraRow = styled(TableRow)(({ theme }) => ({
  [`& .${tableCellClasses.root}`]: { border: 0 },
  '&:not(:last-of-type)': {
    'border-bottom': `1px solid ${theme.palette.divider}`,
  },
}));

const StyledRow = styled(ZebraRow)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridTemplateRows: 'auto',
  gridTemplateAreas: `"name mileage odometer" "bar bar bar"`,

  [theme.breakpoints.up(breakpoint)]: {
    gridTemplateColumns: 'repeat(3,105px) auto',
    gridTemplateAreas: `"name mileage odometer bar"`,
  },
}));

const NameColumn = styled(TableCell)({
  gridArea: 'name',
  textAlign: 'left',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const MileageColumn = styled(TableCell)({
  gridArea: 'mileage',
  textAlign: 'right',
});

const OdometerColumn = styled(TableCell)({
  gridArea: 'odometer',
  textAlign: 'right',
});

const BarColumn = styled(TableCell)({
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
    <ZebraRow>
      <TableCell align={'center'} width={'100%'}>
        Nema podataka
      </TableCell>
    </ZebraRow>
  );
}

export function MileageTableHeaderRow() {
  return (
    <StyledRow>
      <NameColumn>Vozilo</NameColumn>
      <MileageColumn>Kilometri</MileageColumn>
      <OdometerColumn>Brojčanik</OdometerColumn>
    </StyledRow>
  );
}
