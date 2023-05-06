import { Alert, Button, styled } from '@mui/material';
import { Update } from 'mdi-material-ui';

const StyledAlert = styled(Alert)({
  width: '100%',
  alignItems: 'center',
  borderRadius: 0,
});

export interface UpdateReadyViewAttributes {
  onConfirm: () => void;
}

export function UpdateReadyView({ onConfirm }: UpdateReadyViewAttributes) {
  return (
    <StyledAlert
      severity="info"
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
