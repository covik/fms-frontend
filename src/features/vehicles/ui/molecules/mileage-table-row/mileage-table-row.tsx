import { Box, Skeleton, styled, TableCell, TableRow } from '@mui/material';
import { CSSProperties } from 'react';

const Bar = styled(Box)({
  height: '5px',
  borderRadius: '5px',
});

const StyledSkeleton = styled(Skeleton)({
  margin: 'auto',
});

const breakpoint = 'md';
export const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  '& > *:nth-of-type(1), & > *:nth-of-type(2), & > *:nth-of-type(3)': {
    textAlign: 'center',
  },
  [theme.breakpoints.down(breakpoint)]: {
    '& > *:nth-of-type(4)': {
      display: 'none',
    },
  },
  [theme.breakpoints.up(breakpoint)]: {
    '& > *:nth-of-type(1), & > *:nth-of-type(2), & > *:nth-of-type(3)': {
      width: '18%',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& > *:nth-of-type(1), & > *:nth-of-type(2), & > *:nth-of-type(3)': {
      width: '10%',
    },
  },
}));

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
      <TableCell>{name}</TableCell>
      <TableCell>{mileage}</TableCell>
      <TableCell>{odometer}</TableCell>
      <TableCell>
        <Bar
          sx={{
            backgroundColor: barColor,
            width: `${barWidthPercentage}%`,
          }}
        />
      </TableCell>
    </StyledRow>
  );
}

export function MileageTableRowLoading() {
  return (
    <StyledRow>
      <TableCell>
        <StyledSkeleton variant={'text'} width={'45px'} />
      </TableCell>
      <TableCell>
        <StyledSkeleton variant={'text'} width={'45px'} />
      </TableCell>
      <TableCell>
        <StyledSkeleton variant={'text'} width={'45px'} />
      </TableCell>
      <TableCell>
        <StyledSkeleton variant={'text'} width={'100%'} />
      </TableCell>
    </StyledRow>
  );
}

export function MileageTableRowNoData() {
  return (
    <StyledRow>
      <TableCell align={'center'} width={'100%'}>
        Nema podataka
      </TableCell>
    </StyledRow>
  );
}
