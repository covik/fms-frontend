import { ReactElement, useCallback } from 'react';
import { Box, styled, SwipeableDrawer } from '@mui/material';
import { Car, ChevronUp } from 'mdi-material-ui';
import type { ReactNode } from 'react';

const ComponentName = 'BottomControlPanel';

const ControlPanel = styled(SwipeableDrawer, {
  name: ComponentName,
  slot: 'Root',
})(() => ({}));

const PullerContainer = styled(Box, {
  name: ComponentName,
  slot: 'PullerContainer',
})(() => ({
  position: 'absolute',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: 'visible',
  right: 0,
  left: 0,
}));

const Puller = styled(Box, {
  name: ComponentName,
  slot: 'Puller',
})(({ theme }) => ({
  'backgroundColor': theme.palette.background.default,
  'borderRadius': '50% 50% 0 0',
  'color': theme.palette.primary.light,
  'boxShadow': theme.shadows['5'],
  'padding': '6px 8px 3px',

  'position': 'absolute',
  'left': '50%',
  'transform': 'translateX(-50%)',
  'top': '0',
  'zIndex': -1,

  '& > svg': {
    display: 'block !important',
  },
}));

const Content = styled(Box, {
  name: ComponentName,
  slot: 'Content',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  overflow: 'auto',
}));

const defaultBleeding = 44;
const DefaultPullerIcon = <ChevronUp fontSize={'large'} />;

export interface BottomControlPanelAttributes {
  children: ReactNode;
  visible: boolean;
  onVisibilityChange: (newOpen: boolean) => void;
  bleeding?: number;
  PullerIcon?: ReactElement;
}

// TODO: try calculating puller size so bleeding prop is not needed
export function BottomControlPanel({
  children,
  visible,
  onVisibilityChange,
  bleeding = defaultBleeding,
  PullerIcon = DefaultPullerIcon,
}: BottomControlPanelAttributes) {
  const togglePanel = useCallback(
    (newOpen: boolean) => () => {
      onVisibilityChange(newOpen);
    },
    [],
  );

  return (
    <ControlPanel
      open={visible}
      anchor="bottom"
      swipeAreaWidth={bleeding}
      disableSwipeToOpen={false}
      ModalProps={{ keepMounted: true }}
      onOpen={togglePanel(true)}
      onClose={togglePanel(false)}
      sx={{
        '& > .MuiPaper-root': {
          height: `calc(auto - ${bleeding}px)`,
          maxHeight: `calc(95% - ${bleeding}px)`,
          overflow: 'visible',
        },
      }}
    >
      <PullerContainer top={-bleeding}>
        <Puller>{PullerIcon}</Puller>
      </PullerContainer>

      <Content>{children}</Content>
    </ControlPanel>
  );
}
