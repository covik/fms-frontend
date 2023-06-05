import {
  Box,
  Card,
  CardHeader,
  Chip,
  Icon,
  IconButton,
  Stack,
} from '@mui/material';
import { ShareVariant } from 'mdi-material-ui';
import type { SvgIcon } from '@mui/material';
import type { CSSProperties, MouseEvent } from 'react';

export interface CardAttributes {
  title: string;
  icon: typeof SvgIcon;
  color: CSSProperties['color'];
  meta: string[];
  onShare?: (event: MouseEvent) => void;
}

export function VehicleCard(props: CardAttributes) {
  const { title, icon: Icon, color: headerColor, meta, onShare } = props;

  return (
    <Card data-testid={testingSelectors.cardRoot}>
      <CardHeader
        avatar={<Icon fontSize="large" htmlColor={headerColor} />}
        title={title}
        titleTypographyProps={{
          color: headerColor,
          variant: 'h6',
          component: 'h1',
        }}
        action={
          typeof onShare === 'function' ? (
            <IconButton
              onClick={onShare}
              data-testid={testingSelectors.shareButton}
            >
              <ShareVariant fontSize="medium" />
            </IconButton>
          ) : null
        }
        sx={{
          'padding': 1.2,
          'paddingTop': 1,
          'paddingBottom': 0,
          '.MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />
      <Box sx={{ padding: 1.2, paddingTop: '4px', paddingBottom: 1 }}>
        <Stack direction={'row'} spacing={'6px'}>
          {meta.map((value) => (
            <Chip
              key={value}
              clickable={false}
              size={'small'}
              label={value}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'inherit',
              })}
            />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

export const testingSelectors = {
  cardRoot: 'vehicle-card',
  shareButton: 'share-vehicle',
};
