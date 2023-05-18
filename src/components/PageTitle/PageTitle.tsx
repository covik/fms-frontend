import { Typography } from '@mui/material';

export function PageTitle({ children }: { children: string }) {
  return (
    <Typography component="h1" variant="h3" fontWeight="medium">
      {children}
    </Typography>
  );
}
