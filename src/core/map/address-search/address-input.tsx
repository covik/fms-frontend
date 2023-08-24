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
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', // from google maps
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
