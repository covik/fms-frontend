import { Avatar, Card, CardHeader, useTheme } from '@mui/material';
import {
  AccountTie as UserIcon,
  ShieldAccount as AdminIcon,
} from 'mdi-material-ui';
import { PageTitle } from '#ui/atoms/page-title';
import { PageContent, PageLayout } from '../../templates/account-layout';
import { LogoutButton } from '../../atoms/logout-button';
import type { LogoutButtonAttributes } from '../../atoms/logout-button';

export interface AccountViewAttributes {
  name: string;
  email: string;
  logoutInProgress: boolean;
  logoutHandler: LogoutButtonAttributes['onClick'];
  isAdmin?: boolean;
}

export function AccountView({
  name,
  email,
  logoutInProgress,
  logoutHandler,
  isAdmin = false,
}: AccountViewAttributes) {
  const theme = useTheme();

  return (
    <PageLayout>
      <PageTitle>Račun</PageTitle>

      <PageContent>
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

        <LogoutButton loading={logoutInProgress} onClick={logoutHandler} />
      </PageContent>
    </PageLayout>
  );
}
