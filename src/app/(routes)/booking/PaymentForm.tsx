'use client'
import { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { formatCurrency } from '@/utils/formatters';

interface PaymentFormProps {
    amount: number;
    currency: string;
    onSubmit: (paymentData: any) => void;
    onBack: () => void;
}

export const PaymentForm = ({ amount, currency, onSubmit, onBack }: PaymentFormProps) => {
    const [paymentData, setPaymentData] = useState({
        method: 'credit',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(paymentData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className="space-y-6">
                <Typography variant="h5" component="h2">
                    Pagamento
                </Typography>

                <Box className="bg-gray-50 p-4 rounded">
                    <Typography variant="h6">
                        Total a pagar: {formatCurrency(amount, currency)}
                    </Typography>
                </Box>

                <RadioGroup
                    value={paymentData.method}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, method: e.target.value }))}
                >
                    <FormControlLabel value="credit" control={<Radio />} label="Cartão de Crédito" />
                    <FormControlLabel value="debit" control={<Radio />} label="Cartão de Débito" />
                </RadioGroup>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Número do Cartão"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Nome no Cartão"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Data de Validade"
                            value={paymentData.expiryDate}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                            placeholder="MM/AA"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="CVV"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                            type="password"
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

                <Box className="flex justify-between mt-6">
                    <Button onClick={onBack}>
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Finalizar Compra
                    </Button>
                </Box>
            </Box>
        </form>
    );
};