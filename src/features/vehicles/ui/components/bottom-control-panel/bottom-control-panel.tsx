import { useCallback } from 'react';
import { Box, styled, SwipeableDrawer } from '@mui/material';
import type { ReactNode } from 'react';

const ComponentName = 'BottomControlPanel';

const ControlPanel = styled(SwipeableDrawer, {
  name: ComponentName,
  slot: 'Root',
})(() => ({}));

const PullerContainer = styled(Box, {
  name: ComponentName,
  slot: 'PullerContainer',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
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
  backgroundColor: theme.palette.text.primary,

  borderRadius: '6px',
  height: '6px',
  width: '30px',

  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 100%)',
  top: '0',
  pointerEvents: 'auto',
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

export interface BottomControlPanelAttributes {
  children: ReactNode;
  visible: boolean;
  onVisibilityChange: (newOpen: boolean) => void;
  bleeding?: number;
}

// TODO: try calculating puller size so bleeding prop is not needed
export function BottomControlPanel({
  children,
  visible,
  onVisibilityChange,
  bleeding = defaultBleeding,
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
      disableBackdropTransition
      disablePortal
      ModalProps={{ keepMounted: true }}
      onOpen={togglePanel(true)}
      onClose={togglePanel(false)}
      sx={{
        '& > .MuiPaper-root': {
          height: 'fit-contents',
          overflow: 'visible',
        },
      }}
    >
      <PullerContainer top={-bleeding} onMouseUp={togglePanel(!visible)}>
        <Puller />
      </PullerContainer>

      <Content>{children}</Content>
    </ControlPanel>
  );
}
