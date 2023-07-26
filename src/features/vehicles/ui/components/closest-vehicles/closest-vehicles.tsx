import { ClosestVehicleList } from './closest-vehicle-list';
import {
  Box,
  IconButton,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { CarSide, Close, Truck } from 'mdi-material-ui';
import type { ClosestVehicleListAttributes } from './closest-vehicle-list';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
  borderTopRightRadius: '4px',
  borderTopLeftRadius: '4px',

  position: 'absolute',
  left: '10px',
  right: '10px',
  bottom: 0,

  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled('div')(({ theme }) => ({
  backgroundColor: 'inherit',
  display: 'grid',
  gridTemplateColumns: '1fr max-content',
  gap: theme.spacing(1),
  alignItems: 'center',
  padding: `${theme.spacing(1 / 2)} ${theme.spacing(1)}`,

  position: 'sticky',
  top: '13px',
  zIndex: 1,
}));

const NotchContainer = styled('div')({
  backgroundColor: 'inherit',

  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,

  display: 'flex',
  justifyContent: 'center',
  paddingTop: '8px',
});

const Notch = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.text.secondary,
  height: '5px',
  width: '40px',
  borderRadius: '5px',
  cursor: 'pointer',
}));

const HeaderTitle = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const HeaderAction = styled('div')({});

const Content = styled('div')({
  padding: '8px',
  paddingTop: 0,
});

export type NavigationType = 'car' | 'truck';

export interface ClosestVehiclesAttributes
  extends ClosestVehicleListAttributes {
  onClose: () => void;
  navigation: NavigationType;
  onNavigationChange: (type: NavigationType) => void;
  open: boolean;
  onOpenChange: (newOpen: boolean) => void;
}

export function ClosestVehicles({
  vehicles,
  navigation,
  onClose,
  onNavigationChange,
  onSelectionChange,
  open,
  onOpenChange,
}: ClosestVehiclesAttributes) {
  return (
    <Container
      sx={{
        top: open ? '60px' : 'auto',
        overflow: open ? 'auto' : 'hidden',
        height: open ? 'auto' : '20px',
      }}
    >
      <NotchContainer onClick={() => onOpenChange(!open)}>
        <Notch />
      </NotchContainer>
      <Header>
        <HeaderTitle>Vozila ({vehicles.length})</HeaderTitle>
        <HeaderAction>
          <IconButton size={'small'} onClick={() => onClose()}>
            <Close fontSize={'small'} />
          </IconButton>
        </HeaderAction>
      </Header>

      {vehicles.length > 0 ? (
        <Content>
          <ToggleButtonGroup
            value={navigation}
            onChange={(_, newNavigation) => onNavigationChange(newNavigation)}
            exclusive
            size={'small'}
            color={'primary'}
            sx={{ width: '100%', marginBottom: 1 }}
          >
            <ToggleButton value={'car'} sx={{ width: '100%' }}>
              <CarSide />
            </ToggleButton>
            <ToggleButton value={'truck'} sx={{ width: '100%' }}>
              <Truck />
            </ToggleButton>
          </ToggleButtonGroup>

          <ClosestVehicleList
            vehicles={vehicles}
            onSelectionChange={onSelectionChange}
          />
        </Content>
      ) : (
        <Content>Nema vozila</Content>
      )}
    </Container>
  );
}
