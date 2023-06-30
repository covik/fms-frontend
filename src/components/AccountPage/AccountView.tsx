import { Avatar, Box, Card, CardHeader, useTheme } from '@mui/material';
import {
  AccountTie as UserIcon,
  ShieldAccount as AdminIcon,
} from 'mdi-material-ui';
import { FluidPage, PagePadding, PageTitle } from '#ui/atoms';
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
    <FluidPage>
      <PagePadding>
        <PageTitle>Račun</PageTitle>
        <Card>
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
      </PagePadding>
    </FluidPage>
  );
}
