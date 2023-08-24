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

export interface BottomControlPanelAttributes {
  children: ReactNode;
  visible: boolean;
  onVisibilityChange: (newOpen: boolean) => void;
  // bleeding?: number;
}

// TODO: try calculating puller size so bleeding prop is not needed
export function BottomControlPanel({
  children,
  visible,
  onVisibilityChange,
}: BottomControlPanelAttributes) {
  const bleeding = 60;

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
          height: `calc(100% - ${bleeding}px)`,
          overflow: 'visible',
        },
      }}
    >
      <PullerContainer
        top={-bleeding}
        minHeight={bleeding + 1}
        onMouseUp={togglePanel(!visible)}
      >
        <Puller top={bleeding / 2 - 3} />
      </PullerContainer>

      <Content>{children}</Content>
    </ControlPanel>
  );
}
