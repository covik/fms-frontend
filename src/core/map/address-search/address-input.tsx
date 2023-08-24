import { InputAdornment, TextField, outlinedInputClasses } from '@mui/material';
import { Magnify as SearchIcon } from 'mdi-material-ui';

export function MapAddressInput() {
  return (
    <TextField
      variant={'outlined'}
      fullWidth
      InputProps={{
        sx: (theme) => ({
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          borderRadius: '15% / 100%',
          height: '40px',
          padding: 0,

          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: `${theme.palette.background.paper} !important`,
          },
        }),
        startAdornment: (
          <InputAdornment position={'start'} sx={{ marginX: 1 }}>
            <SearchIcon fontSize={'medium'} />
          </InputAdornment>
        ),
        placeholder: 'Pretraži kartu',
      }}
    />
  );
}
