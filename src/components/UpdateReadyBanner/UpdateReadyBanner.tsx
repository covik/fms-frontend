import { useVersionManager } from '../../foundation/';
import { Update } from 'mdi-material-ui';
import { Alert, Button, styled } from '@mui/material';

const StyledAlert = styled(Alert)({
  'width': '100%',
  'alignItems': 'center',
  'borderRadius': 0,
  '.MuiAlert-action': {
    paddingTop: 0,
  },
});

export function UpdateReadyBanner() {
  const { isUpdateReady, applyUpdate } = useVersionManager();

  return isUpdateReady ? (
    <StyledAlert
      severity="info"
      icon={<Update />}
      action={
        <Button color="inherit" size="small" onClick={applyUpdate}>
          AŽURIRAJ
        </Button>
      }
    >
      Nova verzija je spremna
    </StyledAlert>
  ) : null;
}
