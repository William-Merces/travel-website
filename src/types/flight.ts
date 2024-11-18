export interface Flight {
    id: string;
    origin: {
        code: string;
        city: string;
        country: string;
    };
    destination: {
        code: string;
        city: string;
        country: string;
    };
    departureDate: Date;
    arrivalDate: Date;
    airline: {
        name: string;
        logo: string;
    };
    price: {
        amount: number;
        currency: string;
    };
    duration: string;
    stops: number;
    seatsAvailable: number;
    cabinClass: 'economy' | 'premium' | 'business' | 'first';
}

export interface FlightSearchParams {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate?: Date;
    passengers: number;
    cabinClass?: string;
}

export interface FlightBooking {
    id: string;
    flightId: string;
    userId: string;
    passengers: PassengerDetails[];
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
}

export interface PassengerDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    passportNumber: string;
    nationality: string;
}