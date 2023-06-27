import { Skeleton, Typography, useTheme } from '@mui/material';

export interface PageTitleAttributes {
  children: string;
}

export function PageTitle({ children }: PageTitleAttributes) {
  return (
    <Typography component="h1" variant="h3" fontWeight="medium">
      {children}
    </Typography>
  );
}

export function PageTitleSkeleton() {
  const theme = useTheme();

  return (
    <Skeleton
      variant={'text'}
      width={'150px'}
      height={theme.typography.h3.fontSize}
    />
  );
}
