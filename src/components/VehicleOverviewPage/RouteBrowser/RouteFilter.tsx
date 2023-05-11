import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export interface RouteFilterAttributes {
  view: 'today' | 'yesterday' | 'custom';
}

export function RouteFilter({ view = 'today' }: RouteFilterAttributes) {
  return (
    <Box>
      <Card>
        <FormControl fullWidth>
          <Select value={view} displayEmpty sx={{ margin: -0.3 }}>
            <MenuItem value="today">Danas</MenuItem>
            <MenuItem value="yesterday">Jučer</MenuItem>
            <MenuItem value="custom">Prilagođeno</MenuItem>
          </Select>
        </FormControl>
      </Card>
      {view === 'custom' ? (
        <Card sx={{ marginTop: 1 }}>
          <CardContent>
            <TextField
              variant="filled"
              fullWidth
              margin="none"
              label="Početni datum"
            />
            <TextField
              variant="filled"
              fullWidth
              margin="none"
              label="Završni datum"
              sx={{ marginTop: 1 }}
            />
          </CardContent>
          <CardActions>
            <Button>Pošalji</Button>
          </CardActions>
        </Card>
      ) : null}
    </Box>
  );
}
