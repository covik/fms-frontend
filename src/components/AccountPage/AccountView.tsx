import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import {
  AccountTie as UserIcon,
  ShieldAccount as AdminIcon,
} from 'mdi-material-ui';
import type { ReactNode } from 'react';

export interface AccountViewAttributes {
  name: string;
  email: string;
  isAdmin?: boolean;
  children: ReactNode;
}

export function AccountView({
  name,
  email,
  isAdmin = false,
  children,
}: AccountViewAttributes) {
  const theme = useTheme();

  return (
    <PageContainer>
      <PageTitle />
      <Card sx={{ marginTop: 1 }}>
        <CardHeader
          title={name}
          subheader={email}
          avatar={
            <Avatar sx={{ backgroundColor: theme.palette.text.disabled }}>
              {isAdmin ? <AdminIcon /> : <UserIcon />}
            </Avatar>
          }
          titleTypographyProps={{
            variant: 'h6',
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.secondary,
          }}
          sx={{ paddingTop: 1, paddingBottom: 1 }}
        />
      </Card>

      <Box sx={{ marginTop: 2 }}>{children}</Box>
    </PageContainer>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: '100%', padding: 1.4 }}>{children}</Box>;
}

function PageTitle() {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="grey"
      fontWeight="medium"
      lineHeight={1}
    >
      Račun
    </Typography>
  );
}
