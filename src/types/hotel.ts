export interface Hotel {
    id: string;
    name: string;
    description: string;
    location: {
        address: string;
        city: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    rating: number;
    amenities: string[];
    images: string[];
    rooms: Room[];
    reviews: Review[];
}

export interface Room {
    id: string;
    type: string;
    description: string;
    capacity: number;
    price: {
        amount: number;
        currency: string;
    };
    amenities: string[];
    available: boolean;
}

export interface Review {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    date: Date;
}