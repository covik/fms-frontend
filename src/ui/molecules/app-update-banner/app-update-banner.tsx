import { Alert, Button, styled } from '@mui/material';
import { Update } from 'mdi-material-ui';

const StyledAlert = styled(Alert)({
  'alignItems': 'center',
  'width': '100%',
  '.MuiAlert-action': {
    paddingTop: 0,
  },
});

export interface AppUpdateBannerAttributes {
  onConfirm: () => void;
}

export function AppUpdateBanner({ onConfirm }: AppUpdateBannerAttributes) {
  return (
    <StyledAlert
      severity="info"
      elevation={3}
      icon={<Update />}
      action={
        <Button color="inherit" size="small" onClick={onConfirm}>
          AŽURIRAJ
        </Button>
      }
    >
      Nova verzija je spremna
    </StyledAlert>
  );
}
