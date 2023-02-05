import { Card, CardHeader, Icon, IconButton } from '@mui/material';
import { ShareVariant } from 'mdi-material-ui';
import type { SvgIcon } from '@mui/material';
import type { CSSProperties } from 'react';

export interface CardAttributes {
  title: string;
  subtitle: string;
  icon: typeof SvgIcon;
  color: CSSProperties['color'];
}

export function VehicleCard(props: CardAttributes) {
  const { title, subtitle, icon: Icon, color: headerColor } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Icon fontSize="large" htmlColor={headerColor} />}
        title={title}
        titleTypographyProps={{
          color: headerColor,
          variant: 'h6',
          component: 'h1',
        }}
        subheader={subtitle}
        action={
          <IconButton>
            <ShareVariant fontSize="medium" />
          </IconButton>
        }
        sx={{
          'padding': 1.5,
          '.MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />
    </Card>
  );
}
