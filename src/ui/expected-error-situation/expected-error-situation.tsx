import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { SvgIcon } from '@mui/material';

export interface ExpectedErrorSituationAttributes {
  title: string;
  Icon?: typeof SvgIcon;
  subtitle?: string;
  action?: ReactNode;
}

export function ExpectedErrorSituation({
  title,
  Icon = undefined,
  subtitle = '',
  action = undefined,
}: ExpectedErrorSituationAttributes) {
  return (
    <Box color={(theme) => theme.palette.text.secondary} textAlign={'center'}>
      {Icon ? (
        <Box
          color={(theme) => theme.palette.text.disabled}
          fontSize={'130px'}
          lineHeight={1}
          marginBottom={1}
        >
          <Icon
            fontSize={'inherit'}
            sx={{ display: 'block', margin: '0 auto' }}
          />
        </Box>
      ) : null}

      <Typography
        component={'h1'}
        variant={'h6'}
        fontWeight={(theme) => theme.typography.fontWeightBold}
      >
        {title}
      </Typography>

      {subtitle !== '' ? <Box marginTop={0.5}>{subtitle}</Box> : null}

      {action ? <Box marginTop={4}>{action}</Box> : null}
    </Box>
  );
}
