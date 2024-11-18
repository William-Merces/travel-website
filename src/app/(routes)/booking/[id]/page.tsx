'use client'
import { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Box, Card, Button } from '@mui/material';
import { PassengerForm } from '@/components/booking/PassengerForm';
import { FlightSummary } from '@/components/booking/FlightSummary';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { useParams, useRouter } from 'next/navigation';
import { useFlight } from '@/hooks/useFlight';

const steps = ['Detalhes do Voo', 'Informações dos Passageiros', 'Pagamento', 'Confirmação'];

export default function BookingPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [bookingData, setBookingData] = useState({
        passengers: [],
        payment: null
    });
    const params = useParams();
    const router = useRouter();
    const { flight, loading, error } = useFlight(params.id);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar dados do voo</div>;

    return (
        <Container maxWidth="lg" className="py-8">
            <Stepper activeStep={activeStep} className="mb-8">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Card className="p-6">
                {activeStep === 0 && (
                    <FlightSummary
                        flight={flight}
                        onNext={handleNext}
                    />
                )}

                {activeStep === 1 && (
                    <PassengerForm
                        onSubmit={(passengers) => {
                            setBookingData(prev => ({ ...prev, passengers }));
                            handleNext();
                        }}
                        onBack={handleBack}
                        passengers={bookingData.passengers}
                    />
                )}

                {activeStep === 2 && (
                    <PaymentForm
                        amount={flight.price.amount}
                        currency={flight.price.currency}
                        onSubmit={(payment) => {
                            setBookingData(prev => ({ ...prev, payment }));
                            handleNext();
                        }}
                        onBack={handleBack}
                    />
                )}

                {activeStep === 3 && (
                    <BookingConfirmation
                        booking={bookingData}
                        flight={flight}
                        onFinish={() => router.push('/')}
                    />
                )}
            </Card>
        </Container>
    );
}