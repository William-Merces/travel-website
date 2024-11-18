'use client'
import { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface PassengerFormProps {
    onSubmit: (passengers: any[]) => void;
    onBack: () => void;
    passengers: any[];
}

export const PassengerForm = ({ onSubmit, onBack, passengers }: PassengerFormProps) => {
    const [formData, setFormData] = useState(passengers.length ? passengers : [{
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        nationality: '',
        documentNumber: ''
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className="space-y-6">
                <Typography variant="h5" component="h2">
                    Informações dos Passageiros
                </Typography>

                {formData.map((passenger, index) => (
                    <Box key={index} className="space-y-4">
                        <Typography variant="h6">
                            Passageiro {index + 1}
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nome"
                                    value={passenger.firstName}
                                    onChange={(e) => {
                                        const newData = [...formData];
                                        newData[index].firstName = e.target.value;
                                        setFormData(newData);
                                    }}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Sobrenome"
                                    value={passenger.lastName}
                                    onChange={(e) => {
                                        const newData = [...formData];
                                        newData[index].lastName = e.target.value;
                                        setFormData(newData);
                                    }}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                    <DatePicker
                                        label="Data de Nascimento"
                                        value={passenger.dateOfBirth}
                                        onChange={(date) => {
                                            const newData = [...formData];
                                            newData[index].dateOfBirth = date;
                                            setFormData(newData);
                                        }}
                                        className="w-full"
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Documento de Identidade"
                                    value={passenger.documentNumber}
                                    onChange={(e) => {
                                        const newData = [...formData];
                                        newData[index].documentNumber = e.target.value;
                                        setFormData(newData);
                                    }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        {index < formData.length - 1 && <Divider className="my-4" />}
                    </Box>
                ))}

                <Box className="flex justify-between mt-6">
                    <Button onClick={onBack}>
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Continuar para pagamento
                    </Button>
                </Box>
            </Box>
        </form>
    );
};
