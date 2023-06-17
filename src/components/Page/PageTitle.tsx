import { Skeleton, Typography, useTheme } from '@mui/material';

export function PageTitle({ children }: { children: string }) {
  return (
    <Typography
      component="h1"
      variant="h3"
      fontWeight="medium"
      marginBottom={1}
    >
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
