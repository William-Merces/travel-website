'use client'
import { useState } from 'react';
import { Card, CardContent, Box, Switch, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { AirportSelect } from './AirportSelect';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Plane, Users } from 'lucide-react';

export const FlightSearch = () => {
    const router = useRouter();
    const [searchData, setSearchData] = useState({
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        passengers: 1,
        isRoundTrip: true
    });

    const handleSearch = () => {
        const params = new URLSearchParams({
            origin: searchData.origin,
            destination: searchData.destination,
            departureDate: format(searchData.departureDate, 'yyyy-MM-dd'),
            ...(searchData.isRoundTrip && searchData.returnDate && {
                returnDate: format(searchData.returnDate, 'yyyy-MM-dd')
            }),
            passengers: searchData.passengers.toString()
        });

        router.push(`/flights?${params.toString()}`);
    };

    return (
        <Card
            elevation={2}
            sx={{
                width: '100%',
                maxWidth: '1200px',
                mx: 'auto',
                my: 2,
                borderRadius: 2,
                bgcolor: '#fff',
            }}
        >
            <CardContent sx={{ p: '24px 32px' }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                }}>
                    {/* Switch de Ida e Volta */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '140px'
                    }}>
                        <Switch
                            size="small"
                            checked={searchData.isRoundTrip}
                            onChange={(e) => setSearchData(prev => ({ ...prev, isRoundTrip: e.target.checked }))}
                            sx={{
                                padding: '8px',
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#1976d2'
                                }
                            }}
                        />
                        <span style={{
                            fontSize: '0.875rem',
                            color: 'rgba(0, 0, 0, 0.87)'
                        }}>
                            Ida e volta
                        </span>
                    </Box>

                    {/* Origem */}
                    <Box sx={{ width: 240 }}>
                        <AirportSelect
                            label="Origem"
                            value={searchData.origin}
                            onChange={(value) => setSearchData(prev => ({ ...prev, origin: value }))}
                        />
                    </Box>

                    {/* Destino */}
                    <Box sx={{ width: 240 }}>
                        <AirportSelect
                            label="Destino"
                            value={searchData.destination}
                            onChange={(value) => setSearchData(prev => ({ ...prev, destination: value }))}
                        />
                    </Box>

                    {/* Datas */}
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <Box sx={{ width: 150 }}>
                            <DatePicker
                                label="Ida"
                                value={searchData.departureDate}
                                onChange={(date) => setSearchData(prev => ({ ...prev, departureDate: date }))}
                                format="DD/MM"
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        fullWidth: true,
                                        sx: {
                                            '& .MuiOutlinedInput-root': {
                                                height: '40px'
                                            }
                                        }
                                    }
                                }}
                            />
                        </Box>
                        {searchData.isRoundTrip && (
                            <Box sx={{ width: 150 }}>
                                <DatePicker
                                    label="Volta"
                                    value={searchData.returnDate}
                                    onChange={(date) => setSearchData(prev => ({ ...prev, returnDate: date }))}
                                    format="DD/MM"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    height: '40px'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </LocalizationProvider>

                    {/* Passageiros */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 1,
                        padding: '8px 16px',
                        height: '40px',
                        minWidth: 150,
                        gap: 1
                    }}>
                        <input
                            type="number"
                            value={searchData.passengers}
                            onChange={(e) => setSearchData(prev => ({
                                ...prev,
                                passengers: Math.min(9, Math.max(1, parseInt(e.target.value) || 1))
                            }))}
                            style={{
                                width: '30px',
                                border: 'none',
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: '0.875rem'
                            }}
                            min="1"
                            max="9"
                        />
                        <span style={{
                            fontSize: '0.875rem',
                            color: 'rgba(0, 0, 0, 0.87)'
                        }}>
                            Pessoa{searchData.passengers > 1 ? 's' : ''}
                        </span>
                    </Box>

                    {/* Botão Buscar */}
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        startIcon={<Plane size={18} />}
                        sx={{
                            height: '40px',
                            minWidth: '140px',
                            textTransform: 'none',
                            bgcolor: '#E0E0E0',
                            color: '#000',
                            '&:hover': {
                                bgcolor: '#D0D0D0'
                            }
                        }}
                    >
                        Buscar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlightSearch;