// src/components/flights/FlightCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, Divider } from '@mui/material';
import { Flight, Schedule } from '@mui/icons-material';
import Link from 'next/link';

interface FlightSegment {
  departure: {
    iataCode: string;
    terminal: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  duration: string;
}

interface FlightOffer {
  id: string;
  itineraries: {
    segments: FlightSegment[];
  }[];
  price: {
    total: string;
    currency: string;
  };
  numberOfBookableSeats: number;
}

interface FlightCardProps {
  flight: FlightOffer;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const mainSegment = flight.itineraries[0].segments[0];
  const { departure, arrival } = mainSegment;

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    };
  };

  const formatDuration = (duration: string) => {
    return duration.replace('PT', '').toLowerCase();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">{departure.iataCode}</Typography>
              <Flight color="primary" />
              <Typography variant="h6">{arrival.iataCode}</Typography>
            </Box>
            
            <Box display="flex" gap={2} mt={1}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(departure.at).time}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(departure.at).date}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" px={2}>
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(mainSegment.duration)}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(arrival.at).time}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(arrival.at).date}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Box textAlign="right">
            <Typography variant="h5" color="primary" fontWeight="bold">
              {flight.price.currency} {parseFloat(flight.price.total).toFixed(2)}
            </Typography>
            <Chip
              size="small"
              label={`${flight.numberOfBookableSeats} lugares disponíveis`}
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
            <Box mt={2}>
              <Link href={`/flights/${flight.id}`} passHref>
                <Button variant="contained" color="primary">
                  Selecionar
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box mt={2} display="flex" gap={2} alignItems="center">
          <Schedule fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {mainSegment.carrierCode} {mainSegment.number}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Terminal {departure.terminal}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}