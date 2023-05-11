import { Box, Typography } from '@mui/material';
import { HumanDolly } from 'mdi-material-ui';
import { Link } from '@tanstack/router';
import { VehicleList } from '../VehicleList';
import { VehicleCard } from '../VehicleCard';
import { TimedOutVehiclesHeader } from './TimedOutVehiclesHeader';
import type { ReactNode } from 'react';
import type { CardAttributes } from '../VehicleCard';

type LocatedVehicle = CardAttributes & { id: string; shareUrl: string };
type ShareHandler = (title: string, url: string) => void;

export interface VehiclesDigestViewAttributes {
  operationalVehicles: LocatedVehicle[];
  timedOutVehicles: LocatedVehicle[];
  onShareRequest: ShareHandler;
}

export function VehiclesDigestView({
  operationalVehicles,
  timedOutVehicles,
  onShareRequest,
}: VehiclesDigestViewAttributes) {
  if (operationalVehicles.length === 0 && timedOutVehicles.length === 0)
    return <NoVehicles />;

  return (
    <PageContainer>
      <Box sx={{ width: '100%' }}>
        <PageTitle />
        <Box sx={{ marginTop: 2 }}>
          <VehicleList>
            {operationalVehicles.map((vehicle) => (
              <LocatedVehicleCard
                vehicle={vehicle}
                handleShare={onShareRequest}
                key={vehicle.id}
              />
            ))}
          </VehicleList>
          {timedOutVehicles.length > 0 ? (
            <>
              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <TimedOutVehiclesHeader />
              </Box>
              <VehicleList>
                {timedOutVehicles.map((vehicle) => (
                  <LocatedVehicleCard
                    vehicle={vehicle}
                    handleShare={onShareRequest}
                    key={vehicle.id}
                  />
                ))}
              </VehicleList>
            </>
          ) : null}
        </Box>
      </Box>
    </PageContainer>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: '100%', padding: 1.4 }}>{children}</Box>;
}

function PageTitle() {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="grey"
      fontWeight="medium"
      lineHeight={1}
    >
      Vozila
    </Typography>
  );
}

function NoVehicles() {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'grey' }}>
        <Box sx={{ fontSize: '180px' }}>
          <HumanDolly fontSize={'inherit'} htmlColor={'grey'} />
        </Box>
        <Typography variant={'h5'}>Naručujemo GPS uređaje</Typography>
        <span>
          Biti ćete obaviješteni kad stignu i kad ih instaliramo u vozila
        </span>
      </Box>
    </Box>
  );
}

function LocatedVehicleCard({
  vehicle,
  handleShare,
}: {
  vehicle: LocatedVehicle;
  handleShare: ShareHandler;
}) {
  return (
    <Link
      to={'/vehicles/$vehicleId'}
      params={{ vehicleId: vehicle.id }}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <VehicleCard
        title={vehicle.title}
        subtitle={vehicle.subtitle}
        icon={vehicle.icon}
        color={vehicle.color}
        onShare={(e) => {
          e.preventDefault();
          handleShare(vehicle.title, vehicle.shareUrl);
        }}
      />
    </Link>
  );
}
