// src/components/flights/FlightSearchForm.tsx
'use client';

import { useState } from 'react';
import { 
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
  Grid,
  Typography,
  Alert
} from '@mui/material';
import { useAmadeus } from '@/hooks/useAmadeus';
import { FlightSearchParams } from '@/lib/amadeus';
import { AirportAutocomplete } from './AirportAutocomplete';

export default function FlightSearchForm() {
  const { loading, error, searchFlights } = useAmadeus();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [formData, setFormData] = useState<FlightSearchParams>({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'ECONOMY',
    nonStop: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await searchFlights(formData);
      if (results) {
        setSearchResults(results);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AirportAutocomplete
              value={formData.originLocationCode}
              onChange={(value) => setFormData({ ...formData, originLocationCode: value })}
              placeholder="Origem"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AirportAutocomplete
              value={formData.destinationLocationCode}
              onChange={(value) => setFormData({ ...formData, destinationLocationCode: value })}
              placeholder="Destino"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              fullWidth
              label="Data de ida"
              value={formData.departureDate}
              onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              fullWidth
              label="Data de volta (Opcional)"
              value={formData.returnDate}
              onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  fullWidth
                  label="Adultos"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                  inputProps={{ min: 1, max: 9 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  fullWidth
                  label="Crianças"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                  inputProps={{ min: 0, max: 9 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  fullWidth
                  label="Bebês"
                  value={formData.infants}
                  onChange={(e) => setFormData({ ...formData, infants: parseInt(e.target.value) })}
                  inputProps={{ min: 0, max: 9 }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Classe</InputLabel>
              <Select
                value={formData.travelClass}
                label="Classe"
                onChange={(e) => setFormData({ ...formData, travelClass: e.target.value as any })}
              >
                <MenuItem value="ECONOMY">Econômica</MenuItem>
                <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                <MenuItem value="BUSINESS">Executiva</MenuItem>
                <MenuItem value="FIRST">Primeira Classe</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.nonStop}
                  onChange={(e) => setFormData({ ...formData, nonStop: e.target.checked })}
                />
              }
              label="Apenas voos diretos"
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              size="large"
            >
              {loading ? 'Buscando...' : 'Buscar Voos'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {searchResults.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resultados encontrados
          </Typography>
          {searchResults.map((flight, index) => (
            <FlightCard key={`flight-${index}`} flight={flight} />
          ))}
        </Box>
      )}
    </Box>
  );
}