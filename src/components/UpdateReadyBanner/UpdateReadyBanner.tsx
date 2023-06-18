import { useVersionManager } from '../../foundation/';
import { Update } from 'mdi-material-ui';
import { Alert, Button, Snackbar, styled } from '@mui/material';
import { useLayout } from '../Layout';

const StyledAlert = styled(Alert)({
  'alignItems': 'center',
  'width': '100%',
  '.MuiAlert-action': {
    paddingTop: 0,
  },
});

export function UpdateReadyBanner() {
  const { isUpdateReady, applyUpdate } = useVersionManager();
  const { offsetLeft, offsetBottom } = useLayout();

  return isUpdateReady ? (
    <Snackbar
      open={isUpdateReady}
      sx={(theme) => ({
        bottom: `${theme.spacing(1)} !important`,
        left: `${theme.spacing(1)} !important`,
        right: `${theme.spacing(1)} !important`,
        marginLeft: offsetLeft,
        marginBottom: offsetBottom,
      })}
    >
      <StyledAlert
        severity="info"
        elevation={3}
        icon={<Update />}
        action={
          <Button color="inherit" size="small" onClick={applyUpdate}>
            AŽURIRAJ
          </Button>
        }
      >
        Nova verzija je spremna
      </StyledAlert>
    </Snackbar>
  ) : null;
}
